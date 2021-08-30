// Токен
var token = 'token page'; // : 
// Модули 
const request = require("request");
const os = require("os");
const punycode = require('punycode');
const readline = require('readline');
var colors = require('colors/safe');
var steam = require('steam-web');
var tcpp = require('tcp-ping');
var bans = require('./bans.json');
var bugurt = require("bugurt");
var VK = require("VK-Promise"),
    http = require("http"),
	https = require("https"),
    tts_key = "", // Yandex Api
    vk = new VK(token);
var fs = require('fs');
var s = new steam({ // Steam API Module
  apiKey: '', // STEAM API Key 
  format: 'json'
});
// Переменные с цветами | Фановые
var b = colors.black; 		// Черный
var r = colors.red; 		// Красный
var z = colors.green; 		// Зеленый
var y = colors.yellow; 		// Жёлтый
var B = colors.blue; 		// Синий
var m = colors.magenta; 	// Пурпуровый
var c = colors.cyan; 		// Голубой
var w = colors.white; 		// Белый
var g = colors.gray; 		// Серый
var G = colors.grey; 		// Пасмурный
// Массивы | Main
var admins = [296858826];		// Администраторы
var moders = [296858826];						// Модераторы
var premium = [296858826];						// Премиумы
var whitelist = [296858826];	// Белый список
var credit = {}								// Кредиты
var chat_mute = [];                           // Need add saving
//var banlist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// Console
var nmsg = ("[Сообщение]");
var smsg = ("[Ответ]");
var emsg = ("[Ошибка]");
// Main Value
var userid = 565544433;					// ID Страницы бота
var titles = {};							// Названия бесед
var chat_muted = {};						// Chats IDs
var words = require("./words.json");		// Library
var verison = "2.0";						// Version bot
var codename = "Vermilion";				// Code name
var mainchat = 999;						// Chat id
var mainchat_title = "Типичный Кодер";		// Name chat
// Second Value
var custom_status = 0; 					// Setting status
var accept = 0;							// Accept on write
var wtext = '';							// Write text
// Statistic
var stats = 0;			// Main Stats
var api = 0;				// API operation
var seconds = 0;			// Seconds
var minute = 0;			// Minutes
var hours = 0;			// Hours
var days = 0;			// Days
var friends_add = 0;		// Friends add
var friends_del = 0;		// Friends delete
process.on("uncaughtException", x => console.log(x.stack))
// Timers
setInterval(function(){ // Stats system
	++seconds;
	if(seconds === 60){
		++minute;
		seconds = 0;
		if(minute === 60){
			++hours;
			minute = 0;
			if(hours === 24){
				++days
				hours = 0;
			}
		}
	}
}, 1000) 				// End stats system
setInterval(function(){ // Adder in friend list
	vk.friends.getRequests({
		extended: 0,
		need_mutual: 0,
		out: 0,
		count: 1
	}).then(function (r) {
		if(r.items.length != 0){ // Check on invite
			vk.friends.add({user_id: r.items[0]});
			++friends_add; // +Stats
		}
	}).catch(function (error){
		console.log("Ошибка",error); // Errors
	});
}, 2000) // Interval | End
setInterval(function(){ // Deleter idiots
	vk.friends.getRequests({
        extended: 0,
		need_mutual: 0,
		out: 1,
		count: 1	
        }).then(function (res) {
			if(res.items.length != 0){
				vk.friends.delete({user_id: res.items[0]});
				++friends_del; // +Stats
			}
        }).catch(function (error) {
            console.log("Ошибка",error); // Errors
        });
}, 1000) // Interval | End

