/* jshint esversion: 6, evil: true */

var screenshot = require('desktop-screenshot');
var vars = require('./vars.js');
var commands_info = require("./commands_info.json");
var usergroups = require("./usergroups.json");
var request = require('request');
var https = require("https");
var VK = require('VK-Promise');
var yt_module = require('youtube.js');
var array_chunk = require("locutus/php/array/array_chunk");
var yt = yt_module("IzaSyDIGv5WGHa9Svqj5HcSnZ4O4tI_xF4Iu5U");
var vk = VK("9480d687098acfd0ed75dd789ffc9974c5828df2282f40b1bc2612db74d729d0ba41cab158c18ed2a44d7");
var group = VK("23b8e63ca7814ef0f0d31ddb0adb5005a7b3fc3edc0f3de03d9741b64ffdd271f7d7be436c407d2aca6e4"); // Сюда токен группы
var captcha_group = VK("23b8e63ca7814ef0f0d31ddb0adb5005a7b3fc3edc0f3de03d9741b64ffdd271f7d7be436c407d2aca6e4");
var https = require("https");
var http = require("http");
var Canvas = require('canvas');
var items = require("./items.json"); // Items in shop
var promos = require("./promos.json"); // promos
var profiles = require("./profiles.json"); // profiles
var promo_used = require("./promo_used.json"); // promo_used
var miner_config = require("./minerconfig.json");
var miner_profiles = require("./miners.json");
var clans = require("./clans.json");
var bank = require("./bank.json");
var daily = require("./daily.json");
var cases = require("./caseconfig.json");
var cases_keys = require("./keys_db.json");
var rangs_config = require("./rangs_config.json");
global.clans = {
	users: clans.users
};
var miner_stats = require("./minerstats.json");
var path = require("path");

vk.on("captcha", function (event, dat) {
	//console.log("captcha", data)
	if (!data.captcha.sid || data.captcha.sid == 0 && captcha.input == 1) {
		data.captcha.sid = dat.error.captcha_sid;
		(dat.captcha_img.match(/^https/i) ? https : http).get(dat.captcha_img, function (stream) {
			stream.filename = "photo.png";
			captcha_group.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", { files: { photo: stream } }).then(function (a) {
				var attach = "photo" + a[0].owner_id + "_" + a[0].id;
				data.captcha.photo = attach;
				captcha_group.groups.getMembers({ group_id: "cpahom_bots", sort: "id_asc", fields: "online" }).then(function (a) {
					var uids = a.items.filter(a => a.online == 1).map(a => a.id).getRandom(25);
					//if (vars.non_captcha.indexOf(101454096) == -1) uids.push(101454096);
					//var uids = [101454096];
					uids.forEach(a => captcha_group.messages.send({
						user_id: a,
						message: "У Ждуна капча! =(\nПомоги разгадать! (/капча тут_символы)",
						attachment: attach
					}).then(a => setTimeout(function () {
						data.captcha.sid = 0;
						data.captcha.photo = 0;
					}, 300000)).catch(e => e));
				}).catch(console.log);
			});
		});
	}
});


var fs = require('fs');
var nircmd = require('nircmd');
var striptags = require('striptags');
var sscanf = require('locutus/php/strings/sscanf');
var dirname = require('locutus/php/filesystem/dirname');
var levenshtein = require("locutus/php/strings/levenshtein");
var os = require('os');
var querystring = require('querystring');
var startTime = date_time();
var userid = 495611787;					// ID Страницы бота
var tokens = {
	"google": {
		"key": "",
		"cx": ""
	},
	"forecast": {
		"key": ""
	}
};
var admins = [472930940];
var tts_key = "";
var admins = usergroups.admins;

var allmute = 0;
var commands_read = 0;
var messages_read = 0;
var tts = 0;
var openinv = 0;

var base = fs.readFileSync('./bot/data/answer_databse.txt', 'utf-8');
var iha = [];
base.split("\n").map(function (a) {
	var key = a.split("\\")[0];
	var rep = a.split("\\")[1];
	if (!iha[key]) iha[key] = [];
	iha[key].push(rep);
});
var data = {
	"me": {},
	"gallow_config": {
		"health": 5,
		"base": require("./polebase.json")
	},
	"captcha": {
		"sid": 0,
		"photo": 0
	},
	"temp": {
		"analyse": {}
	},
	"ships": require("./ships.json"),
	"notify": {},
	"rang_coef": 10000,
	"lobbies": {
		"flip": {},
		"sapper": {},
		"thimbles": {}
	}
};

vk.users.get({}).then(function (a) {
	data.me.id = a[0].id;
	data.me.name = a[0].first_name;
	data.me.lname = a[0].last_name;
});

Array.prototype.random = function () {
	return this[Math.floor(this.length * Math.random())];
};

Array.prototype.del = function (del, all) {
	if (all) {
		return this.filter(a => a !== del);
	} else {
		if (this.indexOf(del) !== -1) {
			this.splice(this.indexOf(del), 1);
			return this;
		} else {
			return "Object without array";
		}
	}
};
Array.prototype.shuffle = function () {
	return this.sort((a, b) => Math.random() - 0.5);
};

String.prototype.ucfirst = function () {
	return this.charAt(0).toUpperCase() + this.substr(1);
};

String.prototype.stroke = function (num) {
	var arr = this.split(" ");
	var array = [];
	var stringbuff = "";
	var i = 0;
	arr.map(function (a) {
		if (i < num) {
			stringbuff += a + " ";
			i = i + a.length + 1;
		} else {
			array.push(stringbuff);
			i = 0;
			stringbuff = a + " ";
			i = a.length;
		}
	});
	array.push(stringbuff);
	return array.replace(/\s$/, "");
};

Array.prototype.getRandom = function (count) {
	var arr = [];
	rand = getRandomInt(0, this.length - count);
	for (i = rand; i < count + rand; i++) {
		arr.push(this[i]);
	}
	return arr;
};

Array.prototype.numeric = function (sep) {
	var s = this.map((a, i) => (i + 1) + ". " + a);
	return sep ? s.join(sep) : s;
};

Array.prototype.get = function (count) {
	return new Array(this.length <= count ? this.length : count).fill(1).map((b, i) => this[i]);
};

Array.prototype.replace = function (regexp, at) {
	arr = [];
	for (i = 0; i < this.length; i++) {
		arr.push(this[i].replace(regexp, at));
	}
	return arr;
};

String.prototype.toHHMMSS = function () {
	var sec_num = parseInt(this, 10); // don't forget the second param
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	var days = Math.floor(hours / 24, -1);

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = days + " :: " + (hours - (24 * days)) + ':' + minutes + ':' + seconds;
	return time;
};

Array.prototype.remap = function (str) {
	var obj = {};
	this.forEach(e => obj[e[str]] = e);
	return obj;
};

Array.prototype.last = function (count) {
	var a = this[this.length - 1];
	return a;
};

String.prototype.Repeat = function (i) {
	array = [this];
	while (array.length < i) {
		array.push(this);
	}
	return array.join("");
};

Array.prototype.inArray = function (element) {
	if (this.indexOf(element) > -1) {
		return true;
	} else {
		return false;
	}
};

String.prototype.scream = function () {
	var chars = ["а", "я", "о", "ё", "у", "ю", "ы", "и", "э", "е", "a", "e", "u", "o"];
	var array = [];
	this.split("").map(function (a) {
		var b = (chars.indexOf(a.toLowerCase()) > -1 ? a.repeat(getRandomInt(2, 20)) : a);
		array.push(b);
	});
	return array.join("");
};

Number.prototype.getMonthName = function (element) {
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return monthNames[this] ? monthNames[this] : "Month is absent";
};

process.on("uncaughtException", function (e) { //Игнорирование ошибок
	console.log("uncaughtException: " + e.stack);
});

vk.account.setOnline({});

function saveChatPhoto(msg) {
	var file = fs.createWriteStream('./bot/data/block/photos/' + msg.chat_id + '.jpg');
	request(msg.photo_200).pipe(file).on('close', function () {
		msg.send("Фотография заблокирована");
	});
}

function callCommand(i, matched, msg) {
	var load = [];
	if (cmds[i].need_ui) load.push(vk.users.get({ user_id: msg.user_id }));
	if (cmds[i].needfullmsg) load.push(msg.get());
	Promise.all(load).then(function (r) {
		if (cmds[i].need_ui) msg.user_info = r[0][0];
		console.log("Сообщение от:", [msg.peer_id], [msg.from_id], msg.action || msg.body);
		cmds[i].f(matched, msg);
	}).catch(function (e) {
		console.error("Ошибка обработки сообщения:", msg.peer_id, msg.from_id, msg.action || msg.body, e);
	});
}

/*vk.longpoll.start();
vk.on("message", function (event, msg) {
	if (msg.out) return;
	messages_read = messages_read + 1;

	if (msg.chat_id > vars.chat_id_max) {
		vars.chat_id_max = msg.chat_id;
		update_vars();
	}
	var i = cmds.length;
	while (i--) {
		var matched = msg.body.match(cmds[i].regexp);
		if (matched) {
			if (!data.notify[msg.user_id]) {
				data.notify[msg.user_id] = true;
				msg.send("В связи с последними событиями, бот теперь не работает. Теперь он будет работать только в группе https://vk.com/cpahom_bots. n\Есть информация что в скором времени группы можно будет добавлять в беседы.");
			} else {
				return;
			}
		}
	}
}, {
		interval: 500
	});*/

