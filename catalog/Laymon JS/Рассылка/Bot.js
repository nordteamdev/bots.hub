const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs");
const admins = [483398970];
const vip = [483398970];
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const log = require("./base/log.json");
const frac = require("./base/frac.json");
const config = require("./setting/config.json");  
 

vk.setOptions({
    token: '8febb840c11c7a5c97e3db2572a9214e06bd2a0da11ad023d9fe81b4955ba1b7a3b4ab44200d69584b6c2', // токен группы
    apiMode: 'parallel',
    pollingGroupId: 174857367 // 1 замени на id группы 
}); 

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
 		 
		message.send(``)
	 	   
		
		acc.users[numm] = {
			balance: 5000,
			level: 0, 
			adm_time: 0,
			bitcoin: 0, 
			donate: 0,
			bloks: { 
				cases: false,
				bonus: false,
				random_game: false,
				giverub: false,
				a_case: false,
				pay: false,
				frac: false,
				gun_case: false
			}, 
			ferm: {
				id: false,
				zp: 0
			},
			exs: 0,
			exsup: 50,
			lvl: 0,
			number: numm,
			id: message.user,
			nick: true,
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
				win: 45,
				strela_loose: 0,
				strela_win: 0
			},
			msg: { 
				messages: 0, 
				last_msg: "" 
			},  
			bizs: {
				one_biz: false,
				one: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					},
				two_biz: false,
				two: {
					count: false,
					balance: 0,
					id: false,
					name: false,
					people: 0,
					uplvl: 0,
					zp: 0
					}
			},
			cars: false,
			reys: false,
			aircraft: false,
			helicopter: false,
			house: false,
			housep: 0,
			pit: false,
			phone: false,
			bank: 0,
			lodka: false,
			tag: "Новичок", 
			brak: false,
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
				id: false,
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
			autobiz: false,
			frac_name: false,
			duel: false,
			duel_summ: false,
			nachal: false,
			uron: 0,
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

vk.updates.hear(/^(?:кикнуть)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[user_id(message.user)];
	if(message.$from.type == 'user') return message.send(``);
 	if(user.level < 3) return message.send(``);

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
			if(res.object_id == 483677565) return message.reply('Отказ'); 

			if(acc.users[user_id(res.object_id)]){
				if(acc.users[user_id(res.object_id)].level > 2) return message.send(``);
			} 

			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(``);
			});  
			return  
		})  
	}else{
		if(!message.$match[3]) return message.reply(""); 
		if(message.$match[3] == 483677565) return message.reply('Отказ'); 

		if(acc.users[user_id(message.$match[3])]){
			if(acc.users[user_id(message.$match[3])].level > 2) return message.send(``);
		}

		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(``);}); 

		return  				
	} 
});