setInterval(function(){ // AutoSave system
	fs.writeFileSync("bans.json", JSON.stringify(bans, null, "\t"))
	fs.writeFileSync("admins.json", JSON.stringify(admins, null, "\t"))
}, 1000);
if(custom_status == 0){ 	// Check on custom status
	setInterval(function(){ // Set default status
		vk("status.set", {text: "UpTime: " + days + " days " + hours + " h " + minute + " min " + seconds + " sec" + " | Msg get: "+stats+"\nAPI: "+api}); // Text Status
		++api 				// +Stats
	}, 40000) 				// Interval
}
// Information of bot
vk.users.get({
    user_id: userid, // Dont change 
}).then(function (res) {
    console.log(z("ID: "+res[0].id) + (z(" Name: "+res[0].first_name+" "+res[0].last_name)));
}).catch(function (error) {
    console.log("Ошибка",error);
}); // End
// Longpool Bot
vk.init_longpoll();
vk.on("message",function (event, msg) {
	// Values
	var sms = msg.body.split(" ");
	// Console Log | ALL
    console.log(m( nmsg ) + (z("@: ")) + (c(msg.peer_id)) + (z(" text:")) + (msg.body));
	// Function
	if(msg.action == "chat_title_update" && mainchat_title !== msg.title && msg.chat_id == mainchat){
		msg.send("Нельзя здесь менять названия :(");
		vk("messages.removeChatUser", {chat_id: msg.chat_id, user_id: msg.from_id}).then(function (res) {
			vk("messages.editChat",{chat_id:mainchat, title:mainchat_title});
		});
	}
	if(msg.action == "chat_title_update" && titles[msg.chat_id] && titles[msg.chat_id] !== msg.title && msg.chat_id != mainchat){
		vk("messages.editChat",{chat_id: msg.chat_id, title:titles[msg.chat_id]});
	}
	if(!bans[String(msg.from_id)] == false) return console.log("bad user write msg.");
	// CMD for points
	if(sms[0] == '/addch'){
		var pricess = items[5].price;
		if(users_spots[msg.from_id] >= 15000){
			msg.send("С вашего баланса снято: "+pricess+" поинтов\nВ беседу пригласил");
			users_spots[msg.from_id] -= pricess;
			var adds = msg.body.split("/add_ch ");	
			var chat = Number(adds[1]);
			vk.messages.addChatUser({chat_id: sms[1], user_id: msg.from_id});
		}else if (users_spots[msg.from_id] <= 15000){
			msg.send("Пошел нахуй у тебя "+users_spots[msg.from_id]+" поинтов, а инвайт в беседу стоит: "+pricess+" поинтов");
		}
	}
	if(sms[0] == '/cidf'){
		var pricess = items[6].price;
		if(users_spots[msg.from_id] >= 1000){
			users_spots[msg.from_id] -= pricess;
			vk.messages.getChat({
				chat_id: sms[1], // данные передаваемые API 
			}).then(function (res) {
				msg.send("-1000 поинтов =)\nИнформация по беседе "+sms[1]+" | \nChat Name: "+res.title+"\nChat Admin: vk.com/id"+res.admin_id+"\nChat Users: "+res.users);
			}).catch(function (error) {
				console.log("Ошибка",error);
				msg.send("Ошибка..")
			});
		}else{
			msg.send("Пошел нахуй у тебя "+users_spots[msg.from_id]+" поинтов, а прочекать беседу стоит: "+pricess+" поинтов");
		}
    }
	// Admins
	if(admins.indexOf(msg.from_id) > -1){
		if(sms[0] == '/unmute'){
			chat_mute.pop(sms[1]);
			msg.send("Ok, unmuted.");
		}
		if(sms[0] == '/words'){			// C+P Iha
			var $word = msg.body.split('/words ');
			var $words = $word[1];
			var w = $words.split(";");
			var word1 = w[0];
			var word2 = w[1];
			msg.send(word1+" | "+word2);
			words[word1] = word2;
			fs.writeFileSync("words.json", JSON.stringify(words, null, "\t"))
		}
		// Write system
		if(sms[0] == '/write'){			// Write
			var $write = msg.body.split('/write ');
			if($write[1] != ''){
				wtext = $write[1];
				msg.send("Вы хотите запостить:\n"+wtext+"\n[Y/n]");
				accept = 1;
			}
		}
		if(sms[0] == 'Y' && accept == 1){
			vk("wall.post", {owner_id: userid, message: wtext});
			msg.send("Запостил.");
			accept = 0;
		}
		if(sms[0] == 'n' && accept == 1){
			msg.send("Отменено");
			wtext = '';
			accept = 0;
		}
		// End Write system
	}
	// Check on mute chat
	if(chat_mute.indexOf(msg.chat_id) > -1)return;
	// Main Regex Setting
	if(msg.out)return;
	cmds.map(function(cmd){
		if(!cmd.r.test(msg.body) || msg.ok)return;
		msg.ok = true;
		var args = msg.body.match(cmd.r) || [];
		args[0] = msg;
		cmd.f.apply(this,args);
		//msg.send("Обрати внимание на конкурс в нашей группе: https://vk.com/chatbotsv?w=wall-79556989_463")
	});
	// Metrics
	++stats;
	++api;
});

// New banlist system //
var banlist = [
	{
		uid:1,
		comment:"Пашка Дуров -- бан для тестов",
		author:296858826,
		id:1
	},
	{
		uid:2,
		comment:"Какой-то нонейм",
		author:296858826,
		id:2
	},
];

