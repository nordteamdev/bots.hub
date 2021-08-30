var fs = require('fs'); 
const { VK } = require('vk-io')
const vk = new VK();

const cmds = require('./settings/cmds.js').cmds;
const clan = require('./settings/clan.js').clan;
const func = require('./settings/functions.js');
const trees = require('./settings/trees.js').trees;
const city = require('./settings/city.js');
const dis = require('./settings/diseases.js').diseases;
const property = require('./settings/property.js');
const bit = require('./settings/course.js').bit;
var users = require('./database/users.json');
var other = require('./database/other.json');
var silvent = require('./database/silvent.json');
var alog = require('./database/admin_log.json');
var promo = require('./database/promo.json');
var clans = require('./database/clans.json');
const other1 = require('./settings/other.js');
const config = require('./settings/config.js').config;
const pets = require('./settings/pets.js');

//Таймеры.
	setInterval(() => {
	fs.writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	fs.writeFileSync('./database/other.json', JSON.stringify(other, null, '\t'));
	fs.writeFileSync('./database/promo.json', JSON.stringify(promo, null, '\t'));
	fs.writeFileSync('./database/silvent.json', JSON.stringify(silvent, null, '\t'));
	fs.writeFileSync('./database/admin_log.json', JSON.stringify(alog, null, '\t'));
	fs.writeFileSync('./database/clans.json', JSON.stringify(clans, null, '\t'));
}, 5000);

setInterval(() => {
	other.silvent--;
	
	if(other.silvent == 0) {
		other.silvent = 86400;
		var num75 = 1;
		silvent.map(x=> {
			x.min = num75;
			num75 += x.sum;
			x.max = num75;
			num75++;
			});
			var nd67 = func.rand(1, num75);
			var win91 = silvent.find(x=> x.min <= nd67 && x.max >= nd67);
			if(win91) {
			var sum506 = 0;
			silvent.map(x=> sum506 += x.sum);
			vk.api.messages.send({user_id: win91.id, message: "💰Вы выиграли сильвент и получаете: "+func.sp(sum506)+"$"});
			users[win91.uid].money += sum506;
			}
			silvent = [];
		}
		
}, 1000);

setInterval(() => {
	bitcoins += func.rand(0, bit.reload);
	bitcoins -= func.rand(0, bit.reload);
	bitcoins = (bitcoins > bit.max) ? bit.max: (bitcoins < bit.min) ? bit.min: bitcoins;
}, bit.timer);

setInterval(() => {
	users.map(x=> {
		x.activ++;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.hp < 100).map(x=> {
		x.hp++;
		});
}, 300000);

setInterval(() => {
	users.filter(x=> x.energy < 100).map(x=> {
		x.energy++;
		});
}, 300000);

setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.invites.length > 0).map(x=> {
		x.invites.map(z=> {
			z.time--;
			if(z.time <= 0) x.invites.splice(x.invites.indexOf(z), 1);
			});
		});
}, 60000);

setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.brone > 0).map(x=> {
		x.brone--;
		});
}, 1000);