vk.updates.hear(/^(?:чрассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 4) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			chat_id: 396,
			message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения тест!`);
});

vk.updates.hear(/^(?:рассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 4) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: `${message.$match[1]}`
		});
	}
	return message.send(`Сообщения отправлены!`);
});

vk.updates.hear(/^(?:пострассылка)\s?([^]+)?/i,  message => { 
	if(acc.users[user_id(message.user)].level < 4) return;
	for(i in acc.users){
		vk.api.call('messages.send', {
			user_id: acc.users[i].id,
			message: ``,
			attachment: `${message.$match[1]}`
		});
	}
	return message.send(`Посты отправлены!`);
});
 

 
async function run() {
    await vk.updates.startPolling();
    console.log('Рассылка запущенно!\nBY Laymon');
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
	 	
 	// - - - - - - - - - - - - - - - - -  
  		if(type == 1){ 
 			if(!log.point[ids]){ log.point[ids] = { log: [] }  } 
 			if(!log.point[id]){ log.point[id] = { log: [] }  } 
 			log.point[id].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.point[ids].log.push(`[${time()} | ${data()} | Pay] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.point[id].log.length >= 15){ delete log.point[id].log.shift() } 
			if(log.point[ids].log.length >= 15){ delete log.point[id].log.shift() } 
 		}
 		if(type == 2){ 
 			if(!log.give[ids]){ log.give[ids] = { log: [] }  } 
 			if(!log.give[id]){ log.give[id] = { log: [] }  } 
 			log.give[id].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
 			log.give[ids].log.push(`[${time()} | ${data()} | Give] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}$\n`)
			if(log.give[id].log.length >= 15){ delete log.give[id].log.shift() } 
			if(log.give[ids].log.length >= 15){ delete log.give[id].log.shift() }  
 		}
 		if(type == 3){ 
 			if(!log.remove[ids]){ log.remove[ids] = { log: [] }  } 
 			if(!log.remove[id]){ log.remove[id] = { log: [] }  } 
 			log.remove[id].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
 			log.remove[ids].log.push(`[${time()} | ${data()} | Remove] Забрал [ID: ${id}] у игрока [ID: ${ids}] \n`)
			if(log.remove[id].log.length >= 15){ delete log.remove[id].log.shift() } 
			if(log.remove[ids].log.length >= 15){ delete log.remove[id].log.shift() } 
 		} 
 		if(type == 4){ 
 			if(!log.admin[ids]){ log.admin[ids] = { log: [] }  } 
 			if(!log.admin[id]){ log.admin[id] = { log: [] }  } 
 			log.admin[id].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
 			log.admin[ids].log.push(`[${time()} | ${data()} | Admin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num} lvl\n`)
			if(log.admin[id].log.length >= 15){ delete log.admin[id].log.shift() } 
			if(log.admin[ids].log.length >= 15){ delete log.admin[id].log.shift() } 
 		} 
 		if(type == 5){ 
 			if(!log.setwin[ids]){ log.setwin[ids] = { log: [] }  } 
 			if(!log.setwin[id]){ log.setwin[id] = { log: [] }  } 
 			log.setwin[id].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
 			log.setwin[ids].log.push(`[${time()} | ${data()} | Setwin] Выдал [ID: ${id}] игроку [ID: ${ids}] -> ${num}%\n`)
			if(log.setwin[id].log.length >= 15){ delete log.setwin[id].log.shift() } 
			if(log.setwin[ids].log.length >= 15){ delete log.setwin[id].log.shift() }  
 		} 
 		if(type == 6){ 
 			if(!log.warns[ids]){ log.warns[ids] = { log: [] }  } 
 			if(!log.warns[id]){ log.warns[id] = { log: [] }  } 
 			log.warns[id].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
 			log.warns[ids].log.push(`[${time()} | ${data()} | warn] Выдал [ID: ${id}] игроку [ID: ${ids}] | Причина: ${num}\n`)
			if(log.warns[id].log.length >= 15){ delete log.warns[id].log.shift() } 
			if(log.warns[ids].log.length >= 15){ delete log.warns[id].log.shift() }  
 		} 
 	}
	//

	// log
	 
 	function game_log(id, name, count, win_lose) {
 
 	// - - - - - - - - - - - - - - - - -   
 		if(!log.game[id]){ log.game[id] = { log: [1] }  } 
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
		var datas = days + ':' + month + ':2018' ;
		return datas;
	}
 //------------------------------------------------------------------------------------\\ 
 	setInterval(() => {
		acc.curs = rand(30000,80000) 
		acc.bit = rand(31000,32200)
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
				acc.users[i].bizs.two.stop = false
				acc.users[i].safe.status = false;
 				acc.users[i].safe.key = false;
				}
			} 
	}

 	setInterval(() =>{
 		for(name in frac){
 			let sum = frac[name].bank;
 			frac[name].bank = 0;
 			let owner_sum = sum / 100 * 10;
 			let user_sums = sum / 100 * 90;
 			let people = frac[name].people - 1;
 			let user_sum = user_sums / people;

 			frac[name].balance += owner_sum;
 			for(i in frac[name].users){
 				frac[name].users[i].count = 0;
 				acc.users[i].balance += user_sum;
 			} 
 		}
 	}, 7200000); 

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
							message: `Срок действия vip/moder/admin прав истек. Вы сняты с должности.`
						});
 			 		}
 			 	}
 			}
 		}
 	}, 3600000);  	 


setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/log.json", JSON.stringify(log, null, "\t"));
	fs.writeFileSync("./base/frac.json", JSON.stringify(frac, null, "\t"));
}, 3500);

vk.updates.hear(/^(?:Телефоны)\s?([0-9]+)?/i, message => {
    if(!message.$match[1]){
        return message.send(`
           
            Телефоны
 
🔸 1. Nokia 108 (500$)
🔸 2. Nokia 3310 (2017) (1.100$)
🔸 3. ASUS ZenFone 4 (2.000$)
🔸 4. BQ Aquaris X (5.000$)
🔸 5. Sony Xperia XA (10.000$)
🔸 6. Samsung Galaxy S8 (15.000$)
🔸 7. Xiaomi Mi Mix (50.000$)
🔸 8. Torex FS1 (100.000$)
🔸 9. iPhone X (500.000$)
🔸 10.Мегафон С1 (1.000.000$)
 
🔔Для покупки введите "Телефоны [номер]"
🔔Для продажи введите "Телефон отдать"
[Деньги не возвращаются]
            `);
    }
    let i = message.$match[1];
    let user = acc.users[user_id(message.user)];
    let count = [0, 500,1100, 2000,5000,10000,15000,50000,100000,500000,1000000];
    let names = [0, 'Nokia 108','Nokia 3310 ','ASUS ZenFone 4 ','BQ Aquaris X','Sony Xperia XA ','Samsung Galaxy S8','Xiaomi Mi Mix','Torex FS1 ','iPhone X ','Мегафон С1']
    if(i < 0 || i > 10) return;
    if(user.phone != false) return message.send(`&#128241; ➾ У вас уже куплен телефон`);
    if(i > 0 && i <= 10){
        if(user.balance < count[i]) return message.send(`&#128241; ➾ У вас не достаточно денег.`);
        user.balance -= count[i];
        user.phone = names[i];
        return message.send(`&#128241; ➾ Вы купили Телефон (${names[i]}) за ${count[i]}$`)
    }else{
        if(user.donate < count[i]) return message.send(`У вас не достаточно рубинов.`);
        user.donate -= count[i];
        user.phone = names[i];
        return message.send(`&#128241; ➾ Вы купили Телефон (${names[i]}) за ${count[i]} рубинов`)
    }
 });
 
  vk.updates.hear(/^(?:телефон отдать)/i, message => {
    let user = acc.users[user_id(message.user)];
    if(user.phone == false) return message.send(`&#128241; ➾ У вас нет телефона`);
    user.phone = false;
    return message.send(`&#128241; ➾ Вы успешно отдали телефон бомжу.`);
 });