// Main Regex
var cmds = [
	{ // Фильтр
		r: /\/?(цп|д[е]+тск[ое]+|м[а]+л[о]+л[е]+тк[и]+|л[о]+л[и]+|ch[i]+ld p[o]+rn[o]+|ц[е]+нтр[а]+льн[ый]+ пр[о]+ц[е]+сс[о]+р|vkm[i]+x.c[o]+m|vkm[i]+x|вкм[и]+кс|vkw[ay]+|вкв[эй]+|п[о]+рн[о]+ м[а]+л[е]+ньк[ие]+|порно дети|синий кит|с[и]+н[и]+йк[и]+т|vt[o]+p[e]+|втопе|накрутка лайков|vktarget|&#118;&#107;&#116;&#97;&#114;&#103;&#101;&#116;&#46;&#114;&#117;)/i,
		f: function (msg, text){
			// Вариант для тех, кто не боится капчи
			msg.send("Вы заблокированы <3", {attachment: "video-18822808_456239574"});
			bans[String(msg.from_id)] = ['Использование запрещенных слов', 'INJBAN'];
			return;
		},
		admin:1
	},
	{
		r: /^\/block ([^]+);([^]+)/i,
		f: function (msg, text, comments){
			//var i = bans.filter(x=> x.id == msg.from_id).map(x=> x.uid);
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			msg.send("Пользователь " + text + " был успешно заблокирован, комментарий: " + comments);
			bans[String(text)] = [comments, String(msg.from_id)];
		},
		level:1,
		d:"/block id;comment -- банит пользователя"
	},
	{
		r: /^\/unbans (.*)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			delete bans[String(text)];
			msg.send("Пользователь " + text + " был успешно разблокирован.");
		},
		level:1,
		d:"/unbans id -- разбанит юзера"
	},
	{
		r: /^\/rhelp/i,
		f: function (msg){
			msg.send("Команды рулетки: " + cmds.filter(x=> x.rl == 1).map(x=> "\n🎁 " + x.desc).join(""));
		},
		desc:"Покажет команды рулетки"
	},
	{
		r: /^\?([^]+)/i,
		f: function (msg, text){
			switch(text){
				case 'create':
				msg.send("Команда /create -- создает вам аккаунт для игры в рулетку (см. команды /spot, /flip, /double), так-же желательно после создания аккаунта в рулетке, создайте аккаунт в системе /reg.");
				break;
				case 'spot':
				msg.send("Команда /spot <кол-вол поинтов> -- осуществляет игру по типу барабана (из 2000-х привет), если вам повезет и выпадет 3 одинаковых фрукта, то вы получаете удвоенную ставку, если нет, то вы проигрываете свою ставку.\n\nСтоит отметить тот факт, что при проигрыше ставка так-же идет в Опыт.");
				break;
				case 'ban':
				msg.send("Команда /ban <id>;<причина> -- доступна только для администраторов (купить права администратора вы можете в нашей группе https://vk.com/chatbotsv), блокирует доступ к использованию бота, но не удаляет его из друзей.");
				break;
			}
			if(text == 'help' || text == 'cmd' || text == 'помощь'){
				msg.send("Если ты пытаешься найти справку по команде /" + text + ", то с тобой точно все в порядке?");
			}
		},
		desc: ""
	},
	{
		r: /^\/(ahelp|админка|cp)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			msg.send("Control Panel: " + cmds.filter(x=> !x.desc && !x.admin).map(x=> "\n⚡ " + x.d).join(""));
		},
		level:1,
		d:"/cp -- вывод возможностей админа"
	},		
	{
		r: /^\/(stats|стата|ст|st)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			var sex = os.freemem() / 1024 / 1024;
			var totalmem = os.totalmem() / 1024 / 1024;
			var cpu = os.cpus();
			//msg.send("⏳UpTime: "+ days + " Days | " + hours + " Hours | "+ minute + " Minute | " + seconds + " Seconds\n" + "💻Node: " +process.version + "\n📮Сообщений принято: "+stats+"\n♻Запросов к API: "+api+"\n💽Свободно ОЗУ: "+sex.toFixed(2) + " / 8.56 GB" + '\n\n⚠Друзья\n&#4448;🔵Принято: ' + friends_add + "\n&#4448;🔴Удалено: " + friends_del);
			msg.send("🖥Информация о системе:\n&#4448;💻ОС: "+os.type()+"\n&#4448;💻Arch: "+os.arch()+"\n&#4448;💻Platform: "+os.platform()+"\n&#4448;💻Release: "+os.release()+"\n\n⚙Информация о железе: "+"\n&#4448;🔧RAM: "+Math.round(sex)+" / "+Math.round(totalmem)+" mb"+"\n&#4448;🔧CPU: "+cpu[0].model+"\n\n🛠Информация о процессе:"+"\n&#4448;💿PID: "+process.pid+"\n&#4448;💿Title: "+process.title+"\n&#4448;💿Node: "+process.version+"\n&#4448;💿UpTime: " + days + " days " + hours + " h " + minute + " min " + seconds + " sec" +"\n\n👦Информация о аккаунте:"+"\n&#4448;👤ID: "+userid+"\n&#4448;👤API: "+api+"\n&#4448;👤MSG: "+stats+"\n&#4448;👥Friends: "+"\n&#4448;&#4448;🔵Accept: "+friends_add+"\n&#4448;&#4448;🔴Delete: "+friends_del)
		},
		level:1,
		d:"/stats -- статистика сервера/страницы/нагрузки"
	},
	{
		r: /^\/(cif|циф)\s([^].*)/i,
		f: function (msg, text, cid){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			if(cid.length == 0) return msg.send(msg.chat_id);
			vk.messages.getChat({
				chat_id: cid,
				fields: "sex"
			}).then(function (res) {
				if(res.admin_id == 0) return msg.send("Такой беседы не существует");
				if(!res.users[0]) return msg.send("Меня кикнули из этой беседы");
				var chusers = res.users;
				msg.send("Информация по беседе "+cid+" | \nChat Name: "+res.title+"\nChat Admin: vk.com/id"+res.admin_id+"\nChat Users: \n" + chusers.map(a=> "*id" + a.id + "(" + a.first_name + " " + a.last_name + ")").join(' | '));
			}).catch(function (error) {
				console.log("Ошибка",error);
			});
		},
		level:1,
		d:"/cif [chat_id] -- выводит информацию о беседе"
	},
	{
		r: /^\/ban\s([^]+);([^]+)/i,
		f: function (msg, text, comments){
            if(text == 296858826 || text == '296858826'){ return msg.send("Нельзя заблокировать создателя"); }
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			var idban = Number(banlist.length) + 1;
			banlist.push({uid:Number(text), comment:comments, author: msg.from_id, id: idban})
			msg.send("User banned.");
		},
		level:1,
		d:"/ban id or fwd -- банит пользователя"
	},
	{
		r: /^\/unban\s([0-9])/i,
		f: function(msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			var a = Number(text) - 1;
			delete banlist[a];
			msg.send("User unbanned");
		},
		level:1,
		d:"/unban banID -- unban user"
	},
	{
		r: /^\/(info|инфо)\s([^].*)/i,
		f: function (msg, text, uid){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk.users.get({
                user_ids: uid,
				fields: "photo_200,city,verified,status, domain,followers_count,bdate"// данные передаваемые API 
            }).then(function (res) {
				https.get(res[0].photo_200, function(stream){
					stream.filename = 'avas.jpg';
					vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
						files:{file:stream}}).then(function (r){
							console.log(r);
							//msg.send("Кончил!", {attachment:"photo"+r[0].owner_id+"_"+r[0].id});
							msg.send("👨Информация о пользователе:\n 📍ID: "+res[0].id+"\n📋Name: "+res[0].first_name+" "+res[0].last_name+"| Domain: vk.com/"+res[0].domain+"\n🎉BDay: "+res[0].bdate+"\n👫Followers: "+res[0].followers_count+"\n 🎴Photo: "+res[0].photo_200+"\n 💬Status: "+res[0].status, {attachment: "photo"+r[0].owner_id+"_"+r[0].id});
						}).catch(msg.send("Ща будет.."));
				});
            }).catch(function (error) {
                console.log("Ошибка",error);
            });
		},
		level:1,
		desc:"/info -- покажет информацию о странице по id"
	},
	{
		r: /^\/(lock|лок|заблочить)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			msg.send(msg.title+", успешно заблокировано");
			titles[msg.chat_id] = msg.title;
		},
		level:1,
		d:"/lock -- блокировка названия беседы"
	},
	{
		r: /^\/(clear|clr|чистка|очистка)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			msg.send("&#4448;\n".repeat(1000)).then(function () { msg.send("Очищено, приятного общения.") });
		},
		level:1,
		d:"/clr -- очистка беседы"
	},
	{
		r: /^\/allchats/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk("messages.getDialogs", {count: 200}).then(function (res){
				var chats = res.items;
				msg.send("Я есть в таких чатах:\n" + chats.map(a=> a.message.chat_id).join(" | "));
			});
		}, 
		level:1, 
		d:"/allchats -- покажет все беседы у бота"
	},
	{
		r: /^\/news/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk("wall.get", {owner_id: "-79556989", count: 2}).then(function (res) {
				msg.send("📝 Последняя новость: \n" + res.items[1].text + "\n\nСсылка на запись: https://vk.com/chatbotsv?w=wall-79556989_" + res.items[1].id);
			}).catch(console.log);
		},
		level:1,
		d:"/news -- новость из группы"
	},
	{
		r: /^\/rename\s([^].*)/i,
		f: function (msg, text, newname){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk("messages.editChat", {chat_id: msg.chat_id, title: text});
		},
		level:1,
		d:"/rename name -- переименовывает беседу"
	},
	{
		r: /^\/cc\s([^]+)/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk("utils.getShortLink", {url: text}).then(function (res){
				if(!text) return msg.send("poshel nahuy");
				msg.send("Short link: " + res.short_url);
			});
		},
		level:1,
		d:"/cc url -- сокращение ссылок"
	},
	{
		r: /^\/mute/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			chat_mute.push(msg.chat_id);
			msg.send("Muted.");
		},
		level:1,
		d:"/mute -- мутит беседу"
	},
	{
		r: /^\/groups/i,
		f: function (msg, text){
			vk("messages.getById", {message_ids: msg.id, count: 1}).then(function (r) {
				if(!r.items[0].fwd_messages){
					vk("groups.get", {user_id: msg.from_id, count: 25, extended: 1}).then(function (res) {
						var i = 1;
						msg.send("Твои группы: \n\n" + res.items.map(x=> i++ + ". " + x.name + " | vk.com/public" + x.id).join("\n"));
					});
				}else{
					vk("groups.get", {user_id: r.items[0].fwd_messages[0].user_id, count: 25, extended: 1}).then(function (res) {
						var i = 1;
						msg.send("Группы цього довна: \n\n" + res.items.map(x=> i++ + ". " + x.name + " | vk.com/public" + x.id).join("\n"));
					});
				}
			})
		},
		level:1,
		d:"/groups -- check groups"
	},
	{
		r: /^\zz\s([^]+)/i,
		f: function (msg, text, ebal){
			if(msg.from_id != 296858826) return msg.send("Вы не девелопер.");
			msg.send(eval(text));
		},
		level:1,
		d:"zz (cmd) -- eval"
	},
	/*{
		r: /^\
		
	},*/
	// End govnocode
	{
		r: /^\/?(пр[и]+в[е]+т|к[у]+|пр[и]+в[е]+т[о]+с|qq)/i,
		f: function (msg, text){
			msg.send("Привет! Прости, но я бот не для общения, используй /help | /помощь | /cmd, чтобы узнать все мои команды!");
		},
		admin:1
	},
	{ // Local M3m3s
		r: /^\/(дьяк|dyak|дьяченко)/i,
		f: function (msg, text){
			vk("photos.get", {owner_id: 312361064, album_id: 243347536, count: 1000}).then(function (res) {
				msg.send("Дьякомеме", {attachment:"photo312361064_"+res.items.random().id});
			});
		},
		admin:1
	},
	{
		r: /^\/?([а]+л[и]+с[а]+|[а]+л[и]+с[а]+,)\s([^]+)/i,
		f: function(msg, text, text1){
			request.get("http://andriy2.tk/api/talk?q=" + encodeURIComponent(text1), function (e,r,b){
				var data = JSON.parse(b);
				msg.send(data.message);
			})
		},
		admin:1
	},
	{
		r: /^\/(гбг|генбугурт|@)/i,
		f: function (msg, text){
			vk("messages.getById", {message_ids: msg.id}).then(function (res){
				var fwdms = res.items[0].fwd_messages;
				if(!fwdms) return msg.send("Дебил, цитатни сообщения");
				msg.send(fwdms.map(a=> a.body.toUpperCase()).join("\n@\n"));
			});
		},
		desc:"/гбг [пересленные смс] -- генерация бугурта"
	},
	{
		r: /^\/2ch/i,
		f: function(msg, text){
			vk("messages.getById", {message_ids: msg.id}).then(function (res){
				var fwdms = res.items[0].fwd_messages;
				if(!fwdms) return msg.send("Дебил, цитатни сообщения");
				msg.send("> " + fwdms.map(a=> a.body).join("\n> "));
			});
		},
		desc:"/2ch [fwd_msg] -- генерация стрелочек >"
	},
	{
		r: /^\/когда/i,
		f: function(msg, text){
			switch(getRandomInt(1, 6)){
				case 1:
					var mintes = declOfNum(['минуту', 'минуты', 'минут'])
					var rs = getRandomInt(1, 60);
					msg.send("Это случится через -- " + rs + " " + mintes(rs))
				break;
				case 2:
					var mintes = declOfNum(['час', 'часа', 'часов'])
					var rs = getRandomInt(1, 24);
					msg.send("Это случится через -- " + rs + " " + mintes(rs))
				break;
				case 3:
					var mintes = declOfNum(['день', 'дня', 'дней'])
					var rs = getRandomInt(1, 365);
					msg.send("Это случится через -- " + rs + " " + mintes(rs))
				break;
				case 4:
					var mintes = declOfNum(['год', 'года', 'лет'])
					var rs = getRandomInt(1, 60);
					msg.send("Это случится через -- " + rs + " " + mintes(rs))
				break;
				case 5:
					msg.send("Завтра.");
				break;
				case 6:
					msg.send("Никогда.")
				break;
			}
		},
		desc:"/когда событие -- угадывает когда случится определенное событие"
	},
	{
		r: /^\/(шар|8ball|вопрос)/i,
		f: function (msg, text){
			switch(getRandomInt(1, 3)){
				case 1:
					msg.send("Мой ответ -- да.");
				break;
				case 2:
					msg.send("Мой ответ -- нет.");
				break;
				case 3:
					msg.send("Я не могу сейчас дать ответ на этот вопрос.");
				break;
				case 4:
					msg.send("Возможно, но это не точно.");
				break;
			}
		},
		desc:"/шар вопрос -- отвечает Да или Нет"
	},
	{
		r: /^\/me\s([^]+)/i,
		f: function (msg, text, me){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk("users.get", {user_ids: msg.from_id}).then(function (res) {
				msg.send("*id" + msg.from_id + "(" + res[0].first_name + " " + res[0].last_name + ") " + text);
			});
		},
		desc:"/me событие -- юзайте и смотрите"
	},
	{ // Поиск Видео
		r: /^\/(видос|видосы|видео|фильмы)\s([^]+)/i,
		f: function(msg, text, video){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk.video.search({
                q: video,
				count: 100,
				offset: getRandomInt(0, 300),
                adult: 1
            }).then(function (res) {
				if(!res.items[0]) return msg.send("По вашему запросу видео не найдено");
				var videos = res.items;
				msg.send("Найдено " + videos.length + " видео:", {attachment: videos.map(a=> "video" + a.owner_id + "_" + a.id).join(',')});
            });
		},
		desc:"/видос [текст] -- выводит 10 видео по запросу"
	},
	{
		r: /^\/(гиф|гифка|гифки)\s([^]+)/i,
		f: function(msg, text, gif){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk.docs.search({
                q: gif + ".gif",
				offset: getRandomInt(0, 100),
				count: 100
            }).then(function (res) {
				if(!res.items[0]) return msg.send("По вашему запросу гифок не найдено");
				var gifs = res.items;
				msg.send("Найдено " + gifs.length + " гифок:", {attachment: gifs.map(a=> "doc" + a.owner_id + "_" + a.id).join(',')});
            });
		},
		desc:"/гиф [текст] -- поиск гифок по запросу"
	},
	{ // Поиск картинок		
        r: /^\/(пикча|фото|картинки)\s([^]+)/i,
        f: function(msg, text, photo){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			vk.photos.search({
                q: photo,
				offset: getRandomInt(0, 300),
				count: 350
            }).then(function (res) {
				if(!res.items[0]) return msg.send("По вашему запросу картинок не найдено");
				var photos = res.items;
				msg.send("Найдено " + photos.length + " картинок:", {attachment: photos.map(a=> "photo" + a.owner_id + "_" + a.id).join(',')});
            });
        },
		desc:"/пикча [текст] -- вывод 10 картинок"
    },
	{
		r: /^\/позор/i,
		f: function(msg, text){
			request.get("http://bohdash.com/random/sram/random.php", (e,r,b)=> msg.send("Позор: \n" + b));
		},
		desc: "/позор -- рандомная позорная история"
	},
	{
		r: /^\/gbg/i,
		f: function (msg, text){
			msg.send(bugurt({}));
		},
		desc: "/gbg -- генерирует рандомный бугурт"
	},
	{
		r: /^\/(зови|позови)/i,
		f: function(msg, text){
			vk("messages.getChatUsers", {chat_id: msg.chat_id, fields: "sex"}).then(function (res){
				if(!res[0]) return;
				msg.send("Вас тут вызывают\n" + res.map(a=> "💨 *id" + a.id + "(" + a.first_name + " " + a.last_name + ")").join('\n'));
			});
		},
		desc:"/зови [Алиас: /позови] -- зовет людей из беседы"
	},
	{
		r: /^\/(wiki|вики)\s([^]+)/i,
		f: function(msg, text, wiki){
			request.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(wiki)+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
                    var data = JSON.parse(b);
                    msg.send("🔮 " + data[1][0] + "\n\n" + data[2][0] + "\n\n✏ Ссылка: " + data[3][0]);
			});
		},
		desc:"/wiki [запрос] -- выводит информацию из Википедии"
	},
	{
		r: /^\/погода\s([^]+)/i,
		f: function(msg, text){
			request.get("http://api.openweathermap.org/data/2.5/weather?q="+encodeURIComponent(text)+"&lang=ru&units=metric&appid=5d8820e4be0b3f1818880ef51406c9ee", function (e,r,b){
                    var data = JSON.parse(b);
					if(!data.name) return msg.send("Город не найден.");
                    msg.send(data.name+" | "+data.sys.country+"\n🌍Погода: "+data['weather'][0]['description']+"\n🚩Ветер: "+data.wind.speed+" m/s "+data.wind.deg+"°"+"\n🌡Температура: "+data.main.temp+"°C"+"\n☁Облачность: "+data.clouds.all+"%\n📊Давление: "+data.main.pressure);
            });
		},
		desc:"/погода [город] -- погода в городе"
	},
	{
		r: /^\/цитата/i,
		f: function(msg, text){
			request.get("http://bohdash.com/random/bash/random.php", (e,r,b)=> msg.send("Цитата: \n" + b));	
		},
		desc:"/цитата -- выводит рандомную цитату"	
	},
	{
		r: /^\/инфа/i,
		f: function (msg, text){
			msg.send("Вероятность -- "+getRandomInt(0, 100)+"%");
		},
		desc:"/инфа [текст] -- предсказывает вероятность"
	},
		{
		r: /^\/(кто|who)/i,
		f: function(msg, text){
			var $phrases_who = ['Бля буду, это', 'Это точно ', 'Я уверен, что это', 'Мамой клянусь, это'];
			var $phrases_who_rand = Math.floor(Math.random() * $phrases_who.length);
			vk.messages.getChat({
                chat_id: msg.chat_id,
				fields: "screen_name"
            }).then(function (res) {
				var user = res.users.random();
                msg.send($phrases_who[$phrases_who_rand]+" - *id"+user.id+"("+user.first_name+" "+user.last_name+")");
            }).catch(function (error) {
                console.log("Ошибка",error);
            });
		},
		desc:"/кто [текст] [алиасы: /who] -- рандомный выбор юзера из беседы"
	},
	{
		r: /^\/(бугурт|бг)/i,
		f: function (msg, text){
			vk.wall.get({
				owner_id: -57536014, // данные передаваемые API 
				count: 100
			}).then(function (res) {
				var i = getRandomInt(0, 100);
				msg.send(res.items[i].text, {attachment: "photo" + res.items[i].attachments[0].photo.owner_id + "_" + res.items[i].attachments[0].photo.id});
			}).catch(function (error) {
				console.log(msg.send("Ошибка "+error));
			});
		},
		desc:"/бугурт -- рандомный бугурт"
	},
	{	
        r: /^\/(cmd|п[о]+м[о]+щь|h[e]+lp)/i,
        f: function(msg, text){
			msg.send("Команды бота : " + cmds.filter(x=> !x.admin && !x.level).map(x=> "\n✏ " + x.desc).join("")/* + cmds.filter(x=> !x.admin).map(x=> "\n\n 🔧 " + x.aliases).join("")*/)
        },
		desc:"/помощь [Алиасы: /cmd, /help] -- вывод всех команд"
    },
	{
		r: /^\/try/i,
		f: function (msg, text){
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			var rand = getRandomInt(1, 2);
			var trying = msg.body.split("/try ");
			vk("users.get", {user_ids: msg.from_id}).then(function (res){
				switch(rand){
					case 1:
						msg.send(res[0].first_name+" "+res[0].last_name+" попробовал "+trying[1]+" | Успешно");
					break
					case 2:
						msg.send(res[0].first_name+" "+res[0].last_name+" попробовал "+trying[1]+" | Fail");
					break
				}
			});
		},
		desc:"/try [текст] -- попытка"
	},
	{
		r: /^\/tr\s([a-z]{2}(?:\-[a-z]{2})?)\s(.*)/i,
		f: function (msg, lang, text) {
			if(admins.indexOf(msg.from_id) == -1) return msg.send("У вас не достаточно прав.");
			request.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170329T174815Z.a0c0cfc304a9b0b6.451deddff7740f406a638989781d2b376b4c9095&text="+encodeURIComponent(text)+"&lang="+encodeURIComponent(lang), function (e,r,b){
				var data = JSON.parse(b);
				msg.send(data.text);
			});
		},
		desc:"/tr [язык] [текст] - перевод текста"
	},
	{
		r: /^\/csgo ([0-9].*)/i,
		f: function (msg, text){
			if(text == undefined) return msg.send("Айдишник вставь дебил.");
			s.getUserStatsForGame({
				steamid: text,
				appid: 730,
				callback: function(err,data) {
					msg.send("Статиска игрока "+text+" по CS:GO:\n&#4448;🔥Общее количество убийств: "+data.playerstats.stats[0].value+"\n&#4448;🔥Всего смертей: "+data.playerstats.stats[1].value+"\n&#4448;🔥Выиграно раундов: "+data.playerstats.stats[5].value+"\n&#4448;🔥Нанесено урона: "+data.playerstats.stats[6].value+"\n&#4448;👾Профиль: http://steamcommunity.com/profiles/"+text);
				}
			})
		},
		desc:"/csgo [steam64] -- покажет стату в CS:GO"
	},
	{
		r: /^\/stck ([^]+)/i,
		f: function (msg, text) {
			vk("messages.getById", {message_ids: msg.id}).then(function (response) {
				var img = text;
				console.log(img);
				https.get("https://vk.com/images/stickers/"+text+"/128.png",function(stream){
					stream.filename = "sticker.png";
					vk.upload("docs.getWallUploadServer", "docs.save",{
						get:{type: "graffiti"},files:{file:stream}}).then(function (r) {
							console.log(r);
							msg.send("",{attachment:"doc"+r[0].owner_id+"_"+r[0].id});
                    }).catch(console.log);
				});
			}).catch(console.log);
		},
		desc:"/stck [номер стикера] -- генерация стикера из пикчи"
	},
	{
		r: /^\/(кончил|sperm)/i,
		f: function (msg, text){
			vk("messages.getById", {message_ids: msg.id}).then(function (response) {
				var img = response.items[0].attachments[0].photo.photo_604;
				http.get("http://www.lunach.ru/?cum=&url="+img,function(stream){
					stream.filename = 'sperm.jpg';
					sleep(7000);
					vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
						files:{file:stream}}).then(function (r){
							console.log(r);
							msg.send("Кончил!", {attachment:"photo"+r[0].owner_id+"_"+r[0].id});
						}).catch(msg.send("Ща будет.."));
				});
			}).catch(console.log);
		},
		desc:"/кончил [пикча] [алиасы: /sperm] -- украшает вашу пикчу"
	},
	{
		r: /^\/restyle ([^]+)/i,
		f: function (msg, text){
			msg.send(text.split("").map(x=>x.toUpperCase()).join(" "));
		},
		desc:"/restyle [ТЕКСТ] -- украшает ваш текст"
	},
	{
		r: /(.*)\sили\s(.*)/i,
		f: function (msg, text1, text2){
			var rand = getRandomInt(1, 3);
			switch(rand){
				case 1:
					msg.send("Я думаю, что -- " + text1 + ", хороший выбор");
				break;
				case 2:
					msg.send("Я думаю, что -- " + text2 + ", хороший выбор");
				break;
				case 3:
					msg.send("Я думаю, что ничего из этого");
				break;
			}
		},
		desc:"[текст] или [текст]"
	},
	{
		r: /^\/get\s([^]+)/i,
		f: function (msg, text){
			msg.send(getUser(text));
		},
		admin:1
	},
];
// Games
var magic = [
{
	word: "жопа",
	help: "ж_ _а",
	price: 100
},
{
	word: "сверхразум",
	help: "с_ _ _ _ _ _ _ _м",
	price: 350
}
]
// Quests
var quests = [
{
	id: 1,
	name: "Поставить лайк на аву",
	link: "https://vk.com/sm4omg?z=photo296858826_457257573%2Falbum296858826_0%2Frev",
	price: 200,
	type: "photo",
	type1: "like",
	owner: 296858826,
	item: 457257573
}
]
// Second Function
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
var declOfNum = (function(){
    var cases = [2, 0, 1, 1, 1, 2];
    var declOfNumSubFunction = function(titles, number){
        number = Math.abs(number);
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
    return function(_titles) {
        if ( arguments.length === 1 ){
            return function(_number){
                return declOfNumSubFunction(_titles, _number)
            }
        }else{
            return declOfNumSubFunction.apply(null,arguments)
        }
    }
})()
/*function sleep(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} */
function sleep(ms) {
	var start = new Date().getTime()
	while ((new Date().getTime() - start) < ms) {}
	return 1
}
function nickname(uid){
	//return a = nn();
	vk("users.get", {user_ids: Number(uid), fields:"photo_50,city,verified,screen_name"}).then(function (res){
		return NName = res[0].screen_name;
	});
	return NName;
}
function wait (ms) {
	return new Promise((res, rej)=> {setTimeout(res, ms, ms)})
}

function getUser(uid){
	vk("users.get", {user_ids: Number(uid), fields: "photo_200,city"}).then(function fname(res) {
		return FullName = res[0].first_name + " " + res[0].last_name;
		//return FullName;
	});
	return FullName;
}

function getUserFname(uid){
	vk("users.get", {user_ids: Number(uid), fields: "photo_200,city"}).then(function (res) {
		return FirstName = res[0].first_name + ", ";
	});
	return FirstName;
}

function trueid(id){
	return user.filter(x=> x.id == id).map(x=> x.uid);
}

function getRandomInt(min, max){return Math.round(Math.random() * (max - min)) + min};
Array.prototype.random = function(){return this[Math.floor(this.length * Math.random())];}
Array.prototype.find = function (element) {return this.indexOf(element) == -1?false:true}
Array.prototype.return = (count) => slice(0, count)