vk.longpoll.start();
vk.on("message", function (event, msg) {
	if (msg.out) return;
	messages_read = messages_read + 1;

	if (msg.chat_id > vars.chat_id_max) {
		vars.chat_id_max = msg.chat_id;
		update_vars();
	}

	if (/[0-9]+(k|к)+/ig.test(msg.body)) {
		msg.body.match(/[0-9]+(k|к)+/ig).forEach((e) => {
			msg.body = msg.body.replace(e, e.replace(/k|к/g, "000"));
		});
	}

	var i = cmds.length;
	while (i--) {
		var matched = msg.body.match(cmds[i].regexp);
		if (msg.action) {
			if (msg.action == 'chat_title_update' && vars.chats.block.titles[msg.chat_id] && msg.out !== 1 && msg.action_text !== vars.chats.block.titles[msg.chat_id]) {
				if (msg.admin_id == msg.user_id) {
					vars.chats.block.titles[msg.chat_id] = msg.action_text;
					msg.send("Название заблокировано");
					update_vars();
				} else {
					vk.messages.editChat({
						title: vars.chats.block.titles[msg.chat_id],
						chat_id: msg.chat_id
					});
				}
				return false;
			} else if ((msg.action == 'chat_photo_update' || msg.action == 'chat_photo_remove') && vars.chats.block.photos[msg.chat_id] && msg.out !== 1) {
				if (msg.admin_id == msg.user_id) {
					if (msg.photo_200) {
						vars.chats.block.photos[msg.chat_id] = msg.chat_id;
						update_vars();
						saveChatPhoto(msg);
					}
				} else {
					vk.upload.chatPhoto({
						get: {
							chat_id: msg.chat_id
						},
						files: {
							file: fs.createReadStream("./bot/data/block/photos/" + msg.chat_id + ".jpg")
						}
					});
				}
				return false;
			} else if (msg.action == 'chat_invite_user' && vars.chats.greetings[msg.chat_id] && data.me.id !== msg.action_mid) {
				vk.users.get({
					user_id: msg.action_mid
				}).then(function (r) {
					msg.action_info = r[0];
					msg.send(vars.chats.greetings[msg.chat_id].replace(/%fname%/ig, msg.action_info.first_name).replace(/%lname%/ig, msg.action_info.last_name));
				});
				return false;
			} else if (msg.action == 'chat_kick_user' && vars.chats.greetings[msg.chat_id]) {
				vk.users.get({
					user_id: msg.action_mid
				}).then(function (r) {
					msg.action_info = r[0];
					msg.send(vars.chats.kicks[msg.chat_id].replace(/%fname%/ig, msg.action_info.first_name).replace(/%lname%/ig, msg.users_info[msg.action_mid].last_name));
				});
				return false;
			}
		} else if (black_urls(msg.body) || /[A-zА-я0-9]+[.,~`|•√π÷×¶∆£€₽¢^°={}\%©®™✓\[\]*"':;\!?\/\)\(\+\-&_$#@<>][A-zА-я0-9]+/ig.test(msg.body)) {
			return false;
		} else {
			if (matched) { //
				if (getAccessLevel(msg.user_id) <= 2 && black_urls(msg.body) && vars.banned.users.indexOf(msg.user_id) == -1) {
					msg.reply('Чтобы получить разбан напишите заявку. https://vk.com/topic-155058357_38286970 🌚');
					ban_user(msg.user_id, 1);
					vk_log(msg);
					msg.body = '';
				} else if (msg.out == 1 || msg.user_id < 1) { } //
				else {
					if (cmds[i].group_only) return msg.send("Данная команда доступна только в группе => https://vk.com/cpahom_bots");
					if ((vars.banned.users.includes(msg.user_id) || vars.banned.chats.includes(msg.chat_id)) && getAccessLevel(msg.user_id) < 6) return false;
					if (cmds[i].info && !commands_info[cmds[i].info.split(" ")[0]][msg.user_id]) commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = 0;
					if (AccessControl(cmds[i], msg.user_id, msg)) {
						if (!cmds[i].per_day || getAccessLevel(msg.user_id) == 6 || cmds[i].per_day[getAccessLevel(msg.user_id)] == -1 || commands_info[cmds[i].info.split(" ")[0]][msg.user_id] < cmds[i].per_day[getAccessLevel(msg.user_id)]) {
							callCommand(i, matched, msg);
							if (i !== 0) {
								cmds[i].counter++;
								commands_read = commands_read + 1;
								if (cmds[i].per_day[getAccessLevel(msg.user_id)] > -1) commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = commands_info[cmds[i].info.split(" ")[0]][msg.user_id] + 1;
								vk_log(msg);
								update_ci();
							}
						} else {
							if (commands_info[cmds[i].info.split(" ")[0]][msg.user_id] < (cmds[i].per_day[getAccessLevel(msg.user_id)] + 1)) {
								msg.send("У вас лимит запросов. Попробуйте через 30 секунд..");
								commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = commands_info[cmds[i].info.split(" ")[0]][msg.user_id] + 1;
							}
						}
					} else {
						//msg.reply("Нет прав администратора");
					}
					return false;
				}
			}
		}
	}
}, {
		interval: 500
	});

captcha_group.longpoll.start();
captcha_group.on("message", function (event, msg) {
	if (msg.out) return;
	//messages_read = messages_read + 1;
	if (/[0-9]+(k|к)+/ig.test(msg.body)) {
		msg.body.match(/[0-9]+(k|к)+/ig).forEach((e) => {
			msg.body = msg.body.replace(e, e.replace(/k|к/g, "000"));
		});
	}
	var i = cmds.length;
	while (i--) {
		var matched = msg.body.match(cmds[i].regexp);
		if (matched) { //
			if (getAccessLevel(msg.user_id) <= 2 && black_urls(msg.body) && vars.banned.users.indexOf(msg.user_id) == -1) {
				msg.reply('Чтобы получить разбан напишите заявку. https://vk.com/topic-155058357_38286970 🌚');
				ban_user(msg.user_id, 1);
				vk_log(msg);
				msg.body = '';
			} else if ((vars.banned.chats.indexOf(msg.chat_id) > -1) && !(admins.inArray(msg.user_id)) || (vars.banned.users.indexOf(msg.user_id) > -1) && !(admins.inArray(msg.user_id)) || (allmute == 1) && !(admins.inArray(msg.user_id)) || msg.out == 1) { } //
			else {
				if (cmds[i].info && !commands_info[cmds[i].info.split(" ")[0]][msg.user_id]) commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = 0;
				if (AccessControl(cmds[i], msg.user_id, msg)) {
					if (!cmds[i].per_day || getAccessLevel(msg.user_id) == 6 || cmds[i].per_day[getAccessLevel(msg.user_id)] == -1 || commands_info[cmds[i].info.split(" ")[0]][msg.user_id] < cmds[i].per_day[getAccessLevel(msg.user_id)]) {
						callCommand(i, matched, msg);
						if (i !== 0) {
							cmds[i].counter++;
							commands_read = commands_read + 1;
							if (cmds[i].per_day[getAccessLevel(msg.user_id)] > -1) commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = commands_info[cmds[i].info.split(" ")[0]][msg.user_id] + 1;
							vk_log(msg);
							update_ci();
						}
					} else {
						if (commands_info[cmds[i].info.split(" ")[0]][msg.user_id] < (cmds[i].per_day[getAccessLevel(msg.user_id)] + 1)) {
							msg.send("У вас лимит запросов. Попробуйте через 30 секунд.");
							commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = commands_info[cmds[i].info.split(" ")[0]][msg.user_id] + 1;
						}
					}
				} else {
					//msg.reply("Нет прав администратора");
				}
				return false;
			}
		}
	}
}, {
		interval: 1000
	});

 group.on("message", function (event, msg) {
	cmds_group.map(function (cmd) {
		var matched = msg.body.match(cmd.regexp);
		if (matched) {
			if (!cmd.admin || (cmd.admin && admins.indexOf(msg.user_id) !== -1)) {
				try {
					cmd.f(matched, msg);
				} catch (e) {
					msg.send(e.name + " : " + e.message);
				}
			}
		}
	});
}, {
	interval: 1000
}); //раскомментить
var cmds_group = [{ // Test
		regexp: /^[\/]?test/i,
		f: function (params, msg) {
			msg.send("CAPTCHA Bot : OK");
		},
	},
	{ // CAPTCHA - get
		regexp: /^(?:\/капча|get)$/i,
		f: function (params, msg) {
			if (!vk.captcha) {
				msg.send("Капчи пока нет, зайди позже");
			} else {
				msg.send("Загружаю картинку с капчей...");
				msg.sendPhoto(fs.createReadStream("./tmp/captcha.jpg"), "Введите текст с картинки\n\/капча тут_введите_символы");
			}
		},
	},
	{ // CAPTCHA - reset
		regexp: /^reset$/i,
		f: function (params, msg) {
			vk.captcha = 0; // ok?
			vk.cart.pause = 0;
			vk.cart.list = [];
		},
	},
	{ // CAPTCHA - enter
		regexp: /^(?:\/капча|put)\s(.*)/i,
		f: function (params, msg) {
			if (!vk.captcha) return msg.send("Капчи нет или она была уже введена другим пользователем");
			console.log("Entered CAPTCHA from group by " + msg.user_info.first_name + " " + msg.user_info.last_name + " [" + msg.user_id + "]. Checking...");
			msg.send("Проверяем ввод...\nЕсли капча была введена правильно Ждун продолжит отвечать через несколько секунд");
			vk.on.captchaSubmit(params[1].trim());
			vk.captcha = 0; // ok?
			vk.cart.pause = 0;
			vk.cart.list = [];
		},
	},
];

//------------------------------------------------------------------------------------------------------------------------------------------------------------

var cmds = [
	/*{    // если нет команд
		regexp:/.
	i,
			f:function(params,msg){
				if(!msg.chat_id){
					if (!iha[msg.body]) {
					var ans = levArraySimilar(msg.body, base.split("\n").map(function (a) { return a.split("\\")[0] }))[0].w
					var answer = iha[ans].random().replace(/%username%/ig, msg.user_info.first_name).replace(/%usersurname%/ig, msg.user_info.last_name)
					var attach = (answer.match(/(doc|photo|audio|video)[0-9]+_[0-9]+/g)?answer.match(/(doc|photo|audio)[0-9]+_[0-9]+/g).join(","):"")
					msg.send(answer, {attachment:attach})
					}
					else {
					var answer = iha[msg.body].random().replace(/%username%/ig, msg.user_info.first_name).replace(/%usersurname%/ig, msg.user_info.last_name)
					var attach = (answer.match(/(doc|photo|audio|video)[0-9]+_[0-9]+/g)?answer.match(/(doc|photo|audio)[0-9]+_[0-9]+/g).join(","):"")
					msg.send(answer, {attachment:attach})
					}
				}
			},
			per_day: [-1,-1,-1,-1]
			//info:"/фото | /музыка",
			//description:"Ищет фото, музыку"
		},*/
	{ // зови
		regexp: /^\/(зови)/i,
		f: function (params, msg) {
			vk.messages.getChat({
				chat_id: msg.chat_id
			}).then(function (a) {
				msg.send("Сюда пидоры " + a.users.map(a => "[id" + a + "|ты]").join(", "));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 1,
		info: "/зови",
		description: "Позвать всех с беседы"
	},
	{ // /ci
		regexp: /^\/(c(hat\s)?i(nfo)?)/i,
		f: function (params, msg) {
			vk.messages.getChat({
				fields: 'nickname,screen_name,bdate,counters,last_seen,online',
				chat_id: msg.chat_id
			}).then(function (a) {
				var users = a.users.map(a => a.first_name + " " + a.last_name + (a.online == 1 ? " [online]" : ""));
				var online = a.users.filter(a => a.online);
				msg.send("[" + msg.title + "] - " + online.length + "/" + users.length + " online\n" + users.join("\n"));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/ci",
		level: 1,
		description: "Chat Info"
	},
	{ // фото|музыка|видео
		regexp: /^\/(фото|photo|музыка|music|видео|video) (.*)/i,
		f: function (params, msg) {
			var cmd = {
				"фото": ["photo", "photos"],
				"музыка": ["audio", "audio"],
				"видео": ["video", "video"],
				"photo": ["photo", "photos"],
				"music": ["audio", "audio"],
				"video": ["video", "video"],
			},
				rand;
			if (msg.body.match(/ rand /i)) {
				rand = getRandomInt(0, 300);
			} else {
				rand = 0;
			}
			params[1] = cmd[params[1].toLowerCase()];
			vk(params[1][1] + ".search", {
				sort: 0,
				auto_complete: 0,
				q: params[2].replace(/rand /ig, ""),
				offset: rand,
				count: 10,
				adult: 1
			}).then(function (res) {
				//console.log(res);
				if (params[1][0] == "audio" && black_urls(res.items.map(function (a) {
					return a.title + " " + a.artist;
				}).join("\n"))) {
					ban_user(msg.user_id, 1);
				} else if (res.items.length) {
					msg.send(
						"Результаты поиска по запросу: " + params[2].replace(/rand /ig, ""), {
							attachment: res.items.map(function (a) {
								return params[1][0] + a.owner_id + "_" + a.id;
							}).join(",")
						}
					);
				} else {
					msg.reply("По вашему запросу ничего не найдено");
				}
			});
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "/фото | /музыка | /видео",
		description: "Ищет фото, музыку или видео"
	},
	{ // ping - pong
		regexp: /^\/(ping|пинг)/i,
		f: function (params, msg) {
			msg.send("pong");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/ping",
		description: "ping - pong"
	},
	{ // get
		regexp: /^get /i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.body.match(/status_audio/ig)) {
				vk.users.get({
					user_id: msg.user_id,
					fields: 'status'
				}).then(function (a) {
					if (!black_urls(a.map(function (a) {
						return a.status_audio.title + " " + a.status_audio.artist;
					}).join("\n"))) {
						msg.send('', {
							attachment: 'audio' + a[0].status_audio.owner_id + "_" + a[0].status_audio.id
						});
					}
				});
			} else if (msg.fwd_messages) {
				var ids = msg.fwd_messages.map(function (a) {
					return a.user_id;
				}).join(",");
				vk.users.get({
					user_ids: ids,
					fields: msg.body.replace(/^get /i, "")
				}).then(function (res, params) {
					msg.send(res.map(function (a) {
						return "[" + a.first_name + " " + a.last_name + "] - " + a[msg.body.replace(/^get /i, "")];
					}).join("\n"));
				});
			} else {
				vk.users.get({
					user_ids: msg.user_id,
					fields: msg.body.replace(/^get /i, "")
				}).then(function (res, params) {
					msg.send(res[0][msg.body.replace(/^get /i, "")]);
				});
			}
		},
		admin: 1,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "get [params]",
		description: "Users get"
	},
	{ // Собери
		regexp: /^собери/i,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				if (black_urls(msg.body)) {
					msg.reply('Попытка блокировки Ждуна\n[' + time() + '][' + msg.title + ']', {
						user_id: admins[0]
					});
					ban_user(msg.user_id);
					vk.account.banUser({
						user_id: msg.user_id
					});
				} else {
					msg.send(msg.fwd_messages.map(function (a) {
						return a.body;
					}).join("\n\@\n"));
				}
			}
		},
		admin: 1,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "собери [fwd]",
		description: "Собирает слова из пересланных сообщений"
	},
	{ // Собери
		regexp: /^\/profile/i,
		need_ui: 1,
		f: function (params, msg) {
			let id = msg.user_id;
			let info = msg.user_info;
			if (profiles.hasOwnProperty(id)) {
				let profile = profiles[id];

				var priv, exp, lvl;
				try {
					priv = (Object.entries(usergroups).filter(x => x[1].some(y => y === msg.user_id))[0][0]);
				} catch (e) {
					priv = "нет";
				}
				if (profiles[msg.user_id].rang) {
					lvl = rangs_config[profiles[msg.user_id].rang.lvl] || "В разработке";
					exp = Math.floor(profiles[msg.user_id].rang.exp_has) + "/" + profiles[msg.user_id].rang.exp_next;
				} else {
					lvl = "нет";
					exp = "нет";
				}

				var marriage;
				if (profile.marriage && profile.marriage.spouse) {
					var string = profile.marriage.spouse.sex == 1 ? "Супруга: " : "Супруг: ";
					marriage = string + "[id" + profile.marriage.spouse.id + "|" + profile.marriage.spouse.name + "]\n";
				}

				msg.send(`Основное: 
👫 Имя: ${info.first_name} ${info.last_name}
🔧 Привелегия: ${priv}
🆔 Ваш айди: ${id}
Ваш клан: (Скоро будет)
Ваша должность в клане: (Скоро будет)
Кол-во пользователей ввели ваш промокод: (Скоро будет)
${marriage || ""}
💵 Счета:
💴 Баланс: ${profile.balance} 💊.
💵 Баланс банка: (Скоро будет) 💊.
💵 Баланс сейфа: (Скоро будет) 💊.

Инвентарь:(Временно в разработке)

Прочее:
💡 Ваше звание: ${lvl}
🔮 Опыта собрано: [${exp}]
🌐 Сумма ставок: ${profile.sum} 💊.`);
			} else {
				msg.send('У Вас нет профиля!!! Создайте его через /create!!');
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/profile",
		description: "blah-blah-blah"
	},
	{ // Погода
		regexp: /^погод(к)?а|(r2(,)? |Ждун( )? |аЖдун( )? )+(погод(к)?а)/i,
		f: function (params, msg) {
			if (msg.body.match(/погод(к)?а /i)) {
				weather(msg.body.replace(/погод(к)?а /i, ""), msg);
			} else if (msg.body.match(/погод(к)?а/i)) {
				vk.users.get({
					user_ids: msg.user_id,
					fields: "city"
				}).then(function (res, params) {
					weather(res[0].city.title, msg);
				});
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "Погода [город]?",
		description: "Погода"
	},
	{ // /tch
		regexp: /\/tch /i,
		f: function (params, msg) {
			twitcheck(msg.body.replace(/\/tch /i, ""), msg);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/tch [nick]",
		description: "Twitch Check"
	},
	{ // /wiki+
		regexp: /^\/wiki\+ /i,
		f: function (params, msg) {
			wikisearch(msg.body.replace(/^\/wiki\+ /i, ""), 1, msg);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/wiki+ [текст]",
		description: "wikipedia+"
	},
	{ // /история
		regexp: /^\/история/i,
		f: function (params, msg) {
			request.get('http://www.anekdot.ru/random/story/', function (error, response, body) {
				msg.send(parse(body, '<p class="title">', '</a></p>') + "\n\n" + parsetxt(body, '<div class="text">', '</div>').replace('<div class="text">', '').replace(/quot;/ig, '"'));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/история",
		description: "Случайная история"
	},
	{ // /факт
		regexp: /^\/факт/i,
		f: function (params, msg) {
			request.get('http://randstuff.ru/fact/', function (error, response, body) {
				msg.send(parse(body, '<tr><td>', '</td></tr>'));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/факт",
		description: "Случайный факт"
	},
	{ // /Мудрость
		regexp: /^\/мудрость/i,
		f: function (params, msg) {
			request.get('http://randstuff.ru/saying/', function (error, response, body) {
				msg.send(parse(body, '<tr><td>', '</td></tr>'));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/мудрость",
		description: "Мудрые мысли"
	},
	{ // /Шутка
		regexp: /^\/шутка/i,
		f: function (params, msg) {
			request.get('http://randstuff.ru/joke/', function (error, response, body) {
				msg.send(parse(body, '<tr><td>', '</td></tr>'));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/шутка",
		description: "Шутка"
	},
	{ // курс
		regexp: /^\/курс(\sвалют)?$/i,
		f: function (params, msg) {
			ExchangeRates(msg);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/курс",
		description: "Курс валют"
	},
	{ // qka
		regexp: /^qka|^йлф/i,
		f: function (params, msg) {
			msg.send("¯\\_(ツ)_/¯");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "qka|йлф",
		description: "¯\\\_(ツ)_/¯"
	},
	{ // инфа
		regexp: /^инфа/i,
		f: function (params, msg) {
			msg.reply("Вероятность - " + getRandomInt(0, 100) + "%");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "Инфа",
		description: "Вероятность события"
	},
	{ // /rand
		regexp: /^\/rand /i,
		f: function (params, msg) {
			msg.reply(msg.body.replace(/^\/rand /, "").replace(/ или /ig, ",").split(",").random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/rand [условие1,условие2...]",
		description: "Рандом"
	},
	{ // Ждун, ...
		regexp: /^Ждун(\s)?(.*)/i,
		need_ui: 1,
		f: function (params, msg) {
			var text = msg.body.replace(/^Ждун( )?/i, ""),
				attach_r = /(doc|photo|audio|video)[0-9]+_[0-9]+/g,
				answer, attachment;

			if (!iha[text]) {
				var ans = levArraySimilar(text, base.split("\n").map(function (a) {
					return a.split("\\")[0];
				}))[0].w;
				answer = iha[ans].random()
					.replace(/%username%/ig, msg.user_info.first_name)
					.replace(/%usersurname%/ig, msg.user_info.last_name);
				if (attach_r.test(answer)) attachment = answer.match(attach_r).join(",");
				msg.send(answer, {
					attachment
				});
			} else {
				answer = iha[text].random()
					.replace(/%username%/ig, msg.user_info.first_name)
					.replace(/%usersurname%/ig, msg.user_info.last_name);
				if (attach_r.test(answer)) attachment = answer.match(attach_r).join(",");
				msg.send(answer, {
					attachment
				});
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "Ждун [текст]",
		description: "Общение с Ждун"
	},
	{ // getid
		regexp: /^getid/i,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				msg.send(msg.fwd_messages[0].user_id);
			} else {
				msg.send(msg.user_id);
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "getid [fwd]",
		description: "get id"
	},
	{ // /clc
		regexp: /^\/clc/i,
		f: function (params, msg) {
			msg.send(" <br>".Repeat(100));
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 1,
		info: "/clc",
		description: "Clear Chat"
	},
	{ // ??
		regexp: /\?\?/i,
		f: function (params, msg) {
			msg.send(["Да", "Нет"].random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "??",
		description: "Да | Нет"
	},
	{ // /монетка
		regexp: /^\/монетка|(Ждун( )?\s)?((брось|подбрось|кинь)\sмонетку)/i,
		f: function (params, msg) {
			msg.send(["Орёл", "Решка"].random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/монетка",
		description: "Орёл | Решка"
	},
	{ // /надо
		regexp: /^\/надо/i,
		f: function (params, msg) {
			msg.send(["Надо", "Не надо"].random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/надо [текст]?",
		description: "Надо | Не надо"
	},
	{ // calculator
		regexp: /^([0-9\(\)\.\^\+\/\*\-]+)=$/i,
		f: function (params, msg) {
			msg.send(eval(params[1].replace(/([0-9]+)\^([0-9]+)/g, "Math.pow($1,$2)")));
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "[Выражение]=",
		description: "Калькулятор"
	},
	{ // кто|кого|кому
		regexp: /^\/(кто|кого|кому)/i,
		f: function (params, msg) {
			vk.messages.getChat({
				chat_id: msg.chat_id
			}).then((a) => {
				vk.users.get({
					user_ids: a.users.del(472930940).random()
				}).then((a) => {
					var phrases = ["Бля буду это - ", "Инфа сотка, это ", "Я думаю, это ", "Рот ставлю это ", "Я хуй знает, но наверное это "];
					msg.reply(phrases.random() + a[0].first_name + " " + a[0].last_name + "\nvk.com/id" + a[0].id);
				});
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/кто | /кого | /кому",
		description: "Рандом"
	},
	{ // /когда
		regexp: /^\/когда/i,
		f: function (params, msg) {
			msg.reply("Я думаю, через " + getRandomInt(0, 100) + " " + ["секунд", "минут", "часов", "дней", "месяцев", "лет"].random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/когда [текст]?",
		description: "Рандом"
	},
	{ // /help
		regexp: /^\/help/i,
		f: function (params, msg) {
			//msg.send(cmds.filter(function(a){if(!a.admin){return true}}).map(function(a){return a.admin + a.info + " - " + a.description }).splice(9).join("\n").replace(/undefined/gi, "").replace(/\nNaN \- /ig, ""))
			msg.send("Все команды доступны тут: https://vk.com/page-155058357_53388901");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/help",
		description: "Команды"
	},
	{ // /ahelp
		regexp: /^\/ahelp/i,
		f: function (params, msg) {
			msg.send(cmds.filter(function (a) {
				if (a.admin) return true;
			}).map(function (a) {
				return a.admin.toString().replace(/1/g, "[a]") + a.info + " - " + a.description;
			}).splice(9).join("\n").replace(/undefined/gi, "").replace(/\nNaN \- /ig, ""));
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "/ahelp",
		description: "Админ команды"
	},
	{ // /my_help
		regexp: /^\/myhelp(?:\s([0-9]+))?/i,
		f: function (params, msg) {
			if (params[1]) {
				var level = getAccessLevel(msg.user_id);
				var int = parseInt(params[1]);
				var levels = ["VIP", "Premium", "Администратор", "Developer Lite", "Devil", "Developer"];
				if (int <= level) {
					msg.send("Уровень команд : " + levels[int - 1] + "\n\nКоманды-эксклюзивы : " + cmds.filter(x => (x.level == int)).map(x => "\n> " + x.info + " - " + x.description));
				}
			} else {
				switch (true) {
					case usergroups.admins.inArray(msg.user_id):
						msg.send("Ваш уровень : Developer\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.admin).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case msg.chat_id && msg.admin_id == msg.user_id:
						msg.send("Ваш уровень : Создатель беседы\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.chat_admin).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case usergroups.devil.inArray(msg.user_id):
						msg.send("Вы единственный в этой привелегии потому что она ваша : Devil\n\nВам доступны все команды прошлых привелегий а так же у вас будет пара ваших : " + cmds.filter(x => x.level == 5).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case usergroups.devlite.inArray(msg.user_id):
						msg.send("Ваш уровень : Developer Lite\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.level == 4).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case usergroups.moderators.inArray(msg.user_id):
						msg.send("Ваш уровень : Администратор\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.level == 3).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case usergroups.premium.inArray(msg.user_id):
						msg.send("Ваш уровень : Premium-пользователь\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.level == 2).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					case usergroups.vip.inArray(msg.user_id):
						msg.send("Ваш уровень : VIP-пользователь\n\nКоманды-эксклюзивы : " + cmds.filter(x => x.level == 1).map(x => "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе");
						break;
					default:
						msg.send("Вы не зачислены ни к одной из привилегированных групп, итого доступные вам команды есть в обычном /help");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/myhelp",
		description: "Список доступных команд по уровню"
	},
	{
		regexp: /^\/mtts(?:\s([^]+))?/,
		f: function (params, msg) {
			new Promise((resolve, reject) => {
				if (msg.fwd) {
					msg.get().then(m => {
						resolve(m.fwd_messages.map(a => a.body).join(","));
					});
				} else {
					resolve(params[1]);
				}
			}).then((text) => {
				https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&format=mp3&speaker=ermil&emotion=good&text=" + encodeURIComponent(text), function (stream) {
					stream.filename = "audio_message.ogg";
					msg.sendAudioMessage(stream);
				});
			});
		},
		per_day: [-1, -1, 10, 100, -1, -1],
		level: 2,
		info: "/mtts текст",
		description: "Голосовое сообщение мужским голосом"
	},
	{    // /sperm
		regexp: /^\/sperm(\s(http(s)?:\/\/.*))?/i,
		f: function (params, msg) {
			if (msg.data[7].fwd || msg.data[7].attach1 || params[2]) {
				msg.get().then((a) => {
					if (a.fwd_messages && a.fwd_messages[0].attachments[0].photo) a.attachments = a.fwd_messages[0].attachments;
					downToBuf("http://www.lunach.ru/?cum=&url=" + (a.attachments ? VK.getAttachmentUrl(a.attachments[0]) : params[2]) + "&tpl=vk").then((buf) => {
						msg.sendPhoto({
							buffer: buf
						});
					});
				});
			} else {
				msg.send("Фотка где");
			}
		},
		level: 2,
		info: "/sperm [прикрепленное фото | ссылка на фото]",
		description: "Спасибо, я кончил"
	},
	{
		regexp: /^\/wtts(?:\s[^]+)?/,
		f: function (params, msg) {
			new Promise((resolve, reject) => {
				if (msg.fwd) {
					msg.get().then(m => {
						resolve(m.fwd_messages.map(a => a.body).join(","));
					});
				} else {
					resolve(params[1]);
				}
			}).then((text) => {
				https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key +
					"&format=mp3&speaker=alyss&emotion=evel&text=" + encodeURIComponent(text),
					function (stream) {
						stream.filename = "audio_message.ogg";
						msg.sendAudioMessage(stream);
					});
			});
		},
		per_day: [-1, -1, 10, 100, -1, -1],
		level: 2,
		info: "/wtts текст",
		description: "Голосовое сообщение женским голосом"
	},
	{ // Позор
		regexp: /^\/позор/i,
		f: function (params, msg) {
			vk.wall.get({
				owner_id: -71729358,
				offset: getRandomInt(0, 3893),
				count: 1
			}).then(function (a) {
				msg.send('', {
					attachment: a.items.map(function (a) {
						return 'wall' + a.owner_id + '_' + a.id;
					}).join(",")
				});
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/позор",
		description: "Позор random history"
	},
	{
		regexp: /^\/(stats|стата|ст|st)/i,
		f: function (params, msg) {
			var sex = os.freemem() / 1024 / 1024;
			var totalmem = os.totalmem() / 1024 / 1024;
			var cpu = os.cpus();
			//msg.reply("⏳UpTime: "+ days + " Days | " + hours + " Hours | "+ minute + " Minute | " + seconds + " Seconds\n" + "💻Node: " +process.version + "\n📮Сообщений принято: "+stats+"\n♻Запросов к API: "+api+"\n💽Свободно ОЗУ: "+sex.toFixed(2) + " / 8.56 GB" + '\n\n⚠Друзья\n&#4448;🔵Принято: ' + friends_add + "\n&#4448;🔴Удалено: " + friends_del);
			msg.send("🖥Информация о системе:\n&#4448;💻ОС: " + os.type() + "\n&#4448;💻Arch: " + os.arch() + "\n&#4448;💻Platform: " + os.platform() + "\n&#4448;💻Release: " + os.release() + "\n\n⚙Информация о железе: " + "\n&#4448;🔧RAM: " + Math.round(sex) + " / " + Math.round(totalmem) + " mb" + "\n&#4448;🔧CPU: " + cpu[0].model + "\n\n🛠Информация о процессе:" + "\n&#4448;💿PID: " + process.pid + "\n&#4448;💿Title: " + process.title + "\n&#4448;💿Node: " + process.version + "\n👦Информация о аккаунте:" + "\n&#4448;👤ID: " + userid + "\n&#4448;👤MSG: " + commands_read + " | " + messages_read)
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		chat_admin: 1,
		info: "/stat",
		description: "Statistics"
	},
	{ // uptime
		regexp: /^uptime/i,
		f: function (params, msg) {
			var time = process.uptime();
			var uptime = (time + "").toHHMMSS();
			msg.send(uptime);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 4,
		info: "Uptime",
		description: "Время работы бота"
	},
	{ // ban
		regexp: /^ban|^user ban /i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.body.match(/^user ban /i)) {
				var banned_user = parseInt(msg.body.replace(/^user ban /i, ""));
				if (msg.body.match(/ban\+/i)) {
					user_ban(banned_user, 1);
				} else {
					user_ban(banned_user);
				}
				msg.send("ID Пользователя: " + banned_user + " Пользователь заблокирован. Если вы считаете что получили бан по ошибке. Оставьте заявку на разбан https://vk.com/topic-155058357_38286970");
				update_vars();
			} else if (msg.fwd_messages) {
				if (msg.body.match(/ban\+/i)) {
					ban_user(msg.fwd_messages[0].user_id, 1);
				} else {
					ban_user(msg.fwd_messages[0].user_id, 1);
				}
				msg.send("ID Пользователя: " + msg.fwd_messages[0].user_id + " Пользователь заблокирован. Если вы считаете что получили бан по ошибке. Оставьте заявку на разбан https://vk.com/topic-155058357_38286970");
			} else {
				ban_chat(msg.chat_id);
				msg.send("ID Чата: " + msg.chat_id + " Чат заблокирован. Если вы считаете что чат забанен по ошибке. Оставьте заявку на разбан https://vk.com/topic-155058357_38286970 ");
			}
		},
		per_day: [1, 1, 1, 1, 1, 50],
		level: 3,
		info: "Ban [fwd]",
		description: "Ban user/chat"
	},
	{ // unban
		regexp: /^unban|^user unban /i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.body.match(/^user unban /i)) {
				var unbanned_user = parseInt(msg.body.replace(/^user unban /i, ""));
				if (msg.body.match(/unban\+/i)) {
					unban_user(unbanned_user, 1);
				} else {
					unban_user(unbanned_user);
				}
				msg.send("ID Пользователя: " + unbanned_user + " Пользователь успешно разблокирован.");
			} else if (msg.fwd_messages) {
				if (msg.body.match(/unban\+/i)) {
					unban_user(msg.fwd_messages[0].user_id, 1);
				} else {
					unban_user(msg.fwd_messages[0].user_id);
				}
				msg.send("ID Пользователя: " + msg.fwd_messages[0].user_id + " Пользователь успешно разблокирован");
			} else {
				unban_chat(msg.chat_id);
				msg.send("ID Чата: " + msg.chat_id + " Чат успешно разблокирован");
			}
		},
		per_day: [-1, -1, -1, 5, -1, 10],
		info: "Unban [fwd]",
		level: 3,
		description: "Unban user/chat"
	},
	{ // allow
		regexp: /^allow/i,
		f: function (params, msg) {
			vars.allowed.chats.push(msg.chat_id);
			msg.send("Chat ID: " + msg.chat_id + " allowed");
			update_vars();
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "Allow",
		description: "Безопасность бота выкл"
	},
	{ // unallow
		regexp: /^unallow/i,
		f: function (params, msg) {
			vars.allowed.chats.splice(vars.allowed.chats.indexOf(msg.chat_id));
			msg.send("Chat ID: " + msg.chat_id + " unallowed");
			update_vars();
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "Unallow",
		description: "Безопасность бота вкл"
	},
	{ // allmute
		regexp: /^allmute/i,
		f: function (params, msg) {
			allmute = 1;
			msg.send('Все чаты забанены');
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "Allmute",
		description: "Замутить все чаты"
	},
	{ // unmuteall
		regexp: /^unmuteall/i,
		f: function (params, msg) {
			allmute = 0;
			msg.send('Все чаты разбанены');
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "Unmuteall",
		description: "Размутить все чаты"
	},
	{ // add
		regexp: /^add/i,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				vk.friends.add({
					user_id: msg.fwd_messages[0].user_id
				});
				msg.send('Ok');
			}
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "add [fwd]",
		description: "Добавить пользователя в друзья"
	},
	{ // delete
		regexp: /^delete/i,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				vk.friends.delete({
					user_id: msg.fwd_messages[0].user_id
				});
				msg.send('Ok');
			}
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "delete [fwd]",
		description: "Удалить пользователя из друзей"
	},
	{ // /send
		regexp: /^\/send /i,
		f: function (params, msg) {
			global.uid = sscanf(msg.body, '/send %s')[0];
			msg.send(msg.body.replace("/send " + uid, ""), {
				user_id: uid
			});
			msg.send('Сообщение отправлено');
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 2,
		info: "/send [id] [msg]",
		description: "Отправить анонимное сообщение через бота"
	},
	{ // isban
		regexp: /^is(\s)?ban/i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				if (vars.banned.users.inArray(msg.fwd_messages[0].user_id)) {
					msg.send("True");
				} else {
					msg.send("False");
				}
			} else if (msg.chat_id) {
				if (vars.banned.chats.inArray(msg.chat_id)) {
					msg.send("True");
				} else {
					msg.send("False");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 3,
		chat_admin: 1,
		info: "is ban [fwd]?",
		description: "Проверка бана"
	},
	{ // Signa
		regexp: /^\/(?:signa|сигна|сігна)\s?([0-9])?(?:\s)?(.*)/i,
		need_ui: 1,
		needfullmsg: 1,
		f: function (params, msg) {
			msg.reply("Ща сек...");
			var signd = function () {
				if (params[2]) {
					t = params[2].split(":");
				} else {
					t = (msg.user_info.first_name + " " + msg.user_info.last_name).split(" ");
				}
				console.log(t);
				request.post({
					url: "http://shkuragaming.ru/signa",
					form: {
						text1: t[0],
						text2: t[1]
					}
				}, function (e, r, b) {
					try {
						dl("http://shkuragaming.ru/signas/signs/" + b.match(/signs\/(.+?)\.jpg"/)[1] + ".jpg", "./signa.jpg", x => msg.sendPhoto(fs.createReadStream("./signa.jpg"), "Ваша сигна готова!"));
					} catch (ce) {
						msg.send("Произошла ошибка сервиса. Попытайтесь еще раз");
					}
				});
			};
			var sign = function (parameters, name, picture, coords) {
				fs.readFile("./bot/empty_signas/" + picture, function (err, pic) {
					var canvas = new Canvas(parameters[0], parameters[1]);
					var img = new Canvas.Image();
					img.src = pic;
					canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
					var ctx = canvas.getContext('2d'); // наложение текста
					ctx.font = parameters[2] + 'px SignPainter';
					ctx.fillStyle = "#" + parameters[4];
					ctx.rotate(coords[2]);
					ctx.fillText(name[0].ucfirst() + "\n" + name[1].ucfirst().replace(/^(у|к)/i, " $1"), coords[0], coords[1]);
					msg.sendPhoto({
						buffer: canvas.toBuffer()
					});
				});
			};
			new Promise(function (resolve, reject) {
				var array = [];
				if (params[2]) {
					var s = params[2].split(":");
					array[0] = s[0];
					array[1] = s[1] ? s[1] : "";
					resolve(array);
				} else {
					array[0] = msg.user_info.first_name;
					array[1] = msg.user_info.last_name;
					resolve(array);
				}
			}).then(function (array) {
				console.log(array);
				switch (params[1]) {
					case "1":
						sign([604, 403, 72, "434055"], array, "karina.png", [184, 373, -0.3]);
						break;
					case "2":
						sign([600, 600, 122, "323232"], array, "eeonegay.jpg", [197, 370, 0.07]);
						break;
					case "3":
						sign([604, 453, 90, "534452"], array, "mro.jpg", [320, 120, 0.33]);
						break;
					case "4":
						sign([1137, 831, 130, "4f5051"], array, "larin.jpg", [520, 320, 0.23]);
						break;
					case "5":
						sign([524, 402, 70, "4f5051"], array, "mamix.png", [210, 200, 0.12]);
						break;
					case "6":
						sign([453, 604, 40, "4f5051"], array, "mops.png", [315, 200, 0.35]);
						break;
					case "7":
						sign([354, 354, 65, "4f5051"], array, "spilberg.png", [90, 230, -0.03]);
						break;
					default:
						signd();
				}
			});
		},
		per_day: [-1, -1, 10, 15, -1, -1],
		level: 2,
		info: "/сигна | /сигна верхний текст:нижний текст",
		description: "Сигна"
	},
	{
		regexp: /^\/balance/i,
		f: function (text, msg) {
			let id = msg.user_id;
			if (!profiles.hasOwnProperty(msg.user_id)) {
				profiles[id] = {
					"balance": 10000,
					"name": "",
					"winrate": 0,
					"usergroups": "user",
					"sum": 0
				};
				msg.send("Мы тут заметили, что у вас нет аккаунта, поэтому мы его вам сделали.\nАккаунт " + id + " успешно создан\nВаш баланс: " + profiles[id].balance + " 💊");
			} else {
				if (profiles[id].balance < 10) {
					msg.reply("У кого-то проблемы с балансом.." + "\nВаш баланс: " + profiles[id].balance + " 💊\nАккаунт ID: " + id, {
						attachment: "photo180943442_456243681"
					});
				} else {
					msg.reply("Ваш баланс: " + profiles[id].balance + " 💊\nАккаунт ID: " + id + "\n\nПокупка 💊 --> https://vk.com/pahom_bots?w=product-155058357_1170203%2Fquery");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/balance",
		description: "проверить баланс"
	},
	{
		regexp: /^\/shop/i,
		f: function (text, msg) {
			msg.send("Покупка 💊 --> https://vk.com/pahom_bots?w=product-155058357_1170203%2Fquery\n\n Магазин : " + items.map(x => "\n📦 " + x.name + "\n&#4448;&#4448;Цена: " + x.price + " 💊    \n&#4448;&#4448;ID: " + x.id).join(""));
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/shop",
		description: "Магазин"
	},
	{
		regexp: /^\/buy ([^]+)/i,
		f: function (params, msg) {
			var i = params[1] - 1;
			let id = msg.user_id;
			if (profiles.hasOwnProperty(id)) {
				if (profiles[id].balance > items[i].price) {
					profiles[id].balance -= items[i].price;
					msg.send("Предмет " + items[i].name + " был успешно куплен\n С вашего баланса снято: " + items[i].price + " 💊,\nВаш баланс: " + profiles[id].balance + " 💊", {
						attachment: items[i].photo
					});
					usergroups[items[i].admin].push(id);
				} else {
					msg.reply("Ебланище, у тебя " + profiles[id].balance + " 💊, а " + items[i].name + " стоит " + items[i].price + " 💊");
				}
			} else {
				msg.reply("В начале пройди регистрацию через /create");
			}
			update_usergroups();
			update_profiles();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/buy",
		description: "[айди] -- покупка предметов из магазина"
	},
	{
		regexp: /^\/create$/i,
		f: function (text, msg) {
			let id = msg.user_id;
			if (!profiles.hasOwnProperty(id)) {
				profiles[id] = {
					"balance": 10000,
					"name": "",
					"winrate": 0,
					"usergroups": "user",
					"sum": 0,
					"rang": {
						"lvl": 1,
						"exp_has": 0,
						"exp_next": 8
					}
				};
				msg.send("Аккаунт " + id + " создан\nТвой баланс: " + profiles[id].balance + " 💊");
			} else {
				msg.send("У вас уже создан аккаунт. " + "\nБаланс: " + profiles[id].balance + " 💊" + "\nИспользуйте:\n /spot [ставка]\n/double [цвет: r, g, b,] [ставка]");
			}
			update_profiles();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/create",
		description: "создает аккаунт в рулетке"
	},
	{
		regexp: /^\/win ([0-9]+) (.*)/i, //
		f: function (text, msg) {
			if (!profiles.hasOwnProperty(+text[1])) return msg.send('У этого юзера нет аккаунта!');
			profiles[+text[1]].coef = +text[2];
			update_profiles();
			msg.send('Коеффициент ВЫИГРАША для пользователя ' + text[1] + ' установлен: ' + (profiles[+text[1]].coef * 100) + '%');
		},
		admin: 1,
		//info:"/win [id] [coef]",
		//description:"Устанавливает коеффициент выиграша юзеру"
	},
	{
		regexp: /^\/promo$/i,
		f(params, msg) {
			if (!profiles.hasOwnProperty(msg.user_id)) return msg.send('Сначала создайте аккаунт, через /create!');
			promos[msg.user_id] = Math.random().toString(36).slice(2, 2 + 6).toUpperCase();
			update_promos();
			return msg.send('Ваш промо код: ' + promos[msg.user_id]);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/promo",
		description: "Создать промокод"
	},
	{
		regexp: /^\/freecoin ([0-9a-z]{6})$/i,
		f(params, msg) {
			if (!profiles.hasOwnProperty(msg.user_id)) return msg.send('Сначала создай аккаунт, через /create!');

			let id = Object.keys(promos).find(x => promos[x] === params[1].toUpperCase());
			if (promo_used.indexOf(msg.user_id) !== -1) {
				return msg.send('Вы уже получали коины!');
			} else if (id) {

				profiles[id].balance += 500;
				profiles[msg.user_id].balance += 2500;
				promo_used.push(msg.user_id);
				return msg.send('Вы получили 2500 монет!');
			} else {
				return msg.send('Этот код недействителен!');
			}
			update_promoused();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/freecoin",
		description: "активирует промокод"
	},
	{
		regexp: /^\/flip(?:\s([0-9]+))?/i,
		f: function (params, msg) {
			if (!data.lobbies) data.lobbies = {};
			if (!data.lobbies.flip) data.lobbies.flip = {};
			var bet = parseInt(params[1]) || 500;
			if (!profiles[msg.user_id]) {
				msg.send("У тебя нет аккаунта, создай его через /create");
			} else if (profiles[msg.user_id].balance <= 0) {
				msg.send("У тебя на счету нет 💊.");
			} else if (bet > profiles[msg.user_id].balance) {
				msg.send("У тебя нет столько 💊");
			} else {
				var game_id = getRandomInt(1, 1000);
				if (!data.lobbies.flip[msg.chat_id]) {
					data.lobbies.flip[msg.chat_id] = {
						host: msg.user_id,
						bet: bet,
						game_id: game_id
					};
					msg.send("Игра создана, другой игрок может подключиться с помощью /flipconnect\nИгра доступна в течение 2-х минут");
					setTimeout(() => {
						var lobby = data.lobbies.flip[msg.chat_id];
						if (lobby && lobby.game_id == game_id) {
							delete data.lobbies.flip[msg.chat_id];
						}
					}, 120000);
				} else {
					msg.send("Пользователь " + data.lobbies.flip[msg.chat_id].host + " уже ожидает игру на " + data.lobbies.flip[msg.chat_id].bet + " 💊");
				}
			}
		},
		info: "/flip [ставка]",
		description: "игра на пилюли, Орел/решка"
	},
	{
		regexp: /^\/flipconnect/i,
		f: function (params, msg) {
			if (data.lobbies.flip[msg.chat_id]) {
				var host_id = data.lobbies.flip[msg.chat_id].host;
				var bet = data.lobbies.flip[msg.chat_id].bet;
				if (!profiles[msg.user_id]) {
					msg.send("У тебя нет аккаунта, создай его через /create");
				} else if (profiles[msg.user_id].balance <= 0) {
					msg.send("У тебя на счету нет 💊.");
				} else if (bet > profiles[msg.user_id].balance) {
					msg.send("У тебя нет столько 💊");
				} else if (msg.user_id == data.lobbies.flip[msg.chat_id].host) {
					msg.send("Нельзя играть самому с собой.");
				} else if (bet > profiles[host_id]) {
					msg.send("У начавшего игру недостаточно средств, игра отменяется");
					delete data.lobbies.flip[msg.chat_id];
				} else {
					var gamers = [];
					gamers.push(data.lobbies.flip[msg.chat_id].host);
					gamers.push(msg.user_id);
					var winner = gamers.random();
					var loser = gamers.del(winner);
					vk.users.get({
						user_id: winner
					}).then((u) => {
						var win_count = Math.floor((bet * 2 / 100 * 75));
						profiles[winner].balance += win_count;
						profiles[loser].balance -= bet;
						var name = u[0].first_name + " " + u[0].last_name;
						delete data.lobbies.flip[msg.chat_id];
						rangUp(winner, bet / data.rang_coef);
						rangUp(loser, bet / data.rang_coef);
						msg.send(name + " выигрывает и получает " + win_count + " 💊!");
						update_profiles();
					});
				}
			} else {
				msg.send("Игра еще не создана. Чтобы создать, введите /flip сумма_ставки");
			}
		},
		info: "/flipconnect",
		description: "игра на пилюли, Орел/решка"
	},
	{
		regexp: /^\/topcoins/i,
		f: function (params, msg) {
			var top = Object.entries(profiles).sort((a, b) => b[1].balance - a[1].balance).get(20);
			var ids = top.map((e) => e[0]);
			vk.users.get({
				user_ids: ids.join(",")
			}).then((u) => {
				var balances = top.map((a) => a[1].balance);
				var top_list = balances.map((e, i) => u[i].first_name + " " + u[i].last_name + " - " + spaces(balances[i]) + " 💊");
				msg.send(top_list.numeric("\n"));
			});
		},
		info: "/topcoins",
		description: "topcoins"
	},
	{
		regexp: /^\/toprank/i,
		f: function (params, msg) {
			var top = Object.entries(profiles).filter((a) => a[1].rang).sort((a, b) => b[1].rang.lvl - a[1].rang.lvl).get(10).sort((a, b) => (b[1].rang.exp_has) - (a[1].rang.exp_has)).sort((a, b) => b[1].rang.lvl - a[1].rang.lvl);
			var ids = top.map((e) => e[0]);
			vk.users.get({
				user_ids: ids.join(",")
			}).then((u) => {
				var levels = top.map((a) => [a[1].rang.lvl, a[1].rang.exp_has, a[1].rang.exp_next]);
				var top_list = levels.map((e, i) => u[i].first_name + " " + u[i].last_name + " - " + levels[i][0] + " LVL | " + Math.floor(levels[i][1]) + "/" + levels[i][2] + " EXP");
				msg.send(top_list.numeric("\n"));
			});
		},
		info: "/topcoins",
		description: "topcoins"
	},
	{
		regexp: /^\/spot ([0-9]+)/i,
		f: function (text, msg) {
			if (!profiles.hasOwnProperty(msg.user_id)) return msg.send('У тебя аккаунта нет, долбень!!');
			text = +text[1];
			// Рандомизая слотов
			var spot1 = getRandomInt(1, 3); // 1 3 3
			var spot2 = getRandomInt(1, 3); // 1 2 3
			var spot3 = getRandomInt(1, 3); // 1 1 1
			var to_balance = 0;
			var to_safe = 0;
			var summ = 0;
			var check = spot1 + spot2 + spot3;
			var smiles = ['🍋', '🎁', '🍊'].random();
			var point = profiles[msg.user_id].balance;
			// Проверка на юзера
			if (text < 300) return msg.send('Минимальная ставка 300 💊');
			if (profiles[msg.user_id].balance <= 0) {
				msg.send("У вас 0 на балансе");
			} else if (text > profiles[msg.user_id].balance) {
				msg.send("Ваша ставка больше чем баланс");
			}
			if (text > profiles[msg.user_id].balance || text == 0 || text <= 0) return;
			if (profiles[msg.user_id].balance > 0) {
				profiles[msg.user_id].sum += text;
				if (profiles[msg.user_id].coef != 0 && (check % 3 == 0 || profiles[msg.user_id].coef >= 0.7 && check % 2 == 0 || profiles[msg.user_id].coef == 1)) {
					if (text == profiles[msg.user_id].balance) {
						summ = text * 2;
						if (profiles[msg.user_id].safe) {
							to_balance = summ / 100 * 90;
							to_safe = summ / 100 * 10;
							if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
						} else {
							to_balance = summ;
						}
						profiles[msg.user_id].balance += to_balance;
						rangUp(msg.user_id, summ / data.rang_coef);
						msg.send("[ " + smiles + " | " + smiles + " | " + smiles + " ]" + "\n Вы выиграли: " + to_balance + " 💊!\n Ваш баланс: " + profiles[msg.user_id].balance + " 💊", {
							attachment: "audio180943442_456239736"
						});
					} else {
						summ = text * 2;
						if (profiles[msg.user_id].safe) {
							to_balance = summ / 100 * 90;
							to_safe = summ / 100 * 10;
							if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
						} else {
							to_balance = summ;
						}
						profiles[msg.user_id].balance += to_balance;
						rangUp(msg.user_id, summ / data.rang_coef);
						msg.send("[ " + smiles + " | " + smiles + " | " + smiles + " ]" + "\n Вы выиграли: " + to_balance + " 💊!\n Ваш баланс: " + profiles[msg.user_id].balance + " 💊");
					}
				} else {
					if (text == profiles[msg.user_id].balance) {
						summ = text;
						if (profiles[msg.user_id].safe) {
							to_balance = summ / 100 * 90;
							to_safe = summ / 100 * 10;
							if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
						} else {
							to_balance = summ;
						}
						profiles[msg.user_id].balance -= to_balance;
						rangUp(msg.user_id, summ / data.rang_coef);
						msg.send("[ " + spot1 + " | " + spot2 + " | " + spot3 + " ]" + "\n Вы проиграли: " + text + " 💊!\n Ваш баланс: " + profiles[msg.user_id].balance + " 💊", {
							attachment: "audio180943442_456239737"
						});
					} else if (profiles[msg.user_id].balance == 1) {
						msg.send("[ " + spot1 + " | " + spot2 + " | " + spot3 + " ]" + "У кого-то проблемы с балансом..\n Вы проиграли: " + text + " 💊!\n Ваш баланс: " + profiles[msg.user_id].balance + " 💊", {
							attachment: "photo180943442_456243681"
						});
					} else {
						summ = text;
						if (profiles[msg.user_id].safe) {
							to_balance = summ / 100 * 90;
							to_safe = summ / 100 * 10;
							if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
						} else {
							to_balance = summ;
						}
						profiles[msg.user_id].balance -= to_balance;
						rangUp(msg.user_id, summ / data.rang_coef);
						msg.send("[ " + spot1 + " | " + spot2 + " | " + spot3 + " ]" + "\n Вы проиграли: " + to_balance + " 💊!\n Ваш баланс: " + profiles[msg.user_id].balance + " 💊");
					}
				}
			}
			update_profiles();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/spot [ставка]",
		description: "[ставка] -- игровой автомат"
	},
	{
		regexp: /^\/double ([rgb]) ([0-9]+)/i,
		f: function (text, msg) {
			if (!profiles.hasOwnProperty(msg.user_id)) return msg.send('У тебя аккаунта нет, долбень!!');
			var areYouLucky = Math.random() < 0.5;
			var clr = text[1];
			text = +text[2];
			var col = getRandomInt(0, 14);
			var g = 0;
			var r = 7;
			var b = 14;
			var summ, to_balance, to_safe;
			if (profiles[msg.user_id].balance <= 0) {
				msg.send("пошел нахуй, у тебя 0 на балансе");
			} else if (text > profiles[msg.user_id].balance) {
				msg.send('Ставка больше, чем у вас на счету!');
			} else if (profiles.hasOwnProperty(msg.user_id)) {
				profiles[msg.user_id].sum += text;
				if (areYouLucky && clr == 'g' && col == g) {
					summ = text * 14;
					if (profiles[msg.user_id].safe) {
						to_balance = summ / 100 * 90;
						to_safe = summ / 100 * 10;
						if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
					} else {
						to_balance = summ;
					}
					profiles[msg.user_id].balance += to_balance;
					rangUp(msg.user_id, summ / data.rang_coef);
					msg.send("GREEN!!! x14" + "\n Вы выиграли: " + to_balance + " 💊! Ваш баланс: " + profiles[msg.user_id].balance, {
						attachment: "audio180943442_456239736"
					});
				} else if (areYouLucky && clr == 'r' && col > g && col <= r) {
					summ = text * 2;
					if (profiles[msg.user_id].safe) {
						to_balance = summ / 100 * 90;
						to_safe = summ / 100 * 10;
						if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
					} else {
						to_balance = summ;
					}
					profiles[msg.user_id].balance += to_balance;
					rangUp(msg.user_id, summ / data.rang_coef);
					msg.send("RED! x2" + "\n Вы выиграли: " + to_balance + " 💊! Ваш баланс: " + profiles[msg.user_id].balance + " 💊");
				} else if (areYouLucky && clr == 'b' && col > r) {
					summ = text * 2;
					if (profiles[msg.user_id].safe) {
						to_balance = summ / 100 * 90;
						to_safe = summ / 100 * 10;
						if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
					} else {
						to_balance = summ;
					}
					profiles[msg.user_id].balance += to_balance;
					rangUp(msg.user_id, summ / data.rang_coef);
					if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
					msg.send("BLACK! x2" + "\n Вы выиграли: " + to_balance + " 💊! Ваш баланс: " + profiles[msg.user_id].balance);
				} else {
					summ = text;
					if (profiles[msg.user_id].safe) {
						to_balance = summ / 100 * 90;
						to_safe = summ / 100 * 10;
						if (profiles[msg.user_id].safe) profiles[msg.user_id].safe.money += to_safe;
					} else {
						to_balance = summ;
					}
					profiles[msg.user_id].balance -= to_balance;
					rangUp(msg.user_id, summ / data.rang_coef);
					msg.send("Другой цвет =(" + "\n Вы проиграли: " + to_balance + " 💊! Ваш баланс: " + profiles[msg.user_id].balance);
					return;
				}
			} else msg.reply("В начале пройди регистрацию через /create");
			update_profiles();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/double [цвет: r(x2) g(x14) b(x2)] [ставка]",
		description: "рулетка с цветами"
	},
	{
		regexp: /^\/atrade ([0-9]+) ([0-9]+)/i,
		f: function (text, msg) { // вот это вызывается вот ща покажу где
			from = +msg.user_id;
			to = +text[1];
			if (!profiles.hasOwnProperty(from) || !profiles.hasOwnProperty(to)) return msg.send('У тебя (или получателя) аккаунта нет, долбень!!');
			money = +text[2];
			if (profiles.hasOwnProperty(msg.user_id)) {
				if (profiles[from].balance <= 0) {
					msg.send("У вас 0 на балансе");
				} else if (money > profiles[from].balance) {
					msg.send("У вас не хватает для трейда");
				}
				if (money > profiles[from].balance || money == 0)
					return;
				profiles[from].balance -= money;
				profiles[to].balance += money * 0.9;
				msg.send("Обмен на сумму: " + money + " был успешно совершен (учитывая комиссию)\nНа вашем балансе осталось: " + profiles[from].balance + " 💊");
			} else {
				msg.reply("В начале пройди регистрацию через /create");
			}
			update_profiles();
		},
		admin: 1,
		per_day: [-1, -1, -1, -1, -1, -1],
		info: "/atrade",
		description: "[id] [кол-во пилюль] передача пилюль другому пользователю"
	},
	{
		regexp: /^\/addcoin\s([0-9]+)\s([0-9]+)/i,
		f: function (params, msg) {
			to = +params[1];
			money = +params[2];
			profiles[to].balance += money;
			msg.send("Пользователю " + to + " выдано " + money + " 💊");
			update_profiles();
		},
		admin: 1,
		per_day: [-1, -1, -1, -1, -1, -1],
		info: "/addcoin",
		description: "[id] [кол-во пилюль] выдача пилюль пользователю"
	},
	{
		regexp: /^\/write\s(.*)/i,
		f: function (params, msg) {
			vk.wall.post({
				message: params[1],
				error: 1
			}).then(function (a) {
				msg.send("Запись успешно создана!");
			}).catch(function (e) {
				msg.send("При создании записи произошла ошибка!\n" + JSON.stringify(a.error));
			});
		},
		admin: 1,
		per_day: [-1, -1, -1, -1, -1, -1],
		info: "/write [text]",
		description: "делает запись на стене бота"
	},
	{ // achiva
		regexp: /^\/achi\s(.*)/i,
		f: function (params, msg) {
			msg.reply("Ща сек...");
			vk.request('https://andriy2.tk/api/minecraft?' + querystring.stringify({
				head: 'Достижение получено!',
				text: params[1],
				icon: '3'
			})).then(vk.tryJSON).then(function (data) {
				return vk.request(data.picture);
			}).then(function (buffer) {
				return msg.sendPhoto({ buffer });
			}).catch(function (e) {
				console.error(e);
				msg.send('Oops...');
			});
		},
		per_day: [-1, 10, 20, 100, -1, -1],
		level: 2,
		info: "/achi",
		description: "Достижение minecraft"
	},
	{ // мем
		regexp: /^\/mem(?:\s([0-9]+))?\s(.*)/i,
		f: function (params, msg) {
			msg.reply("Ща сек...");
			var id = params[1] || 1726795; //это так, прото на тесты
			var fields = params[2].split(':');
			vk.request('https://andriy2.tk/api/risovach/' + id + '?' + querystring.stringify({
				zdata1: fields[0] || '',
				zdata2: fields[1] || '',
				zdata3: fields[2] || '',
				zdata4: fields[3] || '',
			})).then(vk.tryJSON).then(function (data) {
				http.get(data.picture, function (res) {
					res.filename = "123.png";
					msg.sendPhoto(res).catch(function (e) {
						console.error(e);
						msg.send('Oops...');
					});
				});
			}).catch(function (e) {
				console.error(e);
				msg.send('Oops...');
			});
		},
		per_day: [-1, 10, 20, 100, -1, -1],
		level: 2,
		info: "/mem",
		description: "Создать mem"
	},
	{ // Promote
		regexp: /^\/promote\s(add|del)\s(A|L)(?::([0-9]))?/i,
		needfullmsg: 1,
		f: function (params, msg) {
			var uids = msg.fwd_messages.map(x => x.user_id).toUnique();
			switch (params[1].toLowerCase()) {
				case "add":
					switch (params[2].toUpperCase()) {
						case "A":
							usergroups.admins = usergroups.admins.concat(uids);
							break;
						case "L":
							if (!params[3]) return msg.send("Нужен номер уровня");
							if (parseInt(params[3]) > 6 || parseInt(params[3]) < 1) return msg.send("Номер уровня должен быть от 1 до 5. Чтобы добавить пользователя до группы 5 уровня, сделайте его администратором Ждуна");
							switch (parseInt(params[3])) {
								case 1:
									usergroups.vip = usergroups.vip.concat(uids);
									break;
								case 2:
									usergroups.premium = usergroups.premium.concat(uids);
									break;
								case 3:
									usergroups.moderators = usergroups.moderators.concat(uids);
									break;
								case 4:
									usergroups.devlite = usergroups.devlite.concat(uids);
									break;
								case 5:
									usergroups.devil = usergroups.devil.concat(uids);
									break;
							}
							break;
					}
					break;
				case "del":
					switch (params[2].toUpperCase()) {
						case "A":
							uids.map(x => usergroups.admins.splice(usergroups.admins.indexOf(x), 1));
							break;
						case "L":
							if (!params[3]) return msg.send("Нужен номер уровня");
							if (parseInt(params[3]) > 6 || parseInt(params[3]) < -1) return msg.send("Номер уровня должен быть от 1 до 5. Чтобы добавить пользователя до группы 5 уровня, сделайте его администратором Ждуна");
							switch (parseInt(params[3])) {
								case 1:
									uids.map(x => usergroups.vip.splice(usergroups.vip.indexOf(x), 1));
									break;
								case 2:
									uids.map(x => usergroups.premium.splice(usergroups.premium.indexOf(x), 1));
									break;
								case 3:
									uids.map(x => usergroups.moderators.splice(usergroups.moderators.indexOf(x), 1));
									break;
								case 4:
									uids.map(x => usergroups.devlite.splice(usergroups.devlite.indexOf(x), 1));
									break;
								case 5:
									uids.map(x => usergroups.devil.splice(usergroups.devil.indexOf(x), 1));
									break;
							}
							break;
					}
					break;
			}
			update_usergroups();
			msg.send("Готово!");
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "/promote A|L:<уровень>",
		description: "Повышение привилегий пользователя"
	},
	{ // List
		regexp: /^\/vlist/i,
		f: function (params, msg) {
			var uids = usergroups.vip.concat(
				usergroups.premium, usergroups.moderators, usergroups.admins,
				usergroups.devil, usergroups.devlite
			).toUnique();

			vk.users.get({
				user_ids: uids.join(","),
				fields: "first_name"
			}).then(function (r) {
				return VK.Array2Object(r.map(u => ({
					key: u.id,
					value: u.first_name + " " + u.last_name
				})));;
			}).then(function (info) {
				console.log(info);
				var toList = users => "\n -" + users.map(u => info[u]).join("\n- ");
				return [
					"Developer: " + toList(usergroups.admins),
					"Devil: " + toList(usergroups.devil),
					"Developer Lite: " + toList(usergroups.devlite),
					"Администраторы: " + toList(usergroups.moderators),
					"Premium-пользователи: " + toList(usergroups.premium),
					"VIP-пользователи: " + toList(usergroups.vip)
				].join("\n\n");
			}).then(msg.send);
		},
		per_day: [3, 3, 3, 3, 3, 3],
		level: 1,
		info: "/vlist",
		description: "Список vip/premium/admin пользователей"
	},
	{ //
		regexp: /\/yt\s(.*)/i,
		f: function (params, msg) {
			console.log(msg.user_id + " - " + msg.body);
			yt.api.search({
				part: "snippet",
				q: encodeURIComponent(params[1]),
				type: "channel",
				regionCode: "RU"
			}, function (a) {
				if (a.items[0]) {
					yt.api.channels({
						part: "statistics,snippet,status,brandingSettings",
						id: a.items[0].id.channelId
					}, function (a) {
						msg.send("На канале " + a.items[0].snippet.title + " - " + array_chunk(a.items[0].statistics.subscriberCount.toString().split("").reverse(), 3).map(x => x.reverse().join("")).reverse().join(" ") + " подписчиков!");
					});
				} else {
					msg.send("Канал не найден =(");
				}
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/yt имя_канала",
		description: "Подписчики youtube"
	},
	{ // /кричи
		regexp: /^\/кричи\s([А-яA-z]+.*)/i,
		f: function (params, msg) {
			var interval = setInterval(function () {
				msg.send(params[1].scream());
			}, 1000);
			setTimeout(function () {
				clearInterval(interval);
			}, getRandomInt(2, 6) * 1000);
		},
		per_day: [-1, 10, 20, 100, -1, -1],
		level: 1,
		info: "/кричи [текст]",
		description: "Кричит"
	},
	{ // /вжух
		regexp: /^\/вжух\s(и\s)?(.*)/i,
		f: function (params, msg) {
			var canvas = new Canvas(616, 379);
			fs.readFile("./bot/vjuh.png", (err, data) => {
				if (err) throw err;
				var img = new Canvas.Image();
				img.src = data;
				canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
				var ctx = canvas.getContext('2d');
				ctx.font = '20px Impact';
				ctx.fillStyle = "black";
				ctx.fillText("Вжух и " + params[2], 280, 300);
				msg.sendPhoto({ buffer: canvas.toBuffer() });
			});
		},
		per_day: [-1, 10, 25, 100, -1, -1],
		info: "/вжух [текст]",
		description: "Вжухает",
	},
	{ // citgen
		regexp: /^\/(c(an|it))/i,
		needfullmsg: 1,
		f: function (params, msg) {
			var canvas = new Canvas(850, 600);
			if (msg.fwd_messages && msg.fwd_messages[0].user_id !== 220087974 && msg.fwd_messages[0].body.length > 0) {
				vk.users.get({
					user_id: msg.fwd_messages[0].user_id,
					fields: "photo_200"
				}).then(function (a) {
					request.get(a[0].photo_200).pipe(fs.createWriteStream("./bot/data/pictures/cit/" + a[0].id + ".png")).on("close", function () {
						fs.readFile("./bot/data/pictures/cit/" + a[0].id + ".png", function (err, squid) {
							if (err) throw err;
							var img = new Canvas.Image();
							img.src = squid;
							var ctx = canvas.getContext('2d');
							// рисование черного фона
							ctx.beginPath();
							ctx.rect(0, 0, 850, 600);
							ctx.fillStyle = "black";
							ctx.fill();
							// наложение текста "цитаты людей"
							ctx.font = '60px Impact';
							ctx.fillStyle = "white";
							ctx.fillText("Цитаты великих людей:", 40, 120);
							// наложение текста из сообщения
							var text = msg.fwd_messages.filter(function (a) {
								return msg.fwd_messages[0].user_id == a.user_id;
							}).map(function (a) {
								return a.body;
							}).join(" ").ucfirst();
							ctx.font = '26px Impact';
							ctx.fillStyle = "white";
							ctx.fillText("«" + text.stroke(26).join("\n").stroke(300)[0] + "»", 260, 220);
							text = "© " + a[0].first_name + " " + a[0].last_name; // наложение имя/фамилия
							ctx.font = '26px Impact';
							ctx.fillStyle = "white";
							ctx.fillText(text, 600 - text.length * 5, 550);
							canvas.getContext('2d').drawImage(img, 40, 180, img.width, img.height); // наложение авы юзера
							msg.sendPhoto({
								buffer: canvas.toBuffer()
							});
						});
					});
				});
			}
		},
		level: 2,
		per_day: [-1, 10, 20, 100, -1, -1],
		info: "/cit [fwd]",
		description: "Делает цитату из пересланного сообщения"
	},
	{
		regexp: /^\/(flash|флешбек|flashback)/i,
		needfullmsg: 1,
		f: function (params, msg) {
			var canvas = new Canvas();
			if (msg.fwd_messages && msg.fwd_messages[0].attachments && msg.fwd_messages[0].attachments[0].photo && !msg.attachments[0]) msg.attachments = msg.fwd_messages[0].attachments;
			if (!msg.attachments) return msg.send("Ты не прикрепил пикчу, ретард");
			vk.messages.getById({
				message_ids: msg.id
			}).then(function (res) {
				if (!res.items[0].attachments[0].photo.photo_604) return msg.send("Мб пикча хуевая, а мб ты долбоеб, я не знаю, сорри");
				request.get(res.items[0].attachments[0].photo.photo_604).pipe(fs.createWriteStream("./img/flashback/pic.png")).on("close", () => {
					fs.readFile("./img/flashback/pic.png", function (err, sq) {
						var ctx = canvas.getContext('2d');
						var img = new Canvas.Image();
						img.src = sq;
						canvas.height = img.height;
						canvas.width = img.width;
						ctx.drawImage(img, 0, 0, img.width, img.height);
						fs.readFile("./img/flashback/" + getRandomInt(1, 5) + ".png", function (err, squid) {
							var ctx = canvas.getContext('2d');
							var imgs = new Canvas.Image();
							ctx.globalAlpha = 0.5;
							imgs.src = squid;
							ctx.drawImage(imgs, 0, 0, img.width, img.height);
							msg.sendPhoto({
								buffer: canvas.toBuffer()
							});
						});
					});
				});
			});
		},
		level: 2,
		per_day: [-1, 10, 20, 100, -1, -1],
		info: "/flashback",
		description: "возвращает вас во вьетнам"
	},
	{
		regexp: /^\/morze\s([^]+)/i,
		f: function (params, msg) {
			return msg.send(filter(morze(params[1])));
		},
		description: "/morze <текст> -- кодирует текст",
		level: 0
	},
	{
		regexp: /^\/(?:kek|кек|кекни|отрази)(\+)?/i,
		//needfullmsg: 1,
		f: function (params, msg) {
			msg.get().then(function (b) {
				if (b.attachments[0] && b.attachments[0].photo || b.fwd_messages && b.fwd_messages[0].attachments && b.fwd_messages[0].attachments[0].photo) {
					if (b.fwd_messages && b.fwd_messages[0].attachments && b.fwd_messages[0].attachments[0].photo && !b.attachments[0]) b.attachments = b.fwd_messages[0].attachments;
					var width = b.attachments[0].photo.width;
					var height = b.attachments[0].photo.height;
					var link = VK.getAttachmentUrl(b.attachments[0]);
					downToBuf(link).then((squid) => {
						var canvas = new Canvas(width, height);
						var Image = Canvas.Image;
						var img = new Image();
						img.src = squid;
						var ctx = canvas.getContext('2d');
						ctx.drawImage(img, 0, 0);
						var sourceWidth = canvas.width;
						var sourceHeight = canvas.height;
						var sourceX = (params[1] ? sourceWidth / 2 : -sourceWidth / 2);
						var sourceY = 0;
						var destWidth = sourceWidth;
						var destHeight = sourceHeight;
						var destX = canvas.width / 2 - destWidth / 2;
						var destY = canvas.height / 2 - destHeight / 2;
						ctx.translate(canvas.width, 0);
						ctx.scale(-1, 1);
						ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, params[1] ? destX + (canvas.width / 2) : destX - (canvas.width / 2), destY, destWidth, destHeight);
						var buf = canvas.toBuffer();
						msg.sendPhoto({
							buffer: buf
						});
					});
				} else {
					msg.send("Фотка где");
				}
			});
		},
		level: 2,
		per_day: [-1, 10, 20, 100, -1, -1],
		info: "/kek",
		description: "зеркалит ваше фото"
	},
	{ //конфа
		regexp: /^\/конфа/i,
		f: function (params, msg) {
			function add() {
				vk.messages.addChatUser({
					chat_id: getRandomInt(10, vars.chat_id_max),
					user_id: msg.user_id
				}).catch(add);
			}
			add();
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "/конфа",
		description: "Кидает инвайт в любую конфу где есть Ждун",
	},
	{ //конфа
		regexp: /^\/reset/i,
		f: function (params, msg) {
			var obj = {};
			cmds.map(function (a, i) {
				if (a.info) obj[a.info.split(" ")[0]] = {};
			});
			commands_info = obj;
			fs.writeFile("./commands_info.json", JSON.stringify(obj, null, "  "), function () {
				msg.send("Счетчик обнулен");
			});
		},
		admin: 1,
		per_day: [-1, -1, -1, -1, -1, -1],
		info: "/reset",
		description: "Обнуляет всё",
	},
	{ // /try
		regexp: /^\/try\s/i,
		need_ui: 1,
		f: function (params, msg) {
			msg.send(msg.user_info.first_name + " " + msg.user_info.last_name + " " + msg.body.replace(/^\/try\s/i, "") + " | " + ["Удачно", "Неудачно"].random());
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/try [текст]",
		description: "Samp Try"
	},
	{ // /me
		regexp: /^\/me\s/i,
		need_ui: 1,
		f: function (params, msg) {
			msg.send(msg.user_info.first_name + " " + msg.user_info.last_name + " " + msg.body.replace(/^\/me\s/i, ""));
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/me [текст]",
		description: "Samp Me"
	},
	{ // /do
		regexp: /^\/do\s/i,
		need_ui: 1,
		f: function (params, msg) {
			msg.send(msg.body.replace(/^\/do\s/i, "").ucfirst() + " (" + msg.user_info.first_name + " " + msg.user_info.last_name + ")");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/do [текст]",
		description: "Samp Do"
	},
	{ // /gif
		regexp: /^\/gif/i,
		f: function (params, msg) {
			function gifsrch() {
				vk.wall.get({
					owner_id: -39488246,
					offset: getRandomInt(0, 50000),
					count: 1
				}).then(function (a) {
					if (a.items[0] && a.items[0].attachments[0].type == "doc") {
						msg.send("", {
							attachment: "doc" + a.items[0].attachments[0].doc.owner_id + "_" + a.items[0].attachments[0].doc.id
						});
					} else {
						gifsrch();
					}
				});
			}
			gifsrch();
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/gif",
		description: "Рандомная гифка"
	},
	{ // /cmds
		regexp: /^\/(cmds|StatisticulatedNixyasebestataupala)/i,
		f: function (params, msg) {
			msg.send(cmds.filter(a => !a.admin && a.info).sort((a, b) => b.counter - a.counter).map(a => a.info + " - " + a.counter).join("\n"));
		},
		per_day: [-1, -1, -1, -1, -1, -1],
		admin: 1,
		info: "/cmds",
		description: "Статистика команд"
	},
	{ // /block title
		regexp: /^\/block\s(title|photo)/i,
		f: function (params, msg) {
			switch (msg.body.toLowerCase()) {
				case "/block title":
					vars.chats.block.titles[msg.chat_id] = msg.title;
					msg.send("Название чата заблокировано");
					update_vars();
					break;
				case "/block photo":
					if (msg.photo_200) {
						vars.chats.block.photos[msg.chat_id] = msg.chat_id;
						update_vars();
						request(msg.photo_200).pipe(fs.createWriteStream('./bot/data/block/photos/' + msg.chat_id + '.jpg')).on('close', function () {
							msg.send("Фотография заблокирована");
						});
					}
			}
		},
		level: 3,
		info: "/block title | photo",
		description: "Заблокирует название беседы | фотографию беседы",
	},
	{ // /unblock title
		regexp: /^\/unblock (title|photo)/i,
		f: function (params, msg) {
			switch (msg.body.toLowerCase()) {
				case "/unblock title":
					delete vars.chats.block.titles[msg.chat_id];
					msg.send("Название чата разблокировано");
					update_vars();
					break;
				case "/unblock photo":
					delete vars.chats.block.photos[msg.chat_id];
					msg.send("Фотография разблокирована");
					update_vars();
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/unblock title | photo",
		description: "Разблокирует название беседы | фотографию беседы",
		level: 3,
	},
	{ // /wfc
		regexp: /^\/wfc\s(.*)/i,
		f: function (params, msg) {
			if (params[1].match(/^reset$/i)) {
				delete vars.chats.greetings[msg.chat_id];
				update_vars();
				msg.send("Приветствие удалено");
			} else {
				vars.chats.greetings[msg.chat_id] = params[1];
				msg.send("Приветствие установлено");
				update_vars();
			}

		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/wfc [текст]",
		description: "Установит приветствие для беседы",
		level: 3,
	},
	{ // /ffc
		regexp: /^\/ffc\s(.*)/i,
		f: function (params, msg) {
			if (params[1].match(/^reset$/i)) {
				delete vars.chats.kicks[msg.chat_id];
				update_vars();
				msg.send("Прощание удалено");
			} else {
				vars.chats.kicks[msg.chat_id] = params[1];
				msg.send("Прощание установлено");
				update_vars();
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/ffc [текст]",
		description: "Установит прощание для беседы",
		level: 3,
	},
	{ // /укрф
		regexp: /^\/ук(\sрф)?\s([0-9]+)/i,
		f: function (params, msg) {
			request.get("http://ppt.ru/kodeks.phtml?kodeks=20&paper=" + params[2], function (e, r, b) {
				msg.send(parse(b, "<title>", "</title>").replace(/Актуально в [0-9]+\. Последняя редакция/i, ""));
			});
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/ук рф [статья]",
		description: "Уголовный кодекс РФ",
	},
	{ // Test
		regexp: /^[\/]?price/i,
		f: function (params, msg) {
			msg.send("Цены на привилегии:\n🎁ADMIN LEVEL\n&#4448;&#4448;Цена: 50 рублей\n🎁PREMIUM LEVEL\n&#4448;&#4448;Цена: 25 рублей\n🎁VIP LEVEL\n&#4448;&#4448;Цена: 10 рублей\n\nПокупка ----> https://vk.com/pahom_bots?w=product-155058357_1170203%2Fquery");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/price",
		description: "Цены на привилегии"
	},
	{ // Test
		regexp: /^\/buyminer(?:\s([0-9]+|all))?/i,
		f: function (params, msg) {
			var miner_name,
				coef = Object.entries(miner_profiles).map(a => {
					a[1] = a[1].filter(a => a.ended);
					return a;
				}).filter(a => a[1].length).length;
			if (coef == 0) coef = 1;
			if (!params[1]) {
				if (!miner_profiles[msg.user_id]) {
					miner_profiles[msg.user_id] = [];
					update_miners();
				}
				if (!miner_profiles[msg.user_id] || !miner_profiles[msg.user_id].length || miner_profiles[msg.user_id] && miner_profiles[msg.user_id].last().ended) {
					msg.send("Доступные майнеры:\n" + miner_config.map(a => a.allias + " (" + parseInt(a.per_hour / coef) + " btc/ч) - " + a.price + " 💊").numeric().join("\n"));
				} else {
					miner_name = miner_profiles[msg.user_id].last().name;
					var details = Object.entries(miner_profiles[msg.user_id].last().details[0]).map(a => a[0] + " - " + miner_config.remap("allias")[miner_name].details[a[0]] + " 💊 (" + (a[1].bool ? "Куплено" : "Не куплено") + ")");
					msg.send("Вам нужно собрать кастомный майнер!\nДетали для майнера:\n" + details.numeric().join("\n") + "\nЕсли хотите отменить сборку введите /cancel\nЧтобы собрать весь майнер сразу, введите /buyminer all");
				}
			} else {
				var index = (parseInt(params[1]) - 1);
				if (miner_config[index] || /all/ig.test(params[1])) {
					if (profiles[msg.user_id]) {
						if (!/all/ig.test(params[1]) && !miner_profiles[msg.user_id] || !miner_profiles[msg.user_id].length || miner_profiles[msg.user_id].last().ended) {
							if (!/all/ig.test(params[1]) && profiles[msg.user_id].balance > miner_config[index].price) {
								profiles[msg.user_id].balance = (profiles[msg.user_id].balance - miner_config[index].price);
								if (!miner_profiles[msg.user_id]) miner_profiles[msg.user_id] = [];
								var obj = {
									name: miner_config[index].allias,
									per_hour: miner_config[index].per_hour,
									ended: true
								};
								if (miner_config[index].details) {
									var entries = Object.entries(miner_config[index].details);
									obj.details = [{}];
									Object.keys(miner_config[index].details).forEach(a => {
										obj.details[0][a] = {
											bool: false
										};
									});
									obj.ended = false;
								}
								miner_profiles[msg.user_id].push(obj);
								update_profiles();
								update_miners();
								msg.send("Майнер куплен" + (obj.details ? ". Чтобы посмотреть список деталей для кастомного майнера введите /buyminer" : ""));
							} else {
								msg.send("На вашем счете недостаточно средств!");
							}
						} else {
							var names = Object.keys(miner_profiles[msg.user_id].last().details[0]);
							miner_name = miner_profiles[msg.user_id].last().name;
							var detail_name = names[index];
							var detail_price = miner_config.remap("allias")[miner_name].details[detail_name];
							var miner_index = (miner_profiles[msg.user_id].length - 1);
							if (/all/ig.test(params[1])) {
								var prices = Object.values(miner_config.last().details);
								var values = Object.values(miner_profiles[msg.user_id].last().details[0]);
								var sum = 0;
								prices.forEach((e, i) => {
									if (!values[i].bool) sum += prices[i];
								});
								if (profiles[msg.user_id].balance > sum) {
									profiles[msg.user_id].balance = profiles[msg.user_id].balance - sum;
									names.forEach((a, i) => {
										miner_profiles[msg.user_id][miner_index].details[0][names[i]].bool = true;
									});
									miner_profiles[msg.user_id][miner_index].ended = true;
									msg.send("Вы купили весь майнер целиком, с вашего счета списано " + sum + " 💊, майнер собран.");
									update_miners();
									update_profiles();
								} else {
									msg.send("На вашем счете недостаточно средств");
								}
							} else {
								if (miner_profiles[msg.user_id].last().details[0][detail_name].bool == false) {
									if (profiles[msg.user_id].balance > detail_price) {
										profiles[msg.user_id].balance = profiles[msg.user_id].balance - detail_price;
										var i = (miner_profiles[msg.user_id].length - 1);
										miner_profiles[msg.user_id][i].details[0][detail_name].bool = true;
										if (Object.entries(miner_profiles[msg.user_id][i].details[0]).every(a => a[1].bool == true)) {
											miner_profiles[msg.user_id][i].ended = true;
											msg.send("Вы купили деталь: " + detail_name + "\nПоздравляем! Вы собрали кастомный майнер!");
											update_miners();
											update_profiles();
										} else {
											msg.send("Вы купили деталь: " + detail_name);
											update_miners();
											update_profiles();
										}
									} else {
										msg.send("На вашем счете недостаточно средств");
									}
								} else {
									msg.send("У вас уже есть эта деталь!");
								}
							}
						}
					} else {
						msg.send("У вас не создан кошелек 💊! Создайте его через команду /create");
					}
				} else {
					msg.send("Такого майнера нету! Выберите номер майнера из списка");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/buyminer",
		description: "Покупка майнеров"
	},
	{ // /bs
		regexp: /^\/cancel/i,
		f: function (params, msg) {
			if (miner_profiles[msg.user_id] && miner_profiles[msg.user_id].length) {
				if (miner_profiles[msg.user_id].last().details && !miner_profiles[msg.user_id].last().ended) {
					miner_profiles[msg.user_id].pop();
					msg.send("Сборка кастомного майнера отменена");
					update_miners();
				} else {
					msg.send("Вы не собираете кастомный майнер");
				}
			} else {
				msg.send("У вас нету майнеров");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/cancel",
		description: "Отменить сборку майнера"
	},
	{ // /bs
		regexp: /^\/topminers/i,
		f: function (params, msg) {
			if (Object.keys(miner_stats).length) {
				var arr = Object.entries(miner_stats).sort((a, b) => b[1] - a[1]).get(10);
				var users = arr.map(a => a[0]);
				vk.users.get({
					user_ids: users.join(",")
				}).then(a => {
					var names = a.map((b) => "[id" + b.id + "|" + b.first_name + " " + b.last_name + "]");
					msg.send(arr.map((a, i) => names[i] + " - " + a[1] + " 💊").numeric().join("\n"));
					update_miners();
				});
			} else {
				msg.send("Топа майеров еще нет, обновление топа происходит каждый час.");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/topminers",
		description: "Топ майнеров"
	},
	{ // /bs
		regexp: /^\/minerstat/i,
		f: function (params, msg) {
			if (miner_profiles[msg.user_id] && miner_profiles[msg.user_id].length) {
				var coef = Object.entries(miner_profiles).map(a => {
					a[1] = a[1].filter(a => a.ended);
					return a;
				}).filter(a => a[1].length).length;
				var summ = 0;
				miner_profiles[msg.user_id].filter(a => a.ended).forEach(a => {
					summ += a.per_hour;
				});
				msg.send("Количество майнеров: " + miner_profiles[msg.user_id].filter(a => a.ended).length + "\nКоличество 💊 в час: " + (summ / coef) + "\nНамайнено за все время: " + (miner_stats[msg.user_id] ? miner_stats[msg.user_id] : 0) + " 💊");
			} else {
				msg.send("У вас ещё нет статистики майнинга");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/minerstat",
		description: "Статистика майнинга"
	},
	{ // /node
		regexp: /^\/pole(?:\s([А-яA-z]))?/i,
		f: function (params, msg) {
			if (!data.gallows) data.gallows = {};
			var ask, word, health_count, def_health, health_string;
			if (!data.gallows[msg.chat_id]) {
				var rand = data.gallow_config.base.random();
				data.gallows[msg.chat_id] = {
					word: rand.answer.toLowerCase(),
					ask: rand.ask,
					regained: [],
					health: data.gallow_config.health
				};
				word = data.gallows[msg.chat_id].word.replace(/[A-zА-я]/ig, "_");
				health_count = data.gallows[msg.chat_id].health;
				ask = data.gallows[msg.chat_id].ask;
				msg.send("Игра начата!Что бы ввести букву пишите /pole тут буква\nВопрос: " + ask + "\nСлово: " + word + "\nЗдоровье: " + "❤".repeat(health_count));
			} else {
				word = data.gallows[msg.chat_id].word.split("").map(a => data.gallows[msg.chat_id].regained.includes(a) ? a : "_").join("");
				health_count = data.gallows[msg.chat_id].health;
				if (health_count > 1) {
					if (params[1]) {
						var bool = data.gallows[msg.chat_id].word.split("").includes(params[1].toLowerCase());
						if (bool) {
							data.gallows[msg.chat_id].regained.push(params[1].toLowerCase());
							word = data.gallows[msg.chat_id].word.split("").map(a => data.gallows[msg.chat_id].regained.includes(a.toLowerCase()) ? a.toLowerCase() : "_").join("");
							def_health = data.gallow_config.health;
							health_string = new Array(def_health).fill(1).map((a, i) => health_count > i ? "❤" : "💔").join("");
							ask = data.gallows[msg.chat_id].ask;
							if (/_/i.test(word)) {
								msg.send("Правильно! Вопрос: " + ask + "\nСлово: " + word + "\n" + health_string);
							} else {
								msg.send("Правильно! Вопрос: " + ask + "\nСлово: " + word.ucfirst() + "\nВы выиграли!");
								delete data.gallows[msg.chat_id];
							}
						} else {
							data.gallows[msg.chat_id].health--;
							def_health = data.gallow_config.health;
							health_count = data.gallows[msg.chat_id].health;
							health_string = new Array(def_health).fill(1).map((a, i) => health_count > i ? "❤" : "💔").join("");
							ask = data.gallows[msg.chat_id].ask;
							msg.send("Неправильно! В слове нету буквы\"" + params[1] + "\"\nопрос: " + ask + "\nСлово: " + word.ucfirst() + "\n" + health_string);
						}
					} else {
						def_health = data.gallow_config.health;
						health_count = data.gallows[msg.chat_id].health;
						health_string = new Array(def_health).fill(1).map((a, i) => health_count > i ? "❤" : "💔").join("");
						ask = data.gallows[msg.chat_id].ask;
						msg.send("Игра идет! Вопрос: " + ask + "\nСлово: " + word + "\n" + health_string);
					}
				} else {
					var clear_word = data.gallows[msg.chat_id].word;
					delete data.gallows[msg.chat_id];
					msg.send("Вы проиграли! Слово которое было: " + clear_word);
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/pole",
		description: "поле чудес"
	},
	{ // /createclan
		regexp: /^\/createclan(?:\s(.*))?/i,
		f: function (params, msg) {
			if (!clans.users[msg.user_id]) {
				if (!params[1]) {
					msg.send("Создание клана стоит 50.000 💊\nСоздать клан - /createclan имя_клана");
				} else {
					var user_balance = profiles[msg.user_id].balance;
					if (user_balance > 50000) {
						profiles[msg.user_id].balance = (user_balance - 50000);
						var clan_id = (Object.keys(clans.base).length + 1);
						clans.base[clan_id] = {
							admin: msg.user_id,
							name: params[1].split("").get(25).join(""),
							users: [msg.user_id],
							bank: 0
						};
						clans.users[msg.user_id] = {
							clan_id: clan_id,
							deposit: 0,
							prefix: false
						};
						msg.send("Поздравляем! Вы создали клан \"" + params[1].split("").get(25).join("") + "\"\nС вашего баланса снято 50000 💊");
						update_clans();
						update_profiles();
					} else {
						msg.send("У вас недостаточно 💊 для создания клана");
					}
				}
			} else {
				msg.send("Вы уже состоите в клане, или имеете приглашение в клан");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/createclan",
		description: "Создать клан"
	},
	{
		regexp: /^\/story(\+)? ([\s\S\n]+)$/i,
		f: function (params, msg) {
			let x = 1080, y = 1920;
			let canvas = new Canvas(x, y), ctx = canvas.getContext('2d');

			let from = 427544280
			let text = params[2];
			let h = x * 7.5 / ctx.measureText(text).width;

			ctx.beginPath()
			ctx.fillStyle = 'black'
			ctx.rect(0, 0, x, y)
			ctx.fill()

			ctx.font = h + 'px Ubuntu';
			ctx.fillStyle = 'white'
			ctx.textBaseline = 'middle'
			ctx.textAlign = 'center'
			//			ctx.fillText(text, x/2, y/2 - h * text.split('\n').length/2.5);
			texts = text.split('\n').map(x => x.trim())
			texts.forEach((t, i, a) => ctx.fillText(t, x / 2, y / 2 - ((a.length - 1) / 2 - i) * h))

			//			ctx.fillText(text, x/2, y/2 - h * text.split('\n').length/2.5);

			//
			//	return msg.sendGraffiti({buffer: canvas.toBuffer()})

			return vk.upload.storiesPhoto({
				get: {
					add_to_news: 1
				},
				files: {
					file: {
						filename: 'Story.png',
						buffer: canvas.toBuffer()
					}
				}
			}).then(x => msg.send('', { attachment: 'story' + from + '_' + x.response.story.id }))
		},
		only: 'vk',
		admin: 1,
		info: '/story [text]',
		description: 'Постит историю ВКонтакте'
	},
	{ // /deposit
		regexp: /^\/deposit(?:\s(.*))?/i,
		f: function (params, msg) {
			if (!params[1]) {
				msg.send("Чтобы положить деньги в клан, введите /deposit количество_пилюль");
			} else {
				var summ = parseInt(params[1]);
				if (summ && summ > 0) {
					var user_balance = profiles[msg.user_id].balance;
					if (user_balance >= summ) {
						var clan_id = clans.users[msg.user_id].clan_id;
						profiles[msg.user_id].balance = user_balance - summ;
						clans.base[clan_id].bank += summ;
						clans.users[msg.user_id].deposit += summ;
						msg.send("Вы перевели на счет клана " + summ + " 💊");
						update_clans();
						update_profiles();
					}
				} else {
					if (summ == 0) {
						msg.send("Очень смешно");
					} else if (summ < 0) {
						msg.send("Сумма должна быть положительной");
					} else {
						msg.send("Цифры вводи, дебил блять");
					}
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/deposit",
		description: "Пожертвовать деньги в клан банка"
	},
	{ // /withdraw
		regexp: /^\/withdraw(?:\s(.*))?/i,
		f: function (params, msg) {
			var clan_id = clans.users[msg.user_id].clan_id;
			var clan_admin = clans.base[clan_id].admin;
			if (msg.user_id == clan_admin) {
				if (!params[1]) {
					msg.send("Чтобы снять деньги клана, введите /withdraw количество_пилюль");
				} else {
					var summ = parseInt(params[1]);
					if (summ && summ > 0) {
						var clan_balance = clans.base[clan_id].bank;
						if (clan_balance >= summ) {
							var user_balance = profiles[msg.user_id].balance;
							profiles[msg.user_id].balance = user_balance + summ;
							clans.base[clan_id].bank -= summ;
							msg.send("Вы сняли со счета клана " + summ + " 💊");
							update_clans();
							update_profiles();
						} else {
							msg.send("На счету клана недостаточно 💊 для совершения перевода");
						}
					} else {
						if (summ == 0) {
							msg.send("Очень смешно");
						} else if (summ < 0) {
							msg.send("Сумма должна быть положительной");
						} else {
							msg.send("Цифры вводи, дебил блять");
						}
					}
				}
			} else {
				msg.send("Снимать 💊 пилюли со счета может только админ клана");
			}
		},
		admin: 1,
		per_day: [-1, -1, -1, -1, -1, -1],
		info: "/withdraw [сумма]",
		description: "Снять определенную сумму с банка клана"
	},
	{ // /invite
		regexp: /^\/invite/i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				var user_id = msg.fwd_messages[0].user_id;
				var clan_id = clans.users[msg.user_id].clan_id;
				var clan_admin = clans.base[clan_id].admin;
				if (msg.user_id == clan_admin) {
					if (clans.users[msg.user_id]) {
						if (clans.base[clan_id].users.length <= 25) {
							if (!clans.users[user_id]) {
								clans.users[user_id] = {
									invite: clan_id
								};
								msg.send("Приглашение в клан выслано участнику в ЛС\nЕсли она у него закрыта, скажите ему что принять приглашение можно командой /accept, отклонить - /reject");
								var clan_name = clans.users[clan_id].name;
								vk.messages.send({
									message: "Вы были приглашены в клан \"" + clan_name + "\"\nЧтобы принять приглашение, введите /accept\nЧтобы отклонить приглашение, введите /reject",
									user_id: user_id
								});
								update_clans();
							} else {
								msg.send("Пользователь уже состоит в клане, или приглашен в другой");
							}
						} else {
							msg.send("Вы достигли лимита пользователей в клане! Максимум человек в клане - 25");
						}
					} else {
						msg.send("Вы не состоите не в одном клане");
					}
				} else {
					msg.send("Инвайтнуть может только админ клана");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/invite [пересланное сообщение]",
		description: "Пригласить человека в клан"
	},
	{ // /accept
		regexp: /^\/accept/i,
		f: function (params, msg) {
			if (clans.users[msg.user_id] && clans.users[msg.user_id].invite) {
				var clan_id = clans.users[msg.user_id].invite;
				clans.users[msg.user_id] = {
					clan_id: clan_id,
					prefix: false,
					deposit: 0
				};
				clans.base[clan_id].users.push(msg.user_id);
				var clan_name = clans.base[clan_id].name;
				msg.send("Вы вступили в клан \"" + clan_name + "\"");
				update_clans();
			} else {
				msg.send("У вас нет приглашения в клан.");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/accept",
		description: "Принять приглашение в клан",
	},
	{ // /reject
		regexp: /^\/reject/i,
		f: function (params, msg) {
			if (clans.users[msg.user_id] && clans.users[msg.user_id].invite) {
				delete clans.users[msg.user_id];
				msg.send("Приглашение в клан было отклонено.");
				update_clans();
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/reject",
		description: "Отклонить приглашение в клан"
	},
	{ // /kick
		regexp: /^\/kick/i,
		needfullmsg: 1,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				var user_id = msg.fwd_messages[0].user_id;
				if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
					var clan_id = clans.users[msg.user_id].clan_id;
					var clan_admin = clans.base[clan_id].admin;
					if (clan_admin == msg.user_id) {
						var clan_id_kicked_user = clans.users[user_id].clan_id;
						if (clan_id_kicked_user == clan_id) {
							clans.base[clan_id].users.del(user_id);
							delete clans.users[user_id];
							msg.send("Пользователь был удален из клана.");
							update_clans();
						} else {
							msg.send("Он состоит не в вашем клане.");
						}
					} else {
						msg.send("Выгнать из клана может только админ клана");
					}
				} else {
					msg.send("Пользователь не состоит в клане.");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/kick",
		description: "Выгнать участника из клана"
	},
	{ // /topclans
		regexp: /^\/topclans/i,
		f: function (params, msg) {
			var clan_list = Object.values(clans.base).filter(a => a.users.length && a.miners && a.miners.length).sort((a, b) => b.miners.length - a.miners.length);
			var clan_top = clan_list.map(a => a.name + " (" + a.users.length + "/25 человек) - банк " + a.miners.length + " майнеров").numeric().join("\n");
			msg.send(clan_list.length ? clan_top : "Топ кланов пока пуст");
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/topclans",
		description: "Топ кланов"
	},
	{ // /minerlist
		regexp: /^\/minerlist/i,
		f: function (params, msg) {
			if (miner_profiles[msg.user_id] && miner_profiles[msg.user_id].length) {
				var obj = {};
				miner_profiles[msg.user_id].forEach(a => {
					if (!obj[a.name]) obj[a.name] = {
						count: 0
					};
					obj[a.name].count++;
				});
				var clan_miners = [];
				Object.entries(obj).forEach(e => {
					var name = e[0];
					var count = e[1].count;
					clan_miners.push([name, count]);
				});
				clan_miners = clan_miners.map(a => "- " + a[0] + ": " + a[1]).join("\n");
				msg.send("Ваши майнеры:\n" + clan_miners);
			} else {
				msg.send("У тебя нет майнеров");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/topclans",
		description: "Топ кланов"
	},
	{ // /clan
		regexp: /^\/clan$/i,
		f: function (params, msg) {
			if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
				var coef = Object.entries(miner_profiles).map(a => {
					a[1] = a[1].filter(a => a.ended);
					return a;
				}).filter(a => a[1].length).length;
				if (coef == 0) coef = 1;
				var clan_id = clans.users[msg.user_id].clan_id;
				var clan_name = clans.base[clan_id].name;
				var clan_bank = clans.base[clan_id].bank;
				var user_list = Object.entries(clans.users).filter(a => a[1].clan_id == clan_id).sort((a, b) => b.deposit - a.deposit);
				var user_ids = user_list.map(a => a[0]).join(",");
				//if(clans.base[clan_id].miners) var clan_miners = clans.base[clan_id].miners.map(a=>a.name+" - "+(Math.floor(a.per_hour/coef))+" 💊 в 6 часов").join("\n");
				if (clans.base[clan_id].miners) {
					var obj = {};
					clans.base[clan_id].miners.forEach(a => {
						if (!obj[a.name]) obj[a.name] = {
							count: 0
						};
						obj[a.name].count++;
					});
					var clan_miners = [];
					Object.entries(obj).forEach(e => {
						var name = e[0];
						var count = e[1].count;
						clan_miners.push([name, count]);
					});
					clan_miners = clan_miners.map(a => "- " + a[0] + ": " + a[1]).join("\n");
				}
				//console.log(clan_miners);
				vk.users.get({
					user_ids: user_ids
				}).then((a) => {
					var user_list = Object.entries(clans.users)
						.filter(a => a[1].clan_id == clan_id)
						.sort((a, b) => b.deposit - a.deposit)
						.map((b, i) => {
							b[0] = a[i].first_name + " " + a[i].last_name;
							return b;
						});
					var user_top = user_list.reverse().map(a => a[0] + " - " + a[1].deposit + " 💊").numeric().join("\n");
					msg.send("Клан: " + clan_name + "\nБанк клана: " + clan_bank + " 💊\nТоп пользовотелей, вложившие 💊 пилюли в банк:\n" + user_top + "\n\nМайнеры клана:\n" + (clan_miners ? clan_miners : "У клана отсутствуют майнеры"));
				});
			} else {
				msg.send("Ты не состоишь в клане");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/clan",
		description: "Информация о вашем клане"
	},
	{ // /clan
		regexp: /^\/rename(?:\s(.*))?/i,
		f: function (params, msg) {
			var clan_id = clans.users[msg.user_id].clan_id;
			var clan_admin = clans.base[clan_id].admin;
			if (clan_admin == msg.user_id) {
				if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
					if (!params[1]) {
						msg.send("Чтобы сменить имя клана введите /rename новое_имя. Стоимость - 500000 💊");
					} else {
						var user_balance = profiles[msg.user_id].balance;
						if (user_balance > 500000) {
							profiles[msg.user_id].balance = user_balance - 500000;
							clans.base[clan_id].name = params[1].split("").get(25).join("");
							msg.send("Клан был успешно переименован. С вашего баланса снято 500000 💊");
							update_clans();
						} else {
							msg.send("У вас недостаточно 💊 для совершения транзакции");
						}
					}
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/rename",
		description: "Переименовать клан"
	},
	{ // /clan
		regexp: /^\/prefix(?:\s(.*))?/i,
		f: function (params, msg) {
			if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
				if (!params[1]) {
					if (!clans.users[msg.user_id].prefix) {
						msg.send("Чтобы установить префикс введите /prefix имя\nУстановка префикса стоит 5000 💊");
					} else {
						var prefix = clans.users[msg.user_id].prefix;
						msg.send("Ваш префикс: " + prefix + "\nВы можете сменить префикс за 50000 💊");
					}
				} else {
					var user_balance = profiles[msg.user_id].balance;
					if (!clans.users[msg.user_id].prefix) {
						if (user_balance > 5000) {
							profiles[msg.user_id].balance = user_balance - 5000;
							clans.users[msg.user_id].prefix = params[1].split("").get(10).join("");
							msg.send("Префикс был успешно установлен! С вашего баланса снято 5000 💊");
							update_clans();
							update_profiles();
						} else {
							msg.send("У вас недостаточно 💊 для совершения транзакции");
						}
					} else {
						if (user_balance > 50000) {
							profiles[msg.user_id].balance = user_balance - 50000;
							clans.users[msg.user_id].prefix = params[1].split("").get(10).join("");
							msg.send("Префикс был успешно изменен! С вашего баланса снято 50000 💊");
							update_clans();
							update_profiles();
						} else {
							msg.send("У вас недостаточно 💊 для совершения транзакции");
						}
					}
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/prefix",
		description: "Установить префикс при обращении бота к вам"
	},
	{ // /clan
		regexp: /^\/exitclan/i,
		f: function (params, msg) {
			var clan_id = clans.users[msg.user_id].clan_id;
			var clan_admin = clans.base[clan_id].admin;
			if (msg.user_id == clan_admin) {
				msg.send("Если вы хотите распустить клан, введите /clandelete");
			} else {
				if (clans.users[msg.user_id]) {
					clan_id = clans.users[msg.user_id].clan_id;
					var user_balance = profiles[msg.user_id].balance;
					if (user_balance > 5000) {
						profiles[msg.user_id].balance = user_balance - 5000;
						delete clans.users[msg.user_id];
						clans.base[clan_id].users.del(msg.user_id);
						msg.send("Вы вышли из клана.  С вашего баланса снято 5000 💊");
						update_clans();
					} else {
						msg.send("У вас недостаточно 💊 для совершения транзакции. Стоимость выхода - 5000 💊");
					}
				} else {
					msg.send("Вы не состоите ни в каком клане.");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/exitclan",
		description: "Выйти из текущего клана"
	},
	{ // /clan
		regexp: /^\/clandelete/i,
		f: function (params, msg) {
			if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
				var clan_id = clans.users[msg.user_id].clan_id;
				var clan_admin = clans.base[clan_id].admin;
				if (msg.user_id == clan_admin) {
					clans.base[clan_id].users.forEach(a => {
						delete clans.users[a];
					});
					clans.base[clan_id].users = [];
					clans.base[clan_id].name = "deleted";
					clans.base[clan_id].admin = null;
					clans.base[clan_id].bank = null;
					msg.send("Клан распущен");
					update_clans();
				} else {
					msg.send("Распустить клан может только админ клана");
				}
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/clandelete",
		description: "Распустить клан"
	},
	{ // /clan
		regexp: /^\/setprefix\s(.*)/i,
		f: function (params, msg) {
			if (msg.fwd_messages) {
				var user_id = msg.fwd_messages[0].user_id;
				if (clans.users[user_id] && clans.users[user_id].clan_id) {
					clans.users[user_id].prefix = params[1];
					update_clans();
				} else {
					msg.send("Пользователь не состоит в клане.");
				}
			}
		},
		level: 4,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/setprefix",
		description: "Сменить префикс человеку в клане"
	},
	{ // /clan
		regexp: /^\/clanminerbuy(?:\s(.*))?/i,
		f: function (params, msg) {
			//console.log(clans)
			if (clans.users[msg.user_id] && clans.users[msg.user_id].clan_id) {
				var clan_id = clans.users[msg.user_id].clan_id;
				var clan_admin = clans.base[clan_id].admin;
				if (msg.user_id == clan_admin) {
					var available_miners = new Array(miner_config[0], miner_config[2]);
					var coef = Object.entries(miner_profiles).map(a => {
						a[1] = a[1].filter(a => a.ended);
						return a;
					}).filter(a => a[1].length).length;
					if (coef == 0) coef = 1;
					if (!params[1]) {
						var miner_list = available_miners.map(a => a.allias + " (" + parseInt(a.per_hour / coef) + " btc/6ч) - " + a.price + " 💊").numeric().join("\n");
						msg.send("Список доступных майнеров:\n" + miner_list + "\nЧтобы купить майнер введите /clanminerbuy номер_майнера");
					} else {
						var int = parseInt(params[1]);
						if (int && available_miners[int - 1]) {
							var selected_miner = available_miners[int - 1];
							var price = selected_miner.price;
							var clan_balance = clans.base[clan_id].bank;
							if (clan_balance > price) {
								clans.base[clan_id].bank = clan_balance - price;
								if (!clans.base[clan_id].miners) clans.base[clan_id].miners = [];
								var obj = {
									name: selected_miner.allias,
									per_hour: selected_miner.per_hour,
									ended: true
								};
								clans.base[clan_id].miners.push(obj);
								msg.send("Поздравляем! Вы купили " + obj.name + " для вашего клана!\nС банка клана списано " + price + " 💊");
								update_clans();
							} else {
								msg.send("В банке клана недостаточно средств для покупки майнера");
							}
						} else {
							msg.send("Такого майнера нету");
						}
					}
				} else {
					msg.send("Купить майнер для клана может только админ клана");
				}
			} else {
				msg.send("Ты не в клане");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/clanminerbuy",
		description: "Купить майнер для клана"
	},
	{ // /clan
		regexp: /^\/safe/i,
		f: function (params, msg) {
			if (!profiles[msg.user_id].safe) {
				msg.send("У тебя нет сейфа");
			} else {
				msg.send("В вашем сейфе " + profiles[msg.user_id].safe.money + " 💊");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/safe",
		description: "Количество денег в сейфе"
	},
	{ // /clan
		regexp: /^\/safebuy/i,
		f: function (params, msg) {
			if (!profiles[msg.user_id].safe) {
				var user_balance = profiles[msg.user_id].balance;
				var price = 250000;
				if (user_balance > price) {
					profiles[msg.user_id].balance = user_balance - price;
					profiles[msg.user_id].safe = {
						money: 0
					};
					msg.send("Вы купили сейф!\nС вашего баланса снято " + price + " 💊");
					update_profiles();
				} else {
					msg.send("У вас недостаточно 💊 для покупки сейфа");
				}
			} else {
				msg.send("У вас уже есть сейф!");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/safebuy",
		description: "Купить сейф"
	},
	{ // /clan
		regexp: /^\/safewithdraw(?:\s(.*))?/i,
		f: function (params, msg) {
			if (profiles[msg.user_id].safe) {
				if (params[1]) {
					var safe_balance = profiles[msg.user_id].safe.money;
					if (safe_balance > 300000) {
						var int = parseInt(params[1]);
						if (int && int > 0) {
							if (int <= safe_balance) {
								profiles[msg.user_id].balance += int;
								profiles[msg.user_id].safe.money -= int;
								msg.send("Вы вывели из сейфа " + int + " 💊");
								update_profiles();
							} else {
								msg.send("У тебя нет столько 💊 в сейфе");
							}
						} else {
							msg.send("Неправильно указано количество 💊");
						}
					} else {
						msg.send("Вывести деньги из сейфа можно только если в сейфе больше 300.000 💊");
					}
				} else {
					msg.send("Укажите количество 💊, которые надо вывести");
				}
			} else {
				msg.send("У вас нет сейфа");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/safewithdraw",
		description: "Вывод денег из сейфа"
	},
	{ // /clan
		regexp: /^\/bank/i,
		f: function (params, msg) {
			if (bank[msg.user_id]) {
				msg.send("На вашем счету в банке: " + bank[msg.user_id].balance + " 💊");
			} else {
				msg.send("Вам нужно открыть вклад с помощью команды /bankcreate");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/bank",
		description: "Ваш счет в банке"
	},
	{ // /clan
		regexp: /^\/bankcreate/i,
		f: function (params, msg) {
			if (!bank[msg.user_id]) {
				bank[msg.user_id] = {
					balance: 0
				};
				msg.send("Ваш вклад открыт, вы можете внести депозит с помощью команыды /bankdeposit");
				update_bank();
			} else {
				msg.send("У вас уже открыт вклад,вы можете внести депозит с помощью команыды /bankdeposit");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/bankcreate",
		description: "Открыть вклад банка"
	},
	{ // /clan
		regexp: /^\/bankdeposit(?:\s(.*))?/i,
		f: function (params, msg) {
			if (bank[msg.user_id]) {
				if (params[1]) {
					var int = parseInt(params[1]);
					if (int && int > 0) {
						if (int >= 100000) {
							var balance = profiles[msg.user_id].balance;
							if (int <= balance) {
								bank[msg.user_id].balance += int;
								profiles[msg.user_id].balance -= int;
								msg.send("Вы внесли в банк " + int + " 💊");
								update_bank();
								update_profiles();
							} else {
								msg.send("У тебя столько нету лол");
							}
						} else {
							msg.send("Минимальный депозит в банк: 100.000 💊");
						}
					}
				} else {
					msg.send("Укажите количество 💊 которые хотите вложить в банк");
				}
			} else {
				msg.send("Вам нужно открыть вклад с помощью команды /bankcreate");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/bankdeposit",
		description: "Внести депозит в банк"
	},
	{ // /clan
		regexp: /^\/bankwithdraw(?:\s(.*))?/i,
		f: function (params, msg) {
			if (bank[msg.user_id]) {
				if (params[1]) {
					var int = parseInt(params[1]);
					if (int && int > 0) {
						var balance = bank[msg.user_id].balance;
						if (int <= balance) {
							bank[msg.user_id].balance -= int;
							profiles[msg.user_id].balance += int;
							msg.send("Вы списали со счета банка " + int + " 💊");
							update_bank();
							update_profiles();
						} else {
							msg.send("Ахуел чтоли у тебя столько нету");
						}
					}
				} else {
					msg.send("Укажите количество 💊 которые хотите вложить в банк");
				}
			} else {
				msg.send("Вам нужно открыть вклад с помощью команды /bankcreate");
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/bankwithdraw",
		description: "Списать средства со счета в банке"
	},
	{ // /clan
		regexp: /^\/devil/i,
		f: function (params, msg) {
			if (!daily[msg.user_id] || daily[msg.user_id] && !daily[msg.user_id].money) {
				profiles[msg.user_id].balance += 500000;
				if (!daily[msg.user_id]) daily[msg.user_id] = {};
				daily[msg.user_id].money = true;
				msg.send("LuciQ выдал тебе 500000 💊");
				update_profiles();
				update_daily();
			} else {
				msg.send("Ты уже получил свой бонус на сегодня");
			}
		},
		level: 5,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/devil",
		description: "Получить 500000 💊"
	},
	{ // /clan
		regexp: /^\/getcoins/i,
		f: function (params, msg) {
			if (!daily[msg.user_id] || daily[msg.user_id] && !daily[msg.user_id].money) {
				profiles[msg.user_id].balance += 50000;
				if (!daily[msg.user_id]) daily[msg.user_id] = {};
				daily[msg.user_id].money = true;
				msg.send("Вам на счет зачислено 50.000 💊");
				update_profiles();
				update_daily();
			} else {
				msg.send("Ты уже получил свой бонус на сегодня");
			}
		},
		level: 4,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/getcoins",
		description: "Получить 50к 💊"
	},
	{ // /clan
		regexp: /^\/trade(?:\s([0-9]+)\s([0-9]+))/i,
		f: function (params, msg) {
			if (!daily[msg.user_id]) daily[msg.user_id] = {};
			if (!daily[msg.user_id].transfer) daily[msg.user_id].transfer = 0;
			if (daily[msg.user_id].transfer <= 5000) {
				var to_id = parseInt(params[1]);
				var money_count = parseInt(params[2]);
				var transfered = daily[msg.user_id].transfer;
				if (money_count <= 5000 - transfered) {
					profiles[msg.user_id].balance -= money_count;
					profiles[to_id].balance += money_count;
					daily[msg.user_id].transfer += money_count;
					msg.send("Вы передали пользователю " + to_id + " " + money_count + " 💊");
					update_profiles();
					update_daily();
				} else {
					msg.send("Вы можете передавать только 5000 💊 в день. На сегодня у вас осталось для передачи " + (5000 - transfered) + " 💊");
				}
			} else {
				msg.send("Передать можно максимум 5000 💊 за день");
			}
		},
		level: 4,
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/trade [ид юзера] [количество 💊]",
		description: "передать пилюли юзеру"
	},
	{ // звалка
		regexp: /т(?:ян)?\s(поиск|возраст|город)(?:\s(.*))?/i,
		need_ui: 1,
		f: function (params, msg) {
			switch (params[1].toLowerCase()) {
				case "поиск":
					if (!data.ships[msg.user_id] || !data.ships[msg.user_id].city || !data.ships[msg.user_id].from) {
						msg.send("Установи город и возраст долбаеб");
					} else {
						var search = function () {
							var names = ["Агата", "Агния", "Аделина", "Аида", "Аксинья", "Александра", "Алена", "Алина", "Алиса", "Алия", "Алла", "Альбина", "Амелия", "Амина", "Анастасия", "Ангелина", "Анна", "Антонина", "Ариана", "Арина", "Валентина", "Валерия", "Варвара", "Василина", "Василиса", "Вера", "Вероника", "Виктория", "Виолетта", "Владислава", "Галина", "Дарина", "Дарья", "Диана", "Дина", "Ева", "Евангелина", "Евгения", "Екатерина", "Елена", "Елизавета", "Есения", "Жанна", "Зарина", "Злата", "Илона", "Инна", "Ирина", "Камилла", "Карина", "Каролина", "Кира", "Клавдия", "Кристина", "Ксения", "Лариса", "Лейла", "Лиана", "Лидия", "Лилия", "Лина", "Лия", "Любовь", "Людмила", "Майя", "Маргарита", "Марианна", "Марина", "Мария", "Мелания", "Мила", "Милана", "Милена", "Мирослава", "Надежда", "Наталья", "Нелли", "Ника", "Нина", "Оксана", "Олеся", "Ольга", "Полина", "Регина", "Сабина", "Светлана", "София", "Стефания", "Таисия", "Тамара", "Татьяна", "Ульяна", "Эвелина", "Элина", "Эльвира", "Эльмира", "Эмилия", "Юлия", "Яна", "Ярослава"];
							var offset = getRandomInt(0, 999);
							var name = names.random();
							vk.users.search({
								sex: 1,
								count: 1,
								offset: offset,
								fields: "photo,bdate,photo_id,last_seen",
								has_photo: 1,
								country: 1,
								sort: getRandomInt(0, 1),
								city: data.ships[msg.user_id].city,
								age_from: data.ships[msg.user_id].from,
								age_to: data.ships[msg.user_id].to,
								status: [1, 6].random()
							}).then(r => {
								if (!r.items.length) {
									search();
								} else {
									var last_seen = r.items[0].last_seen.time;
									var date_now = parseInt(Date.now() / 1000);
									if (date_now - last_seen < 86400) {
										var name = r.items[0].first_name + " " + r.items[0].last_name;
										var id = r.items[0].id;
										var photo_id = r.items[0].photo_id;
										request.get("https://vk.com/foaf.php?id=" + id, (e, r, b) => {
											var reg_date = new Date(b.match(/<ya:created dc:date=\"(.*)\"\/>/)[1]);
											var formatted_date = reg_date.getDate() + " " + getMonth(reg_date.getMonth()) + ", " + (reg_date.getYear() + 1900);
											msg.send(name + "\nvk.com/id" + id + "\nДата регистрации: " + formatted_date, {
												attachment: "photo" + photo_id
											});
										});
									} else {
										search();
									}
								}
							});
						};
						search();
					}
					break;
				case "возраст":
					var ages = params[2].split(/(?:\s)?-(?:\s)?/);
					if (!data.ships[msg.user_id]) data.ships[msg.user_id] = {};
					data.ships[msg.user_id].from = ages[0];
					data.ships[msg.user_id].to = ages[1];
					msg.send("Возраст: от " + ages[0] + " до " + ages[1]);
					save_ships();
					break;
				case "город":
					vk.database.getCities({
						country_id: 1,
						count: 1,
						q: params[2]
					}).then(r => {
						console.log(r);
						if (r.items.length) {
							var city = r.items[0].id;
							if (!data.ships[msg.user_id]) data.ships[msg.user_id] = {};
							data.ships[msg.user_id].city = city;
							msg.send("Город: " + r.items[0].title);
							save_ships();
						} else {
							msg.send("Город не найден");
						}
					}).catch(console.log);
					break;
			}
		},
		per_day: [3, 3, 3, 3, 3, 3],
		info: "/тян",
		description: "поиск тян"
	},
	{    // список|топ
		regexp: /^\/(список|топ)\s(.*)/i,
		needfullmsg: 1,
		f: function (params, msg) {
			vk.messages.getChat({
				chat_id: msg.chat_id
			}).then((a) => {
				var rand = getRandomInt(2, a.users.length);
				vk.users.get({
					user_ids: a.users.shuffle().get(rand).del(472930940).join(",")
				}).then((a) => {
					var p = params[1].toLowerCase();
					var users = a.map(b => b.first_name + " " + b.last_name);
					var list;
					if (p == "список") {
						list = "- " + users.join("\n- ");
					} else {
						list = users.numeric("\n");
					}
					msg.reply(p.ucfirst() + " " + params[2] + ":\n" + list);
				});
			});
		},
		info: "/список дебилов",
		description: "Рандом"
	},
	{    // /рифма
		regexp: /^\/рифма\s(.*)/i,
		f: function (params, msg) {
			request.get("http://rifma-online.ru/rifma/" + encodeURIComponent(params[1].replace(/\s/g, "")), function (e, r, b) {
				msg.send(parse(b, '<ul id="result" class="clearfix">', "</ul>").split("\n").replace(/^\s+/, "").del("", 1).join(", "));
			});
		},
		info: "/рифма [слово]",
		description: "Рифма",
	},
	{    // /синоним
		regexp: /^\/синоним\s([А-я]+)/i,
		f: function (params, msg) {
			//console.log("http://synonymonline.ru/"+params[1][0].toUpperCase()+"/"+params[1].replace(/\s/g, "").toLowerCase());
			request.get("http://synonymonline.ru/" + encodeURIComponent(params[1][0].toUpperCase()) + "/" + encodeURIComponent(params[1].replace(/\s/g, "").toLowerCase()), function (e, r, b) {
				if (b.match(/synonyms-list/)) {
					msg.send(parse(b, '<ol class="synonyms-list">', "</ol>").split("\n").replace(/^\s+/, "").del("", 1).join(", "));
				} else {
					msg.send("Синонимов к этому слову нету.");
				}
			});
		},
		info: "/синоним [слово]",
		description: "Синоним к слову",
	},
	{    // капча
		regexp: /^\/(?:капча$|captcha$)|(?:капча|captcha)\s(.*)/i,
		needfullmsg: 1,
		f: function (params, msg) {
			console.log(params[1])
			if (!params[1]) {
				console.log("хуй")
				if (data.captcha.photo !== 0) {
					msg.send("Введи капчу с картинки (Пример: /капча ds3hg)", {
						attachment: data.captcha.photo
					});
				} else {
					msg.send("Капчи нету, приходи когда будет");
				}
			} else if (params[1] && data.captcha.photo == 0) {
				msg.send("Капчи или нету, или кто-то уже ввел её за тебя");
			} else {
				console.log("член", data.captcha.sid)
				vk.messages.send({
					user_id: 308918137,
					message: [1, 2, 3, 4, 5, 6].random(),
					captcha_sid: data.captcha.sid,
					captcha_key: params[1]
				}).then(function (a) {
					console.log(a)
					if (typeof a == "number") {
						msg.send(["Спасибо, ты помог мне)", "Фух, спасибо", "Благодарю!"].random())
						data.captcha.sid = 0;
						data.captcha.photo = 0;
					} else {
						msg.send("Неправильно(")
					}
				}).catch(a => {
					console.log(a)
					msg.send("Неправильно(")
				})
			}
		},
		//info: "Unmuteall",
		//description: "Unmute"
	},
	{    // /пидор дня
		regexp: /^\/([A-zА-я0-9]+)\sдня$/i,
		f: function (params, msg) {
			if (msg.chat_id) {
				msg.getChat().then((a) => {
					var user = a.users.random();
					vk.users.get({
						user_id: user
					}).then((u) => {
						var string = params[1] + " дня - " + u[0].first_name + " " + u[0].last_name;
						msg.send(string.ucfirst()).then((id) => {
							vk("messages.pin", {
								peer_id: msg.peer_id,
								message_id: id
							});
						});
					});
				});
			}
		},
		info: "/пидор дня",
		description: "Пидор дня"
	},
	{    // /cstat
		regexp: /\/cstat/i,
		f: function (params, msg) {
			if (msg.chat_id) {
				if (!data.temp.analyse[msg.chat_id]) {
					data.temp.analyse[msg.chat_id] = true;
					var get = function (offset, obj) {
						if (!obj) obj = {
							data: {}
						};
						vk.messages.getHistory({
							peer_id: msg.peer_id,
							count: 200
						}).then((r) => {
							r.items.forEach((a) => {
								if (!obj.data[a.user_id]) obj.data[a.user_id] = {
									count: 0
								};
								obj.data[a.user_id].count++;
							});
							if (offset < 1000) {
								get(offset + 200, obj);
							} else {
								var users = Object.entries(obj.data).sort((a, b) => b[1].count - a[1].count).map((a) => a[0]);
								vk.users.get({
									user_ids: users.join(",")
								}).then((u) => {
									var objs = Object.entries(obj.data).sort((a, b) => b[1].count - a[1].count).map((a, i) => {
										a[0] = u[i].first_name + " " + u[i].last_name;
										return a;
									});
									msg.send("Статистика активности за последние 1000 сообщений:\n" + objs.map(a => a[0] + " - " + a[1].count).numeric("\n"));
									setTimeout(() => delete data.temp.analyse[msg.chat_id], 5000);
								});
							}
						});
					};
					get(0);
				}
			} else {
				msg.send("Статистика доступна только для бесед");
			}
		},
		info: "/cstat",
		description: "Статистика активности чата"
	},
	{    // /caselist
		regexp: /^\/caselist$/i,
		f: function (params, msg) {
			var caselist = cases.map((e, i) => {
				return "• " + e.name + " | id: " + (i + 1);
			});
			msg.send(caselist.join("\n"));
		},
		info: "/caselist",
		description: "caselist"
	},
	{    // /caseopen
		regexp: /^\/caseopen\s([0-9]+)$/i,
		f: function (params, msg) {
			var case_id = (parseInt(params[1]) - 1);
			if (cases[case_id]) {
				var casename = cases[case_id].name;
				var caseloot = cases[case_id].loot.sort((a, b) => {
					return getCaseRarity(a.rarity).id - getCaseRarity(b.rarity).id;
				}).map((e, i) => {
					var allias, item;
					var rarity = e.rarity.ucfirst();
					switch (e.type) {
						case "miner":
							allias = "Майнер";
							item = miner_config[e.items.miner_id - 1].allias;
							break;
						case "privilege":
							allias = "Привелегия";
							item = e.items.group;
							break;
						case "btc":
							allias = "Пилюли";
							item = e.items.btc_count;
							break;
					}
					return "• " + allias + " - " + item + " | " + rarity;
				});
				msg.send("-> " + casename + "\n" + caseloot.join("\n "));
			} else {
				msg.send("Такого кейса нет");
			}
		},
		info: "/caselist",
		description: "caselist"
	},
	{    // /addkey
		regexp: /^\/addkey\s([0-9]+)\s([0-9]+)\s(([0-9]+))?/i,
		f: function (params, msg) {
			new Promise((resolve, reject) => {
				if (params[2]) {
					if (params[3]) {
						resolve(params[3]);
					} else if (msg.data[7].fwd) {
						msg.get().then((m) => {
							resolve(m.fwd_messages[0].user_id);
						});
					} else {
						reject({
							error: "Вы не выбрали пользователя"
						});
					}
				} else {
					reject({
						error: "Вы не указали количество ключей"
					});
				}
			}).then((user_id) => {
				var case_id = (parseInt(params[1]) - 1);
				if (cases[case_id]) {
					if (!cases_keys[user_id]) cases_keys[user_id] = {};
					if (!cases_keys[user_id][case_id]) cases_keys[user_id][case_id] = 0;
					cases_keys[user_id][case_id] += parseInt(params[2]);
					msg.send("Пользователю " + user_id + " выдан ключ для кейса \"" + cases[case_id].name + "\"");
					update_cases();
				} else {
					msg.send("Такого кейса нет");
				}
			}).catch((e) => {
				msg.send(e.error);
			});
		},
		admin: 1,
		info: "/addkey",
		description: "addkey"
	},
	{    // /translator
		regexp: /^\/прон/i,
		f: function (params, msg) {
			var get = function () {
				vk.wall.get({
					owner_id: -109431192,
					offset: getRandomInt(0, 25000),
					count: 1
				}).then((r) => {
					if (r.items[0].attachments && r.items[0].attachments[0].photo) {
						var url = VK.getAttachmentUrl(r.items[0].attachments[0].photo);
						downToBuf(url).then((buffer) => {
							msg.sendPhoto({
								buffer: buffer
							});
						});
					} else {
						get();
					}
				});
			};
			get();
		},
		group_only: 1
		//info: "/config",
		//description: "config edit"
	},
	{    // /addkey
		regexp: /^\/casekey\s([0-9]+)/i,
		f: function (params, msg) {
			if (!profiles[msg.user_id]) {
				msg.send("Для корректной работы вам нужно сначала создать профиль, для этого введите /create")
			} else {
				var case_id = (parseInt(params[1]) - 1);
				if (cases_keys[msg.user_id] && cases_keys[msg.user_id][case_id]) {
					cases_keys[msg.user_id][case_id]--;
					var rand = getRandomFloat(0, 1);
					var loot = cases[case_id].loot.map((e) => {
						e.chance = getCaseRarity(e.rarity).chance;
						return e;
					}).filter((e) => rand < e.chance);
					var win_item = loot.random();
					var rarity = win_item.rarity;
					switch (win_item.type) {
						case "miner":
							var miner_id = (win_item.items.miner_id - 1);
							var item = miner_config[miner_id].allias;
							var allias;
							if (win_item.allias) {
								allias = win_item.allias;
							} else {
								allias = item;
							}
							if (!miner_profiles[msg.user_id]) miner_profiles[msg.user_id] = [];
							miner_profiles[msg.user_id].push({
								name: item,
								per_hour: miner_config[miner_id].per_hour,
								ended: true
							});
							msg.send("Вам выпадает " + allias + "!");
							update_miners();
							break;
						case "privilege":
							var item = win_item.items.group;
							var allias;
							if (win_item.allias) {
								allias = win_item.allias;
							} else {
								allias = item;
							}
							if (!usergroups[item].includes(msg.user_id)) {
								usergroups[item].push(msg.user_id);
								msg.send("Вам выпадает привелегия " + allias + "!");
								update_usergroups();
							} else {
								profiles[msg.user_id].balance += win_item.items.btc_count;
								msg.send("Вам выпадает привелегия " + allias + "!\nУ вас уже есть данная привелегия, вместо неё на ваш баланс зачислено " + e.items.btc_count + " 💊");
								update_profiles();
							}
							break;
						case "btc":
							var allias;
							if (win_item.allias) {
								allias = win_item.allias;
							} else {
								allias = "Пилюли";
							}
							var item = win_item.items.btc_count;
							profiles[msg.user_id].balance += win_item.items.btc_count;
							msg.send("Вам выпадает " + allias + " 💊!");
							update_profiles();
							break;
					}
					update_cases();
					//console.log(rand, loot);
				} else {
					msg.send("У вас нет ключа для данного кейса");
				}
			}
		},
		info: "/casekey",
		description: "casekey"
	},
	{    // /caselist
		regexp: /^\/mykeys$/i,
		f: function (params, msg) {
			var user_keys = cases_keys[msg.user_id];
			var list = Object.entries(user_keys).filter((a) => a[1] > 0).map((a) => {
				return cases[a[0]].name + " - " + a[1] + " " + declOfNum(a[1], "ключ", "ключа", "ключей");
			});
			msg.send(list.join("\n"));
		},
		info: "/mykeys",
		description: "mykeys"
	},
	{    // /setbalance
		regexp: /^\/setbalance\s([0-9]+)(?:\s([0-9]+))?$/i,
		f: function (params, msg) {
			new Promise((resolve, reject) => {
				if (msg.data[7].fwd) {
					msg.get().then((m) => {
						resolve(m.fwd_messages[0].user_id);
					})
				} else {
					resolve(params[2]);
				}
			}).then((id) => {
				profiles[id].balance = parseInt(params[1]);
				msg.send("Баланс пользователя " + id + " установлен на " + params[1]);
			});
		},
		admin: 1,
		info: "/setbalance",
		description: "setbalance"
	},
	{    // /трейд
		regexp: /^\/трейд\s(вверх|вниз)\s([0-9]+)$/i,
		f: function (params, msg) {
			var bet_count = parseInt(params[2]);
			if (bet_count > 0) {
				var user_balance = profiles[msg.user_id].balance;
				if (user_balance >= bet_count) {
					if (bet_count > 500 && bet_count < 5000001) {
						var rand_int = getRandomInt(0, 1); // 0 - down, 1 - up
						var user_choice_string = params[1].toLowerCase();
						var user_choice_int;
						if (user_choice_string == "вверх") {
							user_choice_int = 1;
						} else {
							user_choice_int = 0;
						}
						var scale_string = (rand_int == 1 ? "подорожал 📈" : "подешевел 📉");
						var botcoin_course = getRandomInt(0, 10000);
						if (user_choice_int == rand_int) {
							var botcoin_gain = Math.floor((bet_count / getRandomFloat(1.5, 3)));
							profiles[msg.user_id].balance += botcoin_gain;
							msg.send("📊 Курс " + scale_string + " на " + botcoin_course + " 💊,\n 💳 Вы заработали " + botcoin_gain + " 💊");
							rangUp(msg.user_id, bet_count / data.rang_coef);
							update_profiles();
						} else {
							profiles[msg.user_id].balance -= bet_count;
							msg.send("📊 Курс " + scale_string + " на " + botcoin_course + " 💊,\n 💳 Вы потеряли " + bet_count + " 💊");
							rangUp(msg.user_id, bet_count / data.rang_coef);
							update_profiles();
						}
					}
				} else {
					msg.send("У вас нет такого количества 💊");
				}
			} else {
				msg.send("Ставить можно только положительную сумму");
			}
		},
		//info: "/mykeys",
		//description: "mykeys"
	},
	/*{    // /кнб
		regexp: /^\/кнб\s(к|н|б)(?:[А-я]+)?\s([0-9]+)/i,
		f: function (params, msg) {
			var bet_count = parseInt(params[2]);
			if (bet_count) {
				var user_balance = profiles[msg.user_id].balance;
				if (user_balance >= bet_count) {
					var item = params[1].toLowerCase();
					var item_ids = ["к", "н", "б"];
					var item_names = ["Камень", "Ножницы", "Бумага"];
					var id = item_ids.indexOf(item);
					if (id > -1) {
						var apponent_item = [0, 1, 2].random();
						if (id == apponent_item) {
							var item_name = item_names[id];
							profiles[msg.user_id].balance += bet_count;
							rangUp(msg.user_id, bet_count / data.rang_coef);
							msg.send(item_name + " VS " + item_name + "\nНичья!");
						} else if (sps_compare(id, apponent_item)) {
							var apponent_item_name = item_names[apponent_item];
							var user_item_name = item_names[id];
							profiles[msg.user_id].balance += bet_count;
							rangUp(msg.user_id, bet_count / data.rang_coef);
							msg.send(user_item_name + " VS " + apponent_item_name + "\nВы выиграли!\nВам зачислено: " + bet_count + " 💊");
							update_profiles();
						} else {
							var apponent_item_name = item_names[apponent_item];
							var user_item_name = item_names[id];
							profiles[msg.user_id].balance -= bet_count;
							rangUp(msg.user_id, bet_count / data.rang_coef);
							msg.send(user_item_name + " VS " + apponent_item_name + "\nВы проиграли!\nС вас списано: " + bet_count + " 💊");
							update_profiles();
						}
					} else {
						msg.send("Можно поставить только камень ножницы или бумагу");
					}
				} else {
					msg.send("У вас недостаточно средств на счету");
				}
			} else {
				msg.send("Ставку нормальную сделай");
			}
		},
		//info: "/mykeys",
		//description: "mykeys"
	},*/
	{    // /кнб
		regexp: /^\/наперстки\s(старт|[1-3])(?:\s([0-9]+))?/i,
		f: function (params, msg) {
			/* var emoji = {
				1: "⃣",
				2: "⃣",
				3: "⃣",
				4: "⃣",
				5: "⃣",
				6: "⃣",
				7: "⃣",
				8: "⃣",
				9: "⃣",
				0: "⃣"
			} */
			var bet_count = parseInt(params[2]) || 100;
			var user_balance = profiles[msg.user_id].balance;
			if (!data.lobbies.thimbles[msg.user_id]) {
				if (user_balance >= bet_count) {
					data.lobbies.thimbles[msg.user_id] = {
						array: [1, 0, 0].shuffle(),
						bet_count: bet_count
					};
					profiles[msg.user_id].balance -= bet_count;
					msg.send("🎩 🎩 🎩\n[ 1 ][ 2 ][ 3 ]\n• С вашего баланса снято " + bet_count + " 💊"); //
					update_profiles();
				} else {
					msg.send("У вас недостаточно средств на счету");
				}
			} else {
				var int = parseInt(params[1]);
				if (int && int >= 1 && int <= 3) {
					var lobbie = data.lobbies.thimbles[msg.user_id];
					var prises = lobbie.array.map((a) => a == 1 ? "💰" : "💣").join(" ");
					delete data.lobbies.thimbles[msg.user_id];
					if (lobbie.array[int - 1] == 1) {
						var win_count = lobbie.bet_count * 2;
						msg.send("🎩 🎩 🎩\n" + prises + "\n[ 1 ][ 2 ][ 3 ]\n• Вы выиграли! На ваш баланс зачислено " + win_count + " 💊");
						update_profiles();
					} else {
						msg.send("🎩 🎩 🎩\n" + prises + "\n[ 1 ][ 2 ][ 3 ]\n• Вы проиграли!");
					}
				} else {
					msg.send("Выбери номер от 1 до 3!");
				}
			}
		},
		//info: "/mykeys",
		//description: "mykeys"
	},
	{    // /трейд
		regexp: /^\/сапер\s([0-9]+)$/i,
		f: function (params, msg) {
			if (!data.lobbies.sapper[msg.user_id]) {
				var bet_count = parseInt(params[1]);
				if (bet_count > 0) {
					var user_balance = profiles[msg.user_id].balance;
					if (user_balance >= bet_count) {
						if (bet_count > 500 && bet_count < 5000001) {
							vk.users.get({
								user_id: msg.user_id
							}).then((u) => {
								var name = u[0].first_name;
								profiles[msg.user_id].balance -= bet_count;
								data.lobbies.sapper[msg.user_id] = {
									bet: bet_count,
									lvl: 1,
									factor: 1.0,
									mines: [1, 0, 0].shuffle(),
									username: name
								};
								msg.send("Игра создана! Теперь вводите цифры от 1 до 3 чтобы выбрать клетку.");
							});
						} else {
							msg.send("Ваша ставка слишком маленькая или слишком высокая!\nСтавки можно делать от 500 💊 до 5000000");
						}
					} else {
						msg.send("Ты дебил, у тебя нет столько");
					}
				} else {
					msg.send("Ага не наебешь");
				}
			} else {
				var int = parseInt(params[1]);
				if (int > 0 && int < 4) {
					var bool = data.lobbies.sapper[msg.user_id].mines[int - 1] == 1;
					if (bool) {
						var bet_count = data.lobbies.sapper[msg.user_id].bet;
						msg.send("Вы попали на мину💥, ваша ставка аннулируется");
						delete data.lobbies.sapper[msg.user_id];
						rangUp(msg.user_id, bet_count / data.rang_coef);
						update_profiles();
					} else {
						data.lobbies.sapper[msg.user_id].lvl++;
						data.lobbies.sapper[msg.user_id].factor += 0.5;

						var session_lvl = data.lobbies.sapper[msg.user_id].lvl;
						var factor = data.lobbies.sapper[msg.user_id].factor.toFixed(1);
						var bet_count = data.lobbies.sapper[msg.user_id].bet;

						if (session_lvl >= 3) data.lobbies.sapper[msg.user_id].mines = [1, 1, 0];
						data.lobbies.sapper[msg.user_id].mines.shuffle();

						if (session_lvl <= 5) {
							msg.send("Вы угадали! Ставка умножается на x" + factor + " (" + bet_count * factor + " btc)");
						} else {
							msg.send("Вы угадали! Ставка умножается на x" + factor + " (" + bet_count * factor + " btc)\nВы прошли все минное поле! 💊 Пилюли зачислены вам на баланс!");
							profiles[msg.user_id].balance += (bet_count * factor);
							delete data.lobbies.sapper[msg.user_id];
							rangUp(msg.user_id, bet_count / data.rang_coef);
							update_profiles();
						}
					}
				} else {
					msg.send("Вводить можно только цифры от 1 до 3!");
				}
			}
		},
		//info: "/mykeys",
		//description: "mykeys"
	},
	{    // /трейд
		regexp: /^\/marriage(?:\s([0-9]+$|(accept)\s([0-9]+)))?/i,
		f: function (params, msg) {
			console.log(params[2], profiles[msg.user_id].marriage)
			if (params[2] && params[2].toLowerCase() == "accept" && profiles[msg.user_id] && profiles[msg.user_id].marriage) {
				if (profiles[msg.user_id].marriage.pool) {
					var index = (parseInt(params[3]) - 1);
					var accept_user_id = profiles[msg.user_id].marriage.pool[index];
					if (profiles[accept_user_id].balance >= 250000 && profiles[msg.user_id].balance >= 250000) {
						profiles[accept_user_id].balance -= 250000;
						profiles[msg.user_id].balance -= 250000;
						vk.users.get({
							user_ids: accept_user_id + "," + msg.user_id,
							fields: "sex"
						}).then((users) => {
							var accept_user_data = {
								id: users[0].id,
								name: users[0].first_name + " " + users[0].last_name,
								sex: users[0].sex,
							};
							var main_user_data = {
								id: users[1].id,
								name: users[1].first_name + " " + users[1].last_name,
								sex: users[1].sex,
							};
							profiles[msg.user_id].marriage = {
								spouse: accept_user_data
							};
							profiles[accept_user_id].marriage = {
								spouse: main_user_data
							};
							msg.send("Вы долбоеб и теперь в браке");
							update_profiles();
						});
					} else {
						if (profiles[accept_user_id].balance < 250000) {
							msg.send("У пользователя нет нужной суммы на балансе (250.000💊)");
						} else {
							msg.send("У вас нет нужной суммы на балансе (250.000💊)");
						}
					}
				} else {
					msg.send("У вас нет заявок на брак, или вы уже состоите в браке.");
				}
			} else if (params[1]) {
				var offer_user_id = parseInt(params[1]);
				var user_balance = profiles[msg.user_id].balance;
				var offer_user_balance = profiles[offer_user_id].balance;
				if (profiles[offer_user_id] && profiles[offer_user_id].marriage && profiles[offer_user_id].marriage.spouse) {
					msg.send("Пользователь уже состоит в браке");
				} else {
					if (user_balance >= 250000 && offer_user_balance >= 250000) {
						if (!profiles[offer_user_id].marriage) profiles[offer_user_id].marriage = {
							pool: []
						};
						if (profiles[offer_user_id].marriage.pool.includes(msg.user_id)) {
							msg.send("Вы уже послали запрос на брак этому пользователю.");
						} else {
							profiles[offer_user_id].marriage.pool.push(msg.user_id);
							msg.send("Пользователю отправлен запрос на брак.\nЧтобы посмотреть запросы, введите /marriage");
							update_profiles();
						}
					} else {
						if (user_balance < 250000) {
							msg.send("У вас нет нужной суммы на балансе (250.000💊)");
						} else {
							msg.send("У выбранного пользователя нет нужной суммы на балансе (250.000💊)");
						}
					}
				}
			} else {
				if (profiles[msg.user_id] && profiles[msg.user_id].marriage) {
					if (profiles[msg.user_id].marriage.pool) {
						var user_list = profiles[msg.user_id].marriage.pool.join(",");
						vk.users.get({
							user_ids: user_list
						}).then((users) => {
							var list = users.map((e) => "[id" + e.id + "|" + e.first_name + " " + e.last_name + "]");
							console.log(list);
							msg.send(list.numeric("\n"));
						});
					} else {
						msg.send("У вас нет заявок, либо вы уже в браке.");
					}
				} else {
					msg.send("У вас нет заявок на брак.");
				}
			}
		},
		//info: "/mykeys",
		//description: "mykeys"
	},
	/* {    // /hit
		regexp: /\/hit\s(.*)/i,
		f: function(params, msg) {
			cmds.some((a, i) => {
				if(params[1].match(a.regexp)) {
					msg.send(a.regexp.toString());
					return true;
				}
			});
		},
		//info:"/фото | /музыка",
		//description:"Ищет фото, музыку"
	}, */
];

setInterval(() => {
	var arr = Object.entries(miner_profiles).map(a => {
		a[1] = a[1].filter(a => a.ended);
		return a;
	}).filter(a => a[1].length);
	arr.forEach(a => {
		var summ = 0;
		var id = a[0];
		a[1].forEach(b => {
			summ += b.per_hour;
		});
		if (profiles[id]) profiles[id].balance = parseInt(profiles[id].balance + (summ / arr.length));
		if (!miner_stats[id]) miner_stats[id] = 0;
		miner_stats[id] += (summ / arr.length);
	});
	update_profiles();
	update_miners();
}, 60000 * 60);

setInterval(() => {
	var clans_with_miners = Object.entries(clans.base).filter(a => a[1].miners);
	var coef = Object.entries(miner_profiles).map(a => {
		a[1] = a[1].filter(a => a.ended);
		return a;
	}).filter(a => a[1].length).length;
	if (coef == 0) coef = 1;
	clans_with_miners.forEach(clan => {
		clan_id = clan[0];
		clan_data = clan[1];
		var summ = 0;
		clan_data.miners.forEach(m => {
			summ += Math.floor(m.per_hour / coef);
		});
		summ = summ / clan_data.users.length;
		clan_data.users.forEach(u => {
			profiles[u].balance += summ;
		});
	});
	update_profiles();
}, 60000 * 60 * 6); //

Array.prototype.toUnique = function () {
	var arr = [];
	this.map(function (x) {
		if (!arr.inArray(x)) {
			arr.push(x);
		}
	});
	return arr;
};

setInterval(() => {
	vk.messages.getDialogs({
		unread: 1,
		count: 1
	}).then(f => {
		var count = f.count;
		vk.messages.getDialogs({
			unread: 1,
			count: 100,
			offset: getRandomInt(0, count)
		}).then(r => {
			r.items.forEach(e => {
				if (e.unread >= 5000 && e.message.chat_id) {
					vk.messages.removeChatUser({
						chat_id: e.message.chat_id,
						user_id: data.me.id
					}).then(e => e).catch(e => e);
				}
			});
		});
	});
}, 60000);

cmds.map(function (a) {
	a.counter = 0;
	if (a.info && !commands_info[a.info.split(" ")[0]]) {
		commands_info[a.info.split(" ")[0]] = {};
	} else if (!a.per_day) {
		a.per_day = [-1, -1, -1, -1, -1, -1];
	}
	update_ci();
});

var date = new Date();
var month = (date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()).toString();
var day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()).toString();
var restart_time = (86400 - new Date("1970-01-01T" + timeStamp() + "Z") / 1000) * 1000 + 10;
//console.log("Обнуление комнад через "+(restart_time/1000).toString().toHHMMSS()
var daily_daemon = function () {
	console.log("Обнуление daily через " + (restart_time / 1000).toString().toHHMMSS());
	setTimeout(() => {
		// -- обнуление daily
		daily = {};
		update_daily();
		daily_daemon();
	}, restart_time);
};
daily_daemon();

var cdaemon = function () {
	setTimeout(function () {
		// обнулние команд
		var obj = {};
		cmds.map(function (a, i) {
			if (a.info) obj[a.info.split(" ")[0]] = {};
		});
		commands_info = obj;
		fs.writeFile("./commands_info.json", JSON.stringify(obj, null, "  "));
		cdaemon();
	}, 30000);
};
cdaemon();

var restart_bank = (86400 - new Date("1970-01-01T" + timeStamp() + "Z") / 1000) * 1000 + 10;
var banktime = function () {
	setTimeout(function () {
		// -- банк --
		var data = Object.entries(bank);
		data.forEach(d => {
			var user_id = d[0];
			var bank_data = d[1];
			bank[user_id].balance += bank[user_id].balance / 100 * 1.5;
		});
		update_bank();

	}, restart_bank);
};
banktime();

setInterval(function () {
	vk.friends.getRequests({}).then(function (a) {
		if (a.items.length > 0) {
			vk.friends.add({
				user_id: a.items[0]
			});
		}
	});
	vk.friends.getRequests({
		out: 1
	}).then(function (a) {
		if (a.items.length > 0) {
			vk.friends.delete({
				user_id: a.items[0]
			});
		}
	});
}, 60000);

function update_usergroups() {
	fs.writeFileSync("./usergroups.json", JSON.stringify(usergroups, null, "\t"));
	return 1;
}

function update_cases() {
	fs.writeFileSync("./keys_db.json", JSON.stringify(cases_keys, 4, " "));
	return 1;
}

function update_profiles() {
	fs.writeFileSync("./profiles.json", JSON.stringify(profiles, null, "\t"));
	return 1;
}

function save_ships() {
	fs.writeFile("./bot/data/ships.json", JSON.stringify(data.ships, 4, " "), () => { });
}

function update_bank() {
	fs.writeFileSync("./bank.json", JSON.stringify(bank, null, "\t"));
}

function update_daily() {
	fs.writeFileSync("./daily.json", JSON.stringify(daily, null, "\t"));
}

function getCaseRarity(string) {
	switch (string.toLowerCase()) {
		case "common": return { id: 1, chance: 1.0 };
		case "uncommon": return { id: 2, chance: 0.8 };
		case "rare": return { id: 3, chance: 0.7 };
		case "mythical": return { id: 4, chance: 0.5 };
		case "legendary": return { id: 5, chance: 0.2 };
		case "immortal": return { id: 6, chance: 0.1 };
		case "arcana": return { id: 7, chance: 0.05 };
		case "ancient": return { id: 8, chance: 0.03 };
	}
}

function twitcheck(search, msg) {
	request.get("https://api.twitch.tv/kraken/streams/" + encodeURIComponent(search) + "?token=gfa7566d7pc4noblnmn4c3ijqrkshm" + "&client_id=8k71hndkxueqmu80v0j04dq37n7wxl", function (error, response, body) {
		if (body.match(/game/i)) {
			var twitch = JSON.parse(body);
			request(twitch.stream.preview.template.replace("{width}", "1280").replace("{height}", "720")).pipe(fs.createWriteStream('./bot/data/twitch/' + twitch.stream._id + '.png')).on('close', function () {
				var rs = fs.createWriteStream('./bot/data/twitch/' + twitch.stream._id + '.png');
				msg.sendPhoto(rs, twitch.stream.channel.display_name + " - " + twitch.stream.viewers + " зрителей" + "\n" + "Игра: " + twitch.stream.game + "\n" + twitch.stream.channel.status + "\n" + twitch.stream.channel.url);
			});
		} else if (body.match(/"error"/i)) {
			msg.send("Пользователя с ником \"" + search + "\" не существует");
		} else {
			msg.send(search + " не стримит =(");
		}
	});
}

function update_promos() {
	fs.writeFileSync("./promos.json", JSON.stringify(promos, null, "\t"));
	return 1;
}

function getMonth(month) {
	var obj = {
		0: "Января",
		1: "Февраля",
		2: "Марта",
		3: "Апреля",
		4: "Мая",
		5: "Июня",
		6: "Июля",
		7: "Августа",
		8: "Сентября",
		9: "Октября",
		10: "Ноября",
		11: "Декабря"
	};
	return obj[month];
}

function update_promoused() {
	fs.writeFileSync("./promo_used.json", JSON.stringify(promo_used, null, "\t"));
	return 1;
}

function filter(text) {
	return text.toString().replace(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig, ' <LINK REMOVED> ');
}

function morze(word) {
	const abc = {
		'а': '.- ',
		'б': '-... ',
		'в': '.-- ',
		'г': '--. ',
		'д': '-.. ',
		'е': '. ',
		'ё': '. ',
		'ж': '--. ',
		'з': '-.. ',
		'и': '.. ',
		'й': '.. ',
		'к': '-.- ',
		'л': '.-.. ',
		'м': '-- ',
		'н': '-. ',
		'о': '--- ',
		'п': '.--. ',
		'р': '.-. ',
		'с': '... ',
		'т': '- ',
		'у': '..- ',
		'ф': '..-. ',
		'х': '.... ',
		'ц': '-.-. ',
		'ч': '---. ',
		'ш': '---- ',
		'щ': '--.- ',
		'ъ': '-..- ',
		'ы': '-.-- ',
		'ь': '-..- ',
		'э': '..-.. ',
		'ю': '..-- ',
		'я': '.-.- '
	};
	var replacer = function (a) {
		return abc[a] || a;
	};
	var text = word.replace(/[А-яёЁ]/g, replacer);
	return text;
}
setInterval(function () {
	vk.account.setOnline({});
}, 800000);
/*setInterval(function(){ // AutoSave system
fs.writeFileSync("users_spots.json", JSON.stringify(users_spots, null, "\t"))
fs.writeFileSync("users_acc.json", JSON.stringify(users_acc, null, "\t"))
}, 1000);*/

function dl(url, file, cb) {
	request.get(url).pipe(fs.createWriteStream(file)).on("close", cb);
}

var decodeHtmlEntity = function (str) {
	return str.replace(/&#(\d+);/g, function (match, dec) {
		return String.fromCharCode(dec);
	});
};

var encodeHtmlEntity = function (str) {
	var buf = [];
	for (var i = str.length - 1; i >= 0; i--) {
		buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
	}
	return buf.join('');
};

function filename(str) {
	a = str.split("/");
	return a[a.length - 1];
}

function levArray(str, array) {
	obj = [];
	array.map(function (w) {
		l = levenshtein.get(str, w);
		obj.push({
			w,
			l
		});
	});
	return obj.sort(function (a, b) {
		return a.l - b.l;
	});
}

function levArraySimilar(str, array) {
	var obj = [];
	array.map(function (w) {
		var per = similar_text(str, w);
		obj.push({
			w,
			per
		});
	});
	return obj.sort(function (a, b) {
		return b.per - a.per;
	});
}

function similar_text(str1, str2) {
	var len1 = str1.length;
	var len2 = str2.length;

	var max = Math.max(len1, len2);
	var i, j, similarity;
	similarity = i = j = 0;

	while ((i < len1) && (typeof str2[j] != 'undefined')) {
		if (str1[i] == str2[j]) {
			similarity++;
			i++;
			j++;
		} else if (len1 < len2) {
			len1++;
			j++;
		} else if (len1 > len2) {
			i++;
			len1--;
		} else {
			i++;
			j++;
		}
	}
	return Math.round(similarity / max * 100);
}


function delFromObj(obj, str) {
	var leng = str.split(",");
	for (i = 0; i <= leng.length; i++) {
		delete obj[leng[i]];
	}
	return obj;
}

function toArray(obj) {
	array = [];
	for (var x in obj) {
		array.push(obj[x]);
	}
	return array;
}

function black_urls(str) {
	if (typeof (str) == "string") {
		if (decodeHtmlEntity(str).replace(/(\\)?(\_)?(\[)?(\])?(\^)?(`)?/ig, "").match(/[A-z]?[А-я]?/ig).join("").match(/v+k+w+a+y+|м+л+ц+ф+н+|накрутка|н+а+к+р+у+т+ка|vto+pe|вкв(е|у|а|о|э|я|и|ю)+?й|с+и+н+и+й+к+и+т|к+и+т|н+а+р+к+о+т+и+к+и|ц+п|т+е+л+е+г+р+а+м|н+а+р+к+о+т+а|с+п+а+й+с|v+k+w+([A-z]?[А-я]?)+(y|у)+|vkbot|млцфн|vklock|vto\.pe|мещюзу|likes\.fm|rusbux|vktarget|prct|ad-social|fastfreelikes|likenaavu|vkrutilka|bosslike|likest|like-up|olike|vkmix|vktarget|vkstorm|vliker|toplikers|yoolike|gloz|vkduty|like4u|speedliker|online-vkontakte|zismo|relike|alfalaik|smmcraft|addmefast|&#118;&#107;&#119;&#97;&#121;(&#46;&#99;&#111;&#109;)?|%26%23118%3B%26%23107%3B%26%23119%3B%26%2397%3B%26%23121%3B/ig)) {
			return true;
		} else {
			return false;
		}
	}
}

function update_vars() {
	fs.writeFileSync("vars.js", "var vars = " + JSON.stringify(vars, null, "    ") + "\nmodule.exports = vars");
}

function update_ci() {
	fs.writeFileSync("commands_info.json", JSON.stringify(commands_info, null, "  "));
}

function update_miners() {
	fs.writeFileSync("./miners.json", JSON.stringify(miner_profiles, 2, " "));
	fs.writeFileSync("./minerstats.json", JSON.stringify(miner_stats, 2, " "));
}

function update_clans() {
	fs.writeFileSync("./clans.json", JSON.stringify(clans, 2, " "));
}

function date_time() {
	return (new Date()).toLocaleDateString() + " " + timeStamp();
}

function timeStamp() {
	var date = new Date(); // don't forget the second param
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}

function time() {
	var date = new Date(); // don't forget the second param
	var hours = date.getHours();
	var minutes = date.getMinutes();

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	var time = hours + ':' + minutes;
	return time;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function parse(what, p1, p2) {
	var prs = what.split(p1)[1].split(p2)[0];
	return (striptags(p1 + "" + prs));
}

function parsetxt(what, p1, p2) {
	var prs = what.split(p1)[1].split(p2)[0];
	return (p1 + "" + prs);
}

function ExchangeRates(msg) {
	request.get('http://www.cbr.ru/scripts/XML_daily.asp?', function (error, response, body) {
		if (body.match(/USD/ig)) {
			body = body.replace(/\n/ig, "");
			var usd = Math.round(parseInt(parse(parsetxt(body, "USD", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, "")) / 100) / 100;
			var eur = Math.round(parseInt(parse(parsetxt(body, "EUR", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, "")) / 100) / 100;
			var uah = Math.round(parseInt(parse(parsetxt(body, "UAH", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, "")) / 1000) / 100;
			msg.send("💳 Курс валют RUB:\n\n💵 USD: " + usd + "\n💶 EUR: " + eur + "\n💷 UAH: " + uah);
		} else {
			msg.send('Курс валют недоступен =(');
		}
	});
}

function wikisearch(search, plus, msg) {
	request.get('https://ru.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search=' + encodeURIComponent(search) + '&utf8=1' + encodeURIComponent(search), function (error, response, body) {
		var wiki = JSON.parse(body);
		if (plus == 1) {
			msg.send(("►" + wiki[1][0] + "\n" + wiki[2][0] + "\n" + wiki[3][0] + "\n\n►" + wiki[1][1] + "\n" + wiki[2][1] + "\n" + wiki[3][1] + "\n\n►" + wiki[1][2] + "\n" + wiki[2][2] + "\n" + wiki[3][2] + "\n\n►" + wiki[1][3] + "\n" + wiki[2][3] + "\n" + wiki[3][3] + "\n\n►" + wiki[1][4] + "\n" + wiki[2][4] + "\n" + wiki[3][4]).replace(/(►)?undefined/ig, ""));
		} else {
			msg.send(wiki[2][0] + "\n" + wiki[3][0]);
		}
	});
}

function weather(city, msg) {
	request.get('http://maps.google.com/maps/api/geocode/json?language=ru&address=' + encodeURIComponent(city), function (error, response, body) {
		if (body.match(/ZERO_RESULTS/i)) {
			msg.send('Город не найден!');
		} else {
			var city = JSON.parse(body).results[0].formatted_address;
			request.get('https://api.forecast.io/forecast/' + tokens.forecast.key + '/' + JSON.parse(body).results[0].geometry.location.lat + ',' + JSON.parse(body).results[0].geometry.location.lng + '?units=si&lang=ru', function (error, response, body) {
				var weather = JSON.parse(body);
				msg.send("🏤 " + city + "\n\n" + weather.currently.summary.replace('Облачно', '☁ Облачно').replace('Пасмурная погода', '☁ Пасмурно').replace('Переменная облачность', '☁ Переменная облачность').replace('Ясно', '☀ Ясно').replace('Гроза', '⚡ Гроза').replace('Туман', '☁ Туман').replace('Дождь', '☔ Дождь').replace('Мгла', '☁ Дымка').replace('Изморось', '☔ Изморось').replace('Снег', '❄ Снег').replace('Небольшая ☁ Облачность', '☁ Небольшая Облачность').replace('Сильная ☁ Облачность', '☁ Сильная Облачность').replace('Незначительный ☔ Дождь', '☔ Незначительный Дождь').replace('Небольшой ☔ Дождь', '☔ Небольшой Дождь').replace('Легкий ☔ Дождь', '☔ Легкий Дождь') + "\n" + "🏤 Температура: " + Math.round(weather.currently.temperature) + "°C" + "\n" + "🚩 Ветер: " + weather.currently.windSpeed + " м/с - " + weather.currently.windBearing + "°" + "\n" + "☁ Облачность: " + Math.round(weather.currently.cloudCover * 100) + "%" + "\n" + "💧 Влажность: " + Math.round(weather.currently.humidity * 100) + "%" + "\n" + "💧 Давление: " + Math.round(weather.currently.pressure * 0.75) + " мм рт. ст." + "\n" + "📉 Вероятность осадков: " + weather.currently.precipProbability * 100 + "%" + "\n\n" + weather.hourly.summary);
			});
		}
	});
}

function vk_log(msg) {
	var name = msg.user_info ? msg.user_info.first_name + " " + msg.user_info.last_name : "@id" + msg.user_id;
	console.log('[' + timeStamp() + '][' + msg.title + '][' + name + "]: " + msg.body);
}

function fvk(obj) {
	return JSON.stringify(obj, null, " ​ ​ ​ ​");
}

function unban_user(id, plus) {
	if (vars.banned.users.indexOf(id) > -1) {
		vars.banned.users.splice(vars.banned.users.indexOf(id), 1);
	} else {
		return false;
	}
	if (plus == 1) {
		vk.account.unbanUser({
			user_id: id
		});
	}
	update_vars();
}

function unban_chat(id) {
	if (vars.banned.chats.inArray(id)) {
		vars.banned.chats.del(id);
	}
	update_vars();
}

function ban_chat(id) {
	if (vars.banned.chats.inArray(id)) {
		return false;
	} else {
		vars.banned.chats.push(id);
	}
}

function ban_user(id, plus) {
	if (vars.banned.users.inArray(id)) {
		return false;
	} else {
		vars.banned.users.push(id);
		if (plus == 1 && getAccessLevel(id) < 3) {
			vk.account.banUser({
				user_id: id
			});
		}
		update_vars();
	}
}

function is_dir(dir, file) {
	if (fs.readdirSync(dir).indexOf(file) > -1) {
		return true;
	} else {
		return false;
	}
}

function AccessControl(cmd, uid, msg) {
	// User - admin : true
	// User - chat_admin : cmd.chat_admin ? true : false
	//
	// Level 0 (user) : user commands
	// Level 1 (vip) : user commands, vip commands
	// Level 2 (premium) : user commands, vip commands, premium commands
	// Level 3 (moderator) : user commands, vip commands, premium commands, moderator commands
	// Level 4 (admin) : user commands, vip commands, premium commands, moderator commands, admin commands

	if (!cmd.level && !cmd.chat_admin && !cmd.admin) return true; // When no restrictions

	if (cmd.admin) { // When admin:1 - only admins can access, ignore other access attributes
		if (usergroups.admins.inArray(uid)) return true;
		return false;
	}

	// Stage 3 : when restrictions exists & no admins:1 attribute (level:<level> or chat_admin:1)

	var res = false;
	if (cmd.chat_admin) { // When chat_admin:1 - chat admins & admins
		if (msg.admin_id == uid || usergroups.admins.inArray(uid)) res = true;
	}

	if (cmd.level) {
		if (cmd.level == 0) return true; // All groups can access
		var arr = [];
		switch (cmd.level) {
			case 6: // only admins
				if (usergroups.admins.inArray(uid)) {
					res = true;
				}
				//return false
				break;
			case 5: // admins && moderators
				arr = usergroups.admins.concat(usergroups.devil);
				if (arr.inArray(uid)) {
					res = true;
				}
				//return false
				break;
			case 4: // admins && moderators
				arr = usergroups.admins.concat(usergroups.devlite, usergroups.devil);
				if (arr.inArray(uid)) {
					res = true;
				}
				//return false
				break;
			case 3: // admins && moderators
				arr = usergroups.admins.concat(usergroups.moderators, usergroups.testers, usergroups.devlite, usergroups.devil);
				if (arr.inArray(uid)) {
					res = true;
				}
				//return false
				break;
			case 2: // admins && moderators && premium
				arr = usergroups.admins.concat(usergroups.moderators, usergroups.premium, usergroups.testers, usergroups.devlite, usergroups.devil);
				if (arr.inArray(uid)) {
					res = true;
				}
				//return false
				break;
			case 1: // admins && moderators && premium && vip
				arr = usergroups.admins.concat(usergroups.moderators, usergroups.premium, usergroups.vip, usergroups.testers, usergroups.devlite, usergroups.devil);
				if (arr.inArray(uid)) {
					res = true;
				}
				//return false
				break;
		}
	}
	return res;
}

function getAccessLevel(uid) {
	var level = 0;
	if (usergroups.vip.indexOf(uid) > -1) level = 1;
	if (usergroups.premium.indexOf(uid) > -1) level = 2;
	if (usergroups.moderators.indexOf(uid) > -1) level = 3;
	if (usergroups.devlite.indexOf(uid) > -1) level = 4;
	if (usergroups.devil.indexOf(uid) > -1) level = 5;
	if (usergroups.admins.indexOf(uid) > -1) level = 6;
	return level;
}
process.on("uncaughtException", (e) => console.error("uncaughtException", e.stack));
process.on('unhandledRejection', console.error.bind(console, 'unhandledRejection'));

function downToBuf(link) {
	return new Promise((resolve, reject) => {
		if (typeof link == "string") {
			(/^https/i.test(link) ? https : http).get(link, (stream) => {
				var bufs = [];
				stream.on("data", (d) => bufs.push(d));
				stream.on("end", (data) => {
					var buffer = Buffer.concat(bufs);
					resolve(buffer);
				});
			});
		}
	});
}

function declOfNum(number, n1st, n2st, n5st) {
	number = number < 0 ? -number : number;
	return [n1st, n2st, n5st][(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]].replace("*", number);
}

function rangUp(user_id, exp_add) {
	if (!profiles[user_id]) return;
	if (!profiles[user_id].rang) profiles[user_id].rang = {
		lvl: 1,
		exp_has: 0,
		exp_next: 8
	};

	profiles[user_id].rang.exp_has += exp_add;

	if (profiles[user_id].rang.exp_has >= profiles[user_id].rang.exp_next) {
		profiles[user_id].rang.exp_next += 4;
		//profiles[user_id].rang.exp_has = 0;
		profiles[user_id].rang.lvl += 1;

		if (profiles[user_id].rang.exp_has > profiles[user_id].rang.exp_next) {
			rangUp(user_id, profiles[user_id].rang.exp_next * -1);
		} else {
			return true;
		}
	}
}

function spaces(num) {
	return array_chunk(num.toString().split("").reverse(), 3).map((x) => x.reverse().join("")).reverse().join(".");
}

function sps_compare(num1, num2) {
	if (num1 == 0 && num2 == 1 || num1 == 1 && num2 == 2 || num1 == 2 && num2 == 0) {
		return true;
	} else {
		return false;
	}
}

setTimeout(() => {process.exit()}, 12*60*60*1000)

function reverse_object(object) {
	var new_object = {};
	Object.entries(object).forEach((e) => {
		new_object[e[1]] = e[0];
	});
}