setInterval(() => {
	clans.filter(x=> x != null).filter(x=> x.war.time > 0).map(x=> {
		x.war.time--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.bonus.user > 0).map(x=> {
		x.bonus.user--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.ban.acc > 0).map(x=> {
		x.ban.acc--;
		if(x.ban.acc == 0) vk.api.messages.send({user_id: x.id, message: "✔Время вашего бана вышло, вы разбанены!"});
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.bonus.vip > 0).map(x=> {
		x.bonus.vip--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.bonus.slend > 0).map(x=> {
		x.bonus.slend--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.pet.time > 0).map(x=> {
		x.pet.time--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.pet.brone > 0).map(x=> {
		x.pet.brone--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.biz.level != 0).map(x=> {
		let prib8 = (x.biz.products > x.biz.workers) ? x.biz.workers: x.biz.products;
		x.money += prib8*100;
		x.biz.products -= prib8;
		});
}, 60000);

setInterval(() => {
	users.filter(x=> x.work.timer != 0).map(x=> {
		x.work.timer--;
		});
}, 1000);

setInterval(() => {
	users.filter(x=> x.credit != false).map(x=> {
		x.credit += Number((x.credit/100).toFixed(0));
		});
}, 3600000);

setInterval(() => {
	users.map(x=> {
		x.trees.map(y=> x.bitcoins += y.count*trees[y.id].bitcoins);
		});
}, 3600000);

setInterval(() => {
	users.filter(x=> x.bank > 0).map(x=> {
		if(x.rights <= 0) {x.bank += Number((x.bank/50).toFixed(0));}
		if(x.rights == 1) {x.bank += Number((x.bank/25).toFixed(0));}
		if(x.rights >= 2) {x.bank += Number((x.bank/10).toFixed(0));}
		});
}, 24*3600000);

//Конец таймеров.

var bitcoins = bit.start;

vk.setOptions({ token: config.group_token, pollingGroupId: config.group_id});
const { updates, snippets } = vk;

updates.startPolling();
updates.on('message', async (msg) => {
	if(Number(msg.senderId) <= 0) return;
	msg.text.replace(config.group, "").replace("/", "").trim();
const [vk_user] = await vk.api.users.get({ user_id: msg.senderId });
	
	msg.user = msg.senderId;
	
function send(text) {
	msg.send(text)
	}



if(!users.find(t=> t.id == msg.user)) {
	users.push({
		id: msg.user, //vk?
		name:  vk_user.first_name, //vk?
		rights: 0,
		city: 0,
		money: 25000,
		bank: 0,
		bitcoins: 0,
		credit: false,
		level: {
			level: 1,
			exp: 0,
			exps: 100
			},
		hp: 100,
		energy: 100,
		disease: false,
		work: {
			day: 0,
			exp: 0,
			timer: 0,
			id: false
			},
			ban: {
				acc: 0
				},
		biz: {
			level: 0,
			cost: 1500000,
			workers: 0,
			max_workers: 5,
			products: 0,
			max_products: 100
			},
		trees: [],
		transport: false,
		house: false,
		pet: {
			id: false,
			time: 0,
			brone: 0
			},
		bonus: {
			user: 0,
			vip: 0,
			slend: 0
			},
		brak: {
			num: -1,
			user: -1
			},
		clan: -1,
		drugs: 0,
		activ: 0,
		date: func.createDate(),
		uid: users.length
		});
	}
	
	   i = users.find(t=> t.id === msg.user)
		if(i.ban.acc && config.creator.id != i.id) return;
		const command = cmds.find(x=> x[0].test(msg.text));
	
	if(!command) return;
	
	i.activ = 0;
	var lei12 = (i.rights <= 0) ? 1: (i.rights == 1) ? 5: (i.rights >= 2) ? 15: 1;
	i.level.exp += func.rand(0, 5)*lei12;
	if(i.level.exp >= i.level.exps) {
		let summ = i.level.exps*5;
		i.level.level++;
		i.level.exps += i.level.exps+100;
		i.money += summ;
		vk.api.messages.send({user_id: i.id, message: "🍸 || Вы достигли уровня: "+i.level.level+" и получили: "+func.sp(summ)+"$"}); //vk?
		}
	
	if(i.disease != false) {
	   let ddis = dis[i.disease];
	  i.hp = (i.hp - ddis.hp > 0) ? i.hp-ddis.hp: 0;
	  i.energy = (i.energy - ddis.energy > 0) ? i.energy - ddis.energy: 0;
		}
	
	i.energy -= (i.energy < 1) ? 0: 1;
	i.hp -= (i.energy < 1 && i.hp > 0) ? 1: 0;
	
	if(func.rand(0, 100) == 0 && i.disease == false) {
		let ddis = dis[func.rand(1, dis.length-1)];
		i.disease = ddis.id;
		vk.api.messages.send({user_id: i.id, message: "👿 || У вас: "+ddis.name+"\n🔹"+ddis.text}); //vk?
		}
	
	if(i.hp < 1) {
		i.hp = 100;
		i.energy = 100;
		i.money = 25000;
		i.city = 0;
		i.drugs = 0;
		i.credit = 0;
		i.disease = false;
		i.work.id = false;
		i.work.day = 0;
		i.work.exp = 0;
		i.work.timer = 0;
		i.activ = 0;
		i.trees = [];
		i.level.level = 1;
		i.level.exp = 0;
		i.level.exps = 100;
		i.bitcoins = 0;
		i.biz.level = 0;
		i.biz.workers = 0;
		i.biz.max_workers = 5;
		i.biz.products = 0;
		i.biz.max_products = 100;
		i.biz.cost = 1500000;
		i.transport = false;
		i.house = false;
		i.pet.id = false;
		return vk.api.messages.send({user_id: i.id, message: "💀 || Ваше здоровье было исчерпано.\nВы умерли.\nВаш профиль обнулён!"}); //vk?
		}

	args = msg.text.match(command[0]);
	if(i.rights < command[1]) return send("❌ || Не хватает прав!\n🔹Купить привилегии можно в нашем донат магазине, для этого введите: Донат");
	command[2](send, users, bitcoins, other, promo, vk, msg, silvent, alog, clans)
	
	})