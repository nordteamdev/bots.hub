var screenshot = require('desktop-screenshot');
var vars = require('./vars.js');
var commands_info = require("./commands_info.json");
var usergroups = require("./usergroups.json")
var request = require('request');
var https = require("https");
var module_vk = require('vk.js');
var yt_module = require('youtube.js');
var array_chunk = require("locutus/php/array/array_chunk")
var yt = yt_module("AIzaSyDIGv5WGHa9Svqj5HcSnZ4O4tI_xF4Iu5U");
var vk = module_vk("57f4fa257ec9bda9a07ecc826129c97c8280319eb4e19370e2c094ba82ee7713e88d14c9f4a00c706fd96");
var group = module_vk("c829476e95a7358e95db0c4db5ba8b78c18e0ae7a817de95b9a32d5883505dc14ebbe378e6603f2df12aa") // Сюда токен группы
var https = require("https");
var http = require("http");
//var Canvas = require('canvas');
var users_acc = require("./users_acc.json");		// Users Account
var users_coef = require("./users_coef.json");		// Users Balance
var users_spots = require("./users_spots.json");	// Users Balance
var items = require("./items.json");				// Items in shop
var promos = require("./promos.json");		// promos
var promo_used = require("./promo_used.json");		// promo_used
//var RuCaptcha = require('rucaptcha');
/*var solver = new RuCaptcha({
		apiKey: '06015c98fcfda70c205ff8ddb8558569',//required
		tmpDir: './tmp', //optional, default is './tmp'
		checkDelay: 1000 //optional, default is 1000 - interval between captcha checks
	});

vk.on.captcha = function (_error, _m, _q, _cb) {
	vk.cart.pause = 1;
	vk.captcha = 1;
	_q["captcha_sid"] = _error["captcha_sid"];
	vk._api(_m, _q, _cb, -1);
	fs.writeFileSync('captcha.jpg', vk.requestSync('GET', _error.captcha_img).getBody());
	solver.solve('captcha.jpg', function (err, answer) {
		if (err)
			console.log(err);
		else
			console.log(answer); //captcha answer
		vk.on.captchaSubmit(answer)
	});

	//
}*/


var fs = require('fs');
var nircmd = require('nircmd');
var striptags = require('striptags');
var sscanf = require('locutus/php/strings/sscanf');
var dirname = require('locutus/php/filesystem/dirname')
var levenshtein = require("locutus/php/strings/levenshtein")
var os = require('os');
var querystring = require('querystring');
var startTime = date_time()
var tokens = {
	"google": {
		"key": "AIzaSyDdx9F-4WKXTZiemcGmt6-OKGb8-Id_-M4",
		"cx": "008423311407977259952:-zsykyv92bg"
	},
	"forecast": {
		"key": "d3b2dd4875014c9de782f6286316e1d1"
	}
}
var coinbuy = [56445323,189187495];
var tts_key = "42dcc964-8c97-48e3-8cc0-b53f2bb654c9"
var admins = usergroups.admins

var allmute = 0;
var commands_read = 0
var messages_read = 0
var tts = 0
var openinv = 0

var base = fs.readFileSync('./bot/data/answer_databse.txt', 'utf-8')
var iha = []
base.split("\n").map(function(a){
	var key = a.split("\\")[0]
	var rep = a.split("\\")[1]
	if(!iha[key]) iha[key] = [];
	iha[key].push(rep);
})
var data = {
	coinboy:[56445323,189187495,209274015],
	me:{}
}

vk.api.users.get({}, function(a){
	data.me.id = a.response[0].id;
	data.me.name = a.response[0].first_name;
	data.me.lname = a.response[0].last_name;
})

Array.prototype.random = function(){
	return this[Math.floor(this.length * Math.random())];
};

Array.prototype.del = function(del){
	this.splice(this.indexOf(del), 1);
	return this
}

String.prototype.ucfirst = function () { 
return this.charAt(0).toUpperCase() + this.substr(1); 
}

String.prototype.stroke = function(num){
	var arr = this.split(" ");
	var array = [];
	var stringbuff = ""
	var i = 0;
	arr.map(function(a){
		if(i < num){
			stringbuff+=a+" ";
			i=i+a.length+1
		}
		else{
			array.push(stringbuff);
			i = 0;
			stringbuff = a+" "
			i = a.length
		}
	})
	array.push(stringbuff);
	return array.replace(/\s$/, "")
}

Array.prototype.getRandom = function(count){
	arr = [];
	rand = getRandomInt(0, this.length - count)
	for(i = rand; i < count + rand; i++){
		arr.push(this[i]);
	}
	return arr;
}

Array.prototype.numeric = function () {
	var arr = [];
	for (i = 0; i < this.length; i++) {
		arr.push((i + 1) + ". " + this[i]);
	}
	return arr;
}

Array.prototype.get = function(count){
	arr = [];
	for(i = 0; i < count; i++){
		arr.push(this[i]);
	}
	return arr;
}

Array.prototype.replace = function(regexp, at){
	arr = [];
	for(i = 0; i < this.length; i++){
		arr.push(this[i].replace(regexp, at))
	}
	return arr;
}

String.prototype.toHHMMSS = function () {
	var sec_num = parseInt(this, 10); // don't forget the second param
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	var days = Math.floor(hours / 24, -1)
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = days+" :: "+(hours-(24*days))+':'+minutes+':'+seconds;
	return time;
}

Array.prototype.remap = function(str){
	for(var i = 0; i < this.length; i++){
		obj = new Object()
		obj[this[i][str]] = this[i]
		this[i] = obj
	}
	return JSON.parse(JSON.stringify(this).replace(/(^\[)?(\]$)?/g, "").replace(/},{/g, ","))
}

String.prototype.Repeat = function(i){
	array = [this]
	while(array.length < i){
		array.push(this)
	}
	return array.join("")
}

Array.prototype.inArray = function(element){
	if(this.indexOf(element) > -1){
		return true
	}
	else{
		return false
	}
}

String.prototype.scream = function () {
	var chars = ["а","я","о","ё","у","ю","ы","и","э","е","a","e","u","o"];
	var array = [];
	this.split("").map(function(a){
		var b = (chars.indexOf(a.toLowerCase()) > -1?a.repeat(getRandomInt(2,20)):a)
		array.push(b);
	})
	return array.join("");
}

Number.prototype.getMonthName = function(element){
	var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
	return monthNames[this]?monthNames[this]:"Month is absent";
}

process.on("uncaughtException", function(e){//Игнорирование ошибок
	console.log("uncaughtException: "+e.stack);
});

vk.api.account.setOnline({})

vk.addListener.messages(function(msg){
	messages_read = messages_read + 1;
	msg.sendMessage = msg.send;
	if(msg.chat_id > vars.chat_id_max){
		vars.chat_id_max = msg.chat_id
		update_vars()
	}
	msg.sendPhoto = function(p, text, attachs){ 
		vk.upload(
		   vk.api.photos.getMessagesUploadServer, 
		   vk.api.photos.saveMessagesPhoto, 
		   {files:{photo: fs.createReadStream(p)}}, 
		   function(a){
			   msg.send(text,{attachment:"photo"+a.response[0].owner_id+"_"+a.response[0].id+","+attachs}); 
		   }); 
	}
	msg.sendDocument = function(p, text){
		vk.upload( 
			vk.api.docs.getUploadServer, 
			vk.api.docs.save, 
			{files:{file: fs.createReadStream(p)}}, 
			function(a){ 
				msg.send("    ",{attachment:"doc"+a.response[0].owner_id+"_"+a.response[0].id}); 
			}); 
	}; 
	msg.sendGraffiti = function(p, text){ 
		vk.upload(
			vk.api.docs.getUploadServer,
			vk.api.docs.save, 
			{type:"graffiti",files:{file: fs.createReadStream(p)}}, 
			function(a){ 
				msg.send(text,{attachment:"doc"+a.response[0].owner_id+"_"+a.response[0].id}); 
			}); 
	}; 
	msg.sendAudio = function(p, texas){ 
		vk.upload(vk.api.audio.getUploadServer,
		vk.api.audio.save,
		{files:{file: fs.createReadStream(p)}}, 
			function(a){ 
				//console.log(a); 
				msg.send(texas,{attachment:"audio"+a.response.owner_id+"_"+a.response.id}); 
			}); 
	}
	msg.setChatPhoto = function(p, chat){ 
		vk.api.photos.getChatUploadServer({chat_id:chat}, function(r){ 
			vk.sreq.post(r.response.upload_url, {photo: fs.createReadStream(p)}, function(u){ 
				vk.api.messages.setChatPhoto({file:u.response},function(a){ 
						
					}) 
				}); 
			});
		}
	msg.sendAM = function (stream, text) {
		vk.upload(vk.api.docs.getUploadServer, vk.api.docs.save, {type:"audio_message",files:{file: stream}},function(a){ 
			msg.send(text,{attachment:["doc"+a.response[0].owner_id+"_"+a.response[0].id]}); 
		}); 
	};
	var i = cmds.length;
	while(i--){
		var matched = msg.body.match(cmds[i].regexp);
		if (msg.action) {
			if (msg.action == 'chat_title_update' && vars.chats.block.titles[msg.chat_id] && msg.out !== 1 && msg.action_text !== vars.chats.block.titles[msg.chat_id]) {
				if(msg.admin_id == msg.user_id){
					vars.chats.block.titles[msg.chat_id] = msg.action_text;
					msg.send("Название заблокировано")
					update_vars();
				}else{
					vk.api.messages.editChat({ title: vars.chats.block.titles[msg.chat_id], chat_id: msg.chat_id })
				}
				return false;
			}
			else if ((msg.action == 'chat_photo_update' || msg.action == 'chat_photo_remove') && vars.chats.block.photos[msg.chat_id] && msg.out !== 1) {
				if(msg.admin_id == msg.user_id){
					if(msg.photo_200){
						vars.chats.block.photos[msg.chat_id] = msg.chat_id
						update_vars();
						request(msg.photo_200).pipe(fs.createWriteStream('./bot/data/block/photos/' + msg.chat_id + '.jpg')).on('close', function () {
							msg.send("Фотография заблокирована")
						})
					}
				}else{
					msg.setChatPhoto("./bot/data/block/photos/" + msg.chat_id + ".jpg", msg.chat_id);
				}
				return false;
			}
			else if(msg.action == 'chat_invite_user' && vars.chats.greetings[msg.chat_id] && data.me.id !== msg.action_mid) {
				msg.send(vars.chats.greetings[msg.chat_id].replace(/%fname%/ig, msg['users_info'][msg.action_mid]['first_name']).replace(/%lname%/ig, msg['users_info'][msg.action_mid]['last_name']))
				return false;
			}
			else if(msg.action == 'chat_kick_user' && vars.chats.greetings[msg.chat_id]) {
				msg.send(vars.chats.kicks[msg.chat_id].replace(/%fname%/ig, msg['users_info'][msg.action_mid]['first_name']).replace(/%lname%/ig, msg['users_info'][msg.action_mid]['last_name']))
				return false;
			}
		}
		else if(black_urls(msg.body)&&!(vars.allowed.chats.indexOf(msg.chat_id) > -1)&&(msg.chat_id)){
			if(vars.banned.chats.inArray(msg.chat_id)){
				msg.body = '';
			}
			else{
				ban_user(msg.user_id, 1);
				msg.body = '';
				msg.send('Вы забанены, в связи с употреблением запрещенных слов 🌚 . Чтобы получить разбан напишите заявку. https://vk.com/topic-96887008_35646927');
				update_vars();
			}
		}
		else{
			if(matched){//
				if(getAccessLevel(msg.user_id) <= 2 && black_urls(msg.body)&&!(vars.banned.users.indexOf(msg.user_id) > -1)){
						msg.reply('Чтобы получить разбан напишите заявку. https://vk.com/topic-96887008_35646927 🌚');
						ban_user(msg.user_id, 1);
						vk_log(msg);
						msg.body = '';
				}
				else if((vars.banned.chats.indexOf(msg.chat_id) > -1)&&!(admins.inArray(msg.user_id))||(vars.banned.users.indexOf(msg.user_id) > -1)&&!(admins.inArray(msg.user_id))||(allmute == 1)&&!(admins.inArray(msg.user_id))||msg.out == 1){} //
				else {
					if(cmds[i].info && !commands_info[cmds[i].info.split(" ")[0]][msg.user_id])commands_info[cmds[i].info.split(" ")[0]][msg.user_id] = 0;
					if(AccessControl(cmds[i], msg.user_id, msg)){
							if(!cmds[i].level || getAccessLevel(msg.user_id) == 4 || cmds[i].per_day[getAccessLevel(msg.user_id)] == -1 || commands_info[cmds[i].info.split(" ")[0]][msg.user_id] < cmds[i].per_day[getAccessLevel(msg.user_id)]) {
								cmds[i].f(matched,msg);
								if(i !== 0){
									cmds[i].counter++
									commands_read = commands_read + 1;
									if(cmds[i].level && cmds[i].per_day[getAccessLevel(msg.user_id)]>-1)commands_info[cmds[i].info.split(" ")[0]][msg.user_id]++
									vk_log(msg);
									update_ci();
								}
							}else{
								msg.send("Ваш лимит запросов по данной комманде законечен или не разрешен обновление через 24 часа")
							}
					}
					else{
						//msg.reply("Нет прав администратора");
					}
					return false;
				}
			}
		}
	}
}, {interval:500});

//-- CAPTCHA -------------------------------------------------------------------------------------------------------------------------------------------------
vk.on.captcha = function(_error,_m,_q,_cb){
	vk.cart.pause = 1;
	vk.captcha = 1;
	_q["captcha_sid"] = _error["captcha_sid"];
	vk._api(_m,_q,_cb,-1);
		
	fs.writeFileSync('./captcha.jpg', vk.requestSync('GET', _error.captcha_img).getBody());
	
	console.log("Runtime paused. Reason : captcha")
	///*
	setTimeout(function () {
		if (vk.captcha) {
			vk.cart.pause = 0;
			vk.cart.list = []
			vk.captcha = 0;
			console.log("Runtime resumed. Timeout!")
		}
	}, 120000)
	//
}

group.addListener.messages(function (msg) {
	cmds_group.map(function(cmd){
		var matched = msg.body.match(cmd.regexp)
		if(matched){
			if(!cmd.admin || (cmd.admin && admins.indexOf(msg.user_id) !== -1)){
				try {cmd.f(matched,msg)} catch (e) {msg.send(e.name + " : " + e.message)}
			}
		}
	})
}, {interval:1000});
var cmds_group = [
	{   // Test
		regexp:/^[\/]?test/i,
		f:function(params,msg){ 
			msg.send("CAPTCHA Bot : OK")
		},
	},
	{   // CAPTCHA - get
		regexp:/^(?:\/капча|get)$/i,
		f:function(params,msg){
			if (!vk.captcha) {msg.send("Капчи пока нет, зайди позже")} else {
				msg.send("Загружаю картинку с капчей...")
				msg.sendPhoto("./captcha.jpg", "Введите текст с картинки\n\/капча тут_введите_символы")
			}
		},
	},
	{   // CAPTCHA - reset
		regexp:/^reset$/i,
		f:function(params,msg){
			vk.captcha = 0 // ok? 
			vk.cart.pause = 0;
			vk.cart.list = [];
		},
	},
	{   // CAPTCHA - enter
		regexp:/^(?:\/капча|put)\s(.*)/i,
		f:function(params,msg){
			if (!vk.captcha) return msg.send("Капчи нет или она была уже введена другим пользователем")
			console.log("Entered CAPTCHA from group by " + msg.user_info.first_name + " " + msg.user_info.last_name + " [" + msg.user_id + "]. Checking...")
			msg.send("Проверяем ввод...\nЕсли капча была введена правильно Эмилия продолжит отвечать через несколько секунд")
			vk.on.captchaSubmit(params[1].trim())
			vk.captcha = 0 // ok? 
			vk.cart.pause = 0;
			vk.cart.list = [];
		},
	},
]

//------------------------------------------------------------------------------------------------------------------------------------------------------------

var cmds = [
    /*{    // если нет команд, включено по просьбе Эмиля (09.01.2019 - 21:27)
		regexp:
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
	{    // зови
		regexp:/^\/(зови)/i,
		f:function(params,msg){
				vk.api.messages.getChat({chat_id:msg.chat_id}, function(a){
					msg.send("Сюда "+a.response.users.map(a=>"[id"+a+"|ты]").join(", "))
				})
		  },
		  per_day: [-1,-1,-1,-1],
		  chat_admin:1,
		  admin:1,
		info:"/зови",
		description:"Позвать всех в беседу"
	},
	{    // /ci
		regexp: /^\/(c(hat\s)?i(nfo)?)/i,
		f: function (params, msg) {
			vk.api.messages.getChat({fields: 'nickname,screen_name,bdate,counters,last_seen,online', chat_id:msg.chat_id}, function(a){
				var users = a.response.users.map(a=>a.first_name+" "+a.last_name+(a.online==1?" [online]":""));
				var online = a.response.users.filter(a=>a.online);
				msg.send("["+msg.title+"] - "+online.length+"/"+users.length+" online\n"+users.join("\n"))
			})
		},
		info: "/ci",
		chat_admin:1,
		admin:1,
		description: "Chat Info"
	},
	{    // фото|музыка|видео
		regexp:/^\/(фото|photo|музыка|music|видео|video) (.*)/i,
		f:function(params,msg){
			var cmd = {
				"фото":["photo","photos"],
				"музыка":["audio","audio"],
				"видео":["video","video"],
				"photo":["photo","photos"],
				"music":["audio","audio"],
				"video":["video","video"],
			};
			if(msg.body.match(/ rand /i)){
				var rand = getRandomInt(0,300)
			}
			else{
				var rand = 0
			}
			params[1] = cmd[params[1].toLowerCase()];
			vk.api[params[1][1]].search({sort:0,auto_complete:0,q:params[2].replace(/rand /ig, ""), offset:rand,count:10,adult:1},function(res){
				//console.log(res);
				if(params[1][0] == "audio" && black_urls(res.response.items.map(function(a){return a.title+" "+a.artist}).join("\n"))){
					ban_user(msg.user_id, 1)
				}
				else if(res.response.items.length){
				msg.send(
					"Результаты поиска по запросу: "+params[2].replace(/rand /ig, ""),{
						attachment:res.response.items.map(function(a){
							return params[1][0]+a.owner_id+"_"+a.id;
						}).join(",")}
					);
				}
				else{
					msg.reply("По вашему запросу ничего не найдено");
				}
			});
		},
		per_day: [-1,-1,-1,20],
		admin:1,
		info:"/фото | /музыка | /видео",
		description:"Ищет фото, музыку или видео"
	},
	/*{    // ping - pong
		regexp:/^\/(ping|пинг)/i,
		f:function(params,msg){
				msg.send("pong")
			},
		per_day: [-1,-1,-1,2],
		level:3,
		info:"/ping",
		description:"ping - pong"
	}, */
	{    // get
		regexp:/^get /i,
		f:function(params,msg){
			if(msg.body.match(/status_audio/ig)){
				vk.api.users.get({user_id:msg.user_id, fields:'status'}, function(a){
					if(!black_urls(a.response.map(function(a){return a.status_audio.title+" "+a.status_audio.artist}).join("\n"))){
						msg.send('', {attachment:'audio'+a.response[0].status_audio.owner_id+"_"+a.response[0].status_audio.id})
					}
				})
			}
			else if(msg.fwd_messages) {
				var ids = msg.fwd_messages.map(function(a){
					return a.user_id
				}).join(",")
				vk.api.users.get({user_ids: ids,fields:msg.body.replace(/^get /i, "")},function(res, params){
				msg.send(res.response.map(function(a){
					return "["+a.first_name+" "+a.last_name+"] - "+a[msg.body.replace(/^get /i, "")]
					}).join("\n"));
				})
			}
			else {
				vk.api.users.get({user_ids: msg.user_id,fields:msg.body.replace(/^get /i, "")},function(res, params){
				msg.send(res['response'][0][msg.body.replace(/^get /i, "")]);
				})
			};
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"get [params]",
		description:"Users get"
	},
	/*{    // Собери
		regexp:/^соберывфыфщзшфи/i,
		f:function(params,msg){
			if(msg.fwd_messages){
				if(black_urls(msg.body)){
					msg.reply('Попытка блокировки Эмилии\n['+time()+']['+msg.title+']', {user_id:admins[0]});
					ban_user(msg.user_id)
					vk.api.account.banUser({user_id:msg.user_id})
				}
				else{
					msg.send(msg.fwd_messages.map(function(a){
						return a.body
					}).join("\n\@\n")
					)
				}
			}
		},
		per_day: [-1,-1,-1,-1],
		info:"собери [fwd]",
		description:"Собирает слова из пересланных сообщений"
	}, */
	//{    // /sperm
		/*regexp:/^\/sperm(\shttps?:\/\/)?/i,
		f:function(params,msg){
			if(msg.attachments){
				link = toArray(delFromObj(msg.attachments[0].photo, "id,album_id,owner_id,width,height,text,date,access_key,post_id,lat,long"))
				link = link[link.length - 1]
			}
			else{
				link = msg.body.replace(/^\/sperm\s/ig, "")
			}
			var filename = Math.random().toString(36).slice(2)+'.jpg'
			request("http://www.lunach.ru/?cum=&url="+link+"&tpl=vk").pipe(fs.createWriteStream("./bot/data/pictures/cums/"+filename)).on("close", function(){
				msg.sendPhoto("./bot/data/pictures/cums/"+filename, "Готово!")
			})
		},
		per_day: [5,10,20,40],
		info:"/sperm [прикрепленное фото | ссылка на фото]",
		description:"Спасибо, я кончил"
	},*/
	/*{    // Погода
		regexp:/^погод(к)?а|(r2(,)? |Эмилия( )? |аЭмилия( )? )+(погод(к)?а)/i,
		f:function(params,msg){
			if(msg.body.match(/погод(к)?а /i)){
				weather(msg.body.replace(/погод(к)?а /i, ""), msg)                
			}
			else if(msg.body.match(/погод(к)?а/i)){
				vk.api.users.get({user_ids: msg.user_id, fields: "city"},function(res, params){
					 weather(res['response'][0]['city']['title'], msg)
				})
			}
		},
		per_day: [-1,-1,-1,-1],
		info:"Погода [город]?",
		description:"Погода"
	}, */
	/*{    // кинопоиск
		regexp:/^\/(kinopoisk |кинопоиск )/i,
		f:function(params,msg){
			kinopoisk(msg.body.replace(/^\/(kinopoisk |кинопоиск )/i, ""), msg)
		},
		info:"/кинопоиск [фильм]",
		description:"Кинопоиск"
	},*/
	/*{    // /tch
		regexp:/\/tch /i,
		f:function(params,msg){
			twitcheck(msg.body.replace(/\/tch /i, ""), msg)
		},
		info:"/tch [nick]",
		description:"Twitch Check"
	},*/
	/*{    // sticker_id
		regexp:/^sticker_id/i,
		f:function(params,msg){
			if(msg.fwd_messages){
				msg.send(msg['fwd_messages'][0]['attachments'][0]['sticker']['id']);
			};
		},
		info:"sticker_id [fwd]",
		description:"ID стикера из пересланного сообщения"
	},*/
	{    // /wiki+
		regexp:/^\/wiki\+ /i,
		f:function(params,msg){
				wikisearch(msg.body.replace(/^\/wiki\+ /i, ""), 1, msg)
			},
		info:"/wiki+ [текст]",
		chat_admin:1,
		admin:1,
		description:"wikipedia+"
	},
	{    // /wiki 
		regexp:/^\/wiki /i,
		f:function(params,msg){
				wikisearch(msg.body.replace(/^\/wiki /i, ""), 0, msg)
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/wiki [текст]",
		description:"wikipedia"
	},
	/*{    // /wookie
		regexp:/^\/wookiee /i,
		f:function(params,msg){
				msg.send(wookieesearch(msg.body.replace(/^\/wookiee /i, ""), msg));
			},
		info:"/wookiee [текст]",
		description:"Поиск по вукипедии"
	},
	{    // /wk
		regexp:/^\/wk /i,
		f:function(params,msg){
			infowookiebox(msg.body.replace(/^\/wk /i, ""), msg)
			   // msg.sendPhoto('./bot/data/wookiepedia/wookiebox.png', )
			},
		info:"/wk [текст]",
		description:"Информация о герое по вселенной SW"
	},*/
	{    // /google
		regexp:/^\/goo+gle /i,
		f:function(params,msg){
				googlesearch(msg.body.replace(/^\/go+gle /i, ""), msg)
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/google [текст]",
		description:"Google Search"
	},
	/*{    // /история
		regexp:/^\/история/i,
		f:function(params,msg){
				request.get('http://www.anekdot.ru/random/story/', function(error, response, body){
					msg.send(parse(body, '<p class="title">', '</a></p>')+"\n\n"+parsetxt(body, '<div class="text">', '</div>').replace('<div class="text">', '').replace(/quot;/ig, '"'))
				})
			},
		per_day: [-1,-1,-1,-1],
		info:"/история",
		description:"Случайная история"
	}, 
	{    // /факт
		regexp:/^\/факт/i,
		f:function(params,msg){
				request.get('http://randstuff.ru/fact/', function(error, response, body){
					msg.send(parse(body, '<tr><td>', '</td></tr>'))
				})
			},
		per_day: [-1,-1,-1,-1],
		info:"/факт",
		description:"Случайный факт"
	},
	{    // /Мудрость
		regexp:/^\/мудрость/i,
		f:function(params,msg){
				request.get('http://randstuff.ru/saying/', function(error, response, body){
					msg.send(parse(body, '<tr><td>', '</td></tr>'))
				})
			},
		per_day: [-1,-1,-1,-1],
		info:"/мудрость",
		description:"Мудрые мысли"
	},
	{    // /Шутка
		regexp:/^\/шутка/i,
		f:function(params,msg){
				request.get('http://randstuff.ru/joke/', function(error, response, body){
					msg.send(parse(body, '<tr><td>', '</td></tr>'))
				})
			},
		per_day: [-1,-1,-1,-1],
		info:"/шутка",
		description:"Шутка"
	},*/
	{    // курс 
		regexp:/^\/курс(\sвалют)?$/i,
		f:function(params,msg){
				ExchangeRates(msg)
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/курс",
		description:"Курс валют"
	},
	/*{    // qka 
		regexp:/^qka|^йлф/i,
		f:function(params,msg){
				msg.send("¯\\_(ツ)_/¯");
			},
		per_day: [-1,-1,-1,-1],
		info:"qka|йлф",
		description:"¯\\\_(ツ)_/¯"
	},
	{    // инфа 
		regexp:/^инфа/i,
		f:function(params,msg){
				msg.reply("Вероятность - "+getRandomInt(0,100)+"%");
			},
		per_day: [-1,-1,-1,-1],
		info:"Инфа",
		description:"Вероятность события"
	},
	{    // /rand
		regexp:/^\/rand /i,
		f:function(params,msg){
				msg.reply(msg.body.replace(/^\/rand /, "").replace(/ или /ig, ",").split(",").random());
			},
		per_day: [-1,-1,-1,-1],
		info:"/rand [условие1,условие2...]",
		description:"Рандом"
	},*/
	{    // /urlencode
		regexp:/^\/urlencode /i,
		f:function(params,msg){
				msg.send(encodeURIComponent(msg.body.replace(/^\/urlencode /i, "")))
			},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/urlencode",
		description:"Url Encode"
	},
	/*{    // Соловей, ...
		regexp:/^Эмилия(\s)?(.*)/i,
		f:function(params,msg){
			var text = msg.body.replace(/^Эмилия( )?/i, "")
			if (!iha[text]) {
				var ans = levArraySimilar(text, base.split("\n").map(function (a) { return a.split("\\")[0] }))[0].w
				var answer = iha[ans].random().replace(/%username%/ig, msg['users_info'][msg.user_id]['first_name']).replace(/%usersurname%/ig, msg['users_info'][msg.user_id]['last_name'])
				var attach = (answer.match(/(doc|photo|audio|video)[0-9]+_[0-9]+/g)?answer.match(/(doc|photo|audio)[0-9]+_[0-9]+/g).join(","):"")
				msg.send(answer, {attachment:attach})
			}
			else {
				var answer = iha[text].random().replace(/%username%/ig, msg['users_info'][msg.user_id]['first_name']).replace(/%usersurname%/ig, msg['users_info'][msg.user_id]['last_name'])
				var attach = (answer.match(/(doc|photo|audio|video)[0-9]+_[0-9]+/g)?answer.match(/(doc|photo|audio)[0-9]+_[0-9]+/g).join(","):"")
				msg.send(answer, {attachment:attach})
			}
		},
		per_day: [-1,-1,-1,-1],
		info:"Эмилия, [текст]",
		description:"Общение с Эмилией"
	},*/
	{    // getid
		regexp:/^getid/i,
		f:function(params,msg){
			if(msg.fwd_messages) {
				msg.send(msg.fwd_messages[0].user_id);
			}
			else{
				msg.send(msg.user_id);
				}
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"getid [fwd]",
		description:"get id"
	},
	{    // /clc
		regexp:/^\/clc/i,
		f:function(params,msg){
				msg.send(" <br>".Repeat(100));
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/clc",
		description:"Clear Chat"
	},
	/*{    // ??
		regexp:/\?\?/i,
		f:function(params,msg){
				msg.send(["Да", "Нет"].random());
			},
		per_day: [-1,-1,-1,-1],
		info:"??",
		description:"Да | Нет"
	},    
	{    // /монетка
		regexp:/^\/монетка|(Эмилия( )?\s)?((брось|подбрось|кинь)\sмонетку)/i,
		f:function(params,msg){
				msg.send(["Орёл", "Решка"].random());
			},
		per_day: [-1,-1,-1,-1],
		info:"/монетка",
		description:"Орёл | Решка"
	},
	{    // /надо
		regexp:/^\/надо/i,
		f:function(params,msg){
				msg.send(["Надо", "Не надо"].random());
			},
		per_day: [-1,-1,-1,-1],
		info:"/надо [текст]?",
		description:"Надо | Не надо"
	},*/
	{    // calculator
		regexp:/^([0-9\(\)\.\^\+\/\*\-]+)=$/i,
		f:function(params,msg){
				msg.send(eval(params[1].replace(/([0-9]+)\^([0-9]+)/g,"Math.pow($1,$2)")));
		},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"[Выражение]=",
		description:"Калькулятор"
	},  
	/*{    // кто|кого|кому
		regexp:/^\/(кто|кого|кому)/i,
		f:function(params,msg){
			vk.api.messages.getChat({chat_id:msg.chat_id}, function(a){
				vk.api.users.get({user_ids:a.response.users.random()}, function(a){
					msg.reply("Бля буду, это "+a.response[0].first_name+" "+a.response[0].last_name+"\nvk.com/id"+a.response[0].id);
				});
			})
		},
		per_day: [-1,-1,-1,-1],
		info:"/кто | /кого | /кому",
		description:"Рандом"
	},
	{    // /когда
		regexp:/^\/когда/i,
		f:function(params,msg){
			msg.reply("Я думаю, через "+getRandomInt(0,100)+" "+["секунд","минут","часов","дней","месяцев","лет"].random());
		},
		per_day: [-1,-1,-1,-1],
		info:"/когда [текст]?",
		description:"Рандом"
	},*/
	{    // /help
		regexp:/^\/help/i,
		f:function(params,msg){
			//msg.send(cmds.filter(function(a){if(!a.admin){return true}}).map(function(a){return a.admin + a.info + " - " + a.description }).splice(9).join("\n").replace(/undefined/gi, "").replace(/\nNaN \- /ig, ""))
		msg.send("Здравствуйте!\n\nВ данный момент, над этим ботом идет активная разработка. Если у Вас есть желание помочь или же у Вас появились идеи для бота, просьба написать в личные сообщение Alexander Deykun (vk.com/remdey).\n\nСпасибо за внимание.")
		},
		per_day: [-1,-1,-1,-1],
		info:"/help",
		description:"Команды"
	},
	/*{    // /ahelp
		regexp:/^\/ahelp/i,
		f:function(params,msg){
			msg.send(cmds.filter(function(a){if(a.admin){return true}}).map(function(a){return a.admin.toString().replace(/1/g, "[a]") + a.info + " - " + a.description }).splice(9).join("\n").replace(/undefined/gi, "").replace(/\nNaN \- /ig, ""))
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/ahelp",
		description:"Админ команды"
	},*/
	{    // /my_help
		regexp:/^\/myhelp/i,
		f:function(params,msg){
			switch (true) {
				case usergroups.admins.inArray(msg.user_id) :
					msg.send("Ваш уровень: Developer\n\nКоманды: " + cmds.filter(x=> x.admin).map(x=> "\n> " + x.info + " - " + x.description) + "\n\nПриятного пользования!")
				break;
				case msg.chat_id && msg.admin_id == msg.user_id :
					msg.send("Ваш уровень: Создатель беседы\n\nКоманды: " + cmds.filter(x=> x.chat_admin).map(x=> "\n> " + x.info + " - " + x.description) + "\n\nПриятного пользования!")
				break;
				/*case usergroups.moderators.inArray(msg.user_id) :
					msg.send("Ваш уровень : Администратор\n\nКоманды-эксклюзивы : " + cmds.filter(x=> x.level == 3).map(x=> "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе")
				break;*/
				/*case usergroups.premium.inArray(msg.user_id) :
					msg.send("Ваш уровень : Premium-пользователь\n\nКоманды-эксклюзивы : " + cmds.filter(x=> x.level == 2).map(x=> "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе")
				break;*/
				/*case usergroups.vip.inArray(msg.user_id) :
					msg.send("Ваш уровень : VIP-пользователь\n\nКоманды-эксклюзивы : " + cmds.filter(x=> x.level == 1).map(x=> "\n> " + x.info + " - " + x.description) + "\n\nДругие команды ищите в общем хелпе")
				break;*/
				default : msg.send("Вы не зачислены ни к одной из привилегированных групп. Для сотрудничества пишите Alexander Deykun (vk.com/remdey)")
			}
		},
		per_day: [-1,-1,-1,-1],
		info:"/myhelp",
		description:"Список доступных команд по уровню"
	},
	/*{
		regexp: /^\/tts ([^]+)/,
		f: function (params, msg) {
			https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key +
				"&format=mp3&speaker=ermil&text="+encodeURIComponent(params[1]),function(stream){
				stream.filename = "audio_message.ogg";
				msg.sendAM(stream)
			});
		},
		per_day: [-1,-1,10,100],
		level:2,
		info: "/tts текст",
		description: "Голосовое сообщение"
	},
	{    // Позор
		regexp:/^\/позор/i,
		f:function(params,msg){
			vk.api.wall.get({owner_id:-71729358, offset:getRandomInt(0,3893), count:1}, function(a){
				msg.send('', {attachment:a.response.items.map(function(a){
					return 'wall'+a.owner_id+'_'+a.id
				}).join(",")})
			})
		},
		per_day: [-1,-1,-1,-1],
		info:"/позор",
		description:"Позор random history"
	},*/
	{    //stat
		regexp:/^\/stat/i,
		f:function(params,msg){
			msg.send("Старт - "+startTime+"\nСообщения - "+commands_read+" | "+messages_read);
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		chat_admin:1,
		info:"/stat",
		description:"Statistics"
	},
	{    // uptime
		regexp:/^uptime/i,
		f:function(params,msg){
			var time = process.uptime();
			var uptime = (time + "").toHHMMSS();
			msg.send(uptime);
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"Uptime",
		description:"Время работы бота"
	},
	{    // /hardware
		regexp:/^\/hard(w|ware)|^\/os/i,
		f:function(params,msg){
			msg.send("CPU: "+os.cpus()[0].model+" (x"+os.cpus().length+")\nRAM: "+Math.round(os.totalmem()/1024/1024/1024)+" GB\n"+"OS: "+os.type()+" ("+os.arch()+")")
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/hardware",
		description:"PC Information"
	},
	{    // ban
		regexp:/^ban|^user ban /i,
		f:function(params,msg){
			if(msg.body.match(/^user ban /i)){
				var banned_user = parseInt(msg.body.replace(/^user ban /i, ""))
				if(msg.body.match(/ban\+/i)){
					user_ban(banned_user, 1)
				}
				else{
					user_ban(banned_user)
				}
				msg.send("User ID: "+banned_user+" banned");
				update_vars()
			}
			else if(msg.fwd_messages){
				if(msg.body.match(/ban\+/i)){
					ban_user(msg.fwd_messages[0].user_id, 1)
				}
				else{
					ban_user(msg.fwd_messages[0].user_id, 1)
				}
				msg.send("Пользователь: [id"+msg.fwd_messages[0].user_id+"|писюн] забанен");
			}
			else{
				ban_chat(msg.chat_id)
				msg.send("Chat ID: "+msg.chat_id+" banned");
			}
		},
		per_day: [-1,-1,-1,15],
		admin:1,
		info:"Ban [fwd]",
		description:"Ban user/chat"
	},
	{    // unban
		regexp:/^unban|^user unban /i,
		f:function(params,msg){
			if(msg.body.match(/^user unban /i)){
				var unbanned_user = parseInt(msg.body.replace(/^user unban /i, ""))
				if(msg.body.match(/unban\+/i)){
					unban_user(unbanned_user, 1)
				}
				else{
					unban_user(unbanned_user)
				}
				msg.send("User ID: "+unbanned_user+" unbanned");
			}
			else if(msg.fwd_messages){
				if(msg.body.match(/unban\+/i)){
					unban_user(msg.fwd_messages[0].user_id, 1)
				}
				else{
					unban_user(msg.fwd_messages[0].user_id)
				}
				msg.send("User ID: "+msg.fwd_messages[0].user_id+" unbanned");
			}
			else{
				unban_chat(msg.chat_id)
				msg.send("Chat ID: "+msg.chat_id+" unbanned");
			}
		},
		per_day: [-1,-1,-1,15],
		info:"Unban [fwd]",
		admin:1,
		description:"Unban user/chat"
	},
	{    // allow
		regexp:/^allow/i,
		f:function(params,msg){
				vars.allowed.chats.push(msg.chat_id);
				msg.send("Chat ID: "+msg.chat_id+" allowed");
				update_vars();
			},
		per_day: [-1,-1,-1,-1],
		admin: 1,
		info:"Allow",
		description:"Безопасность бота выкл"
	},
	{    // unallow
		regexp:/^unallow/i,
		f:function(params,msg){
				vars.allowed.chats.splice(vars.allowed.chats.indexOf(msg.chat_id));
				msg.send("Chat ID: "+msg.chat_id+" unallowed");
				update_vars()
			},
		per_day: [-1,-1,-1,-1],
		admin: 1,
		info:"Unallow",
		description:"Безопасность бота вкл"
	},
	{    // allmute
		regexp:/^allmute/i,
		f:function(params,msg){
				allmute = 1;
				msg.send('Все чаты забанены')
			},
		per_day: [-1,-1,-1,-1],
		admin: 1,
		info:"Allmute",
		description:"Замутить все чаты"
	},
	{    // unmuteall
		regexp:/^unmuteall/i,
		f:function(params,msg){
				allmute = 0;
				msg.send('Все чаты разбанены')
			},
		per_day: [-1,-1,-1,-1],
		admin: 1,
		info:"Unmuteall",
		description:"Размутить все чаты"
	},
	{    // add
		regexp:/^add/i,
		f:function(params,msg){
				if(msg.fwd_messages){
					vk.api.friends.add({user_id:msg.fwd_messages[0].user_id})
					msg.send('Ok')
				}
			},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"add [fwd]",
		description:"Добавить пользователя в друзья"
	},
	{    // delete
		regexp:/^delete/i,
		f:function(params,msg){
				if(msg.fwd_messages){
					vk.api.friends.delete({user_id:msg.fwd_messages[0].user_id})
					msg.send('Ok')
				}
			},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"delete [fwd]",
		description:"Удалить пользователя из друзей"
	},
	{    // /send
		regexp:/^\/send /i,
		f:function(params,msg){
			global.uid = sscanf(msg.body, '/send %s')[0]
				msg.send(msg.body.replace("/send "+uid, ""), {user_id:uid})
				msg.send('Сообщение отправлено')
			},
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/send [id] [msg]",
		description:"Отправить анонимное сообщение через бота"
	},
	/*{    // /eval - я сделалъ нахуй он мне я его закоменчу ибо код могут слить -- стоит 
		regexp:/^\/eval (.*)/i,
		f:function(params,msg){
			try{
				var res = eval(params[1]);
				msg.send(typeof res == 'object'? JSON.stringify(res, null, '&#8194;'):res);
			}catch(e){
				msg.reply(e.name + ": " + e.message)
			}
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/eval [params]",
		description:"eval"
	},/*
	{    // /dir
		regexp:/^\/dir|^-> |^<-|^->file(i)? |^->photo(i)? /i,
		f:function(params,msg){
				if(msg.body.match(/^\/dir /i)){
					lastdir = (msg.body.replace(/^\/dir /i, ""))
					lastar = fs.readdirSync(lastdir)
					msg.send("►"+lastar.join("\n►"))
				}
				else if(msg.body.match(/^-> /i)){
					lastdir = lastdir+"/"+msg.body.replace(/^-> /i, "")
					lastar = fs.readdirSync(lastdir)
					msg.send("►"+lastar.join("\n►"))
				}
				else if(msg.body.match(/^<-/i)){
					lastdir = dirname(lastdir)+"/"
					lastar = fs.readdirSync(lastdir)
					msg.send("►"+lastar.join("\n►"))
				}
				else if(msg.body.match(/^->photo |^->photoi /i)){
					if(msg.body.match(/^->photoi /i)){
						dir = parseInt(msg.body.replace(/^->photoi /i, ""))-1
						msg.sendPhoto(lastdir+"/"+lastar[dir], lastar[dir])
					}
					else{
						dir = lastdir+"/"+msg.body.replace(/^->photo /i, "")
						msg.sendPhoto(dir)
					}
				}
				else if(msg.body.match(/^->file |^->filei /i)){
					if(msg.body.match(/^->filei /i)){
						dir = parseInt(msg.body.replace(/^->filei /i, ""))-1
						msg.sendDocument(lastdir+"/"+lastar[dir])
					}
					else{
						dir = lastdir+"/"+msg.body.replace(/^->file /i, "")
						msg.sendDocument(dir)   
					}
				}
				else if(msg.body.match(/^\/dir/i)){
					msg.send(lastdir)
				}
			},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/dir | -> | <- | ->file | ->photo",
		description:"File Manager"
	},
	{    // /va
		regexp:/^\/va ([a-z0\.]+) (.*)/i,
		f:function(params,msg){s
			vk._api(params[1],JSON.parse(params[2]),function (a) {
				msg.reply(JSON.stringify(a,null," ​ ​ ​"));
			})
			},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/va [params]",
		description:"vk api"
	},*/
	{    // isban
		regexp:/^is(\s)?ban/i,
		f:function(params,msg){
			if(msg.fwd_messages){
				if(vars.banned.users.inArray(msg.fwd_messages[0].user_id)){
					msg.send("True")
				}
				else{
					msg.send("False")
				}
			}
			else if(msg.chat_id){
				if(vars.banned.chats.inArray(msg.chat_id)){
					msg.send("True")
				}
				else{
					msg.send("False")
				}
			}
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		chat_admin:1,
		info:"is ban [fwd]?",
		description:"Проверка бана"
	},
	/*{   // Signa
		regexp:/^\/(?:signa|сигна|сігна)\s?([0-9])?(?:\s)?(.*)/i,
		f:function(params,msg){ 
			msg.reply("Ща сек...")
			var signd = function(){
				console.log("asd")
				if (params[2]) {
					t = params[2].split(":")
				} else {
					t = (msg.user_info.first_name + " " + msg.user_info.last_name).split(" ")
				}
				console.log(t)
				request.post({url:"http://shkuragaming.ru/signa",form:{text1:t[0],text2:t[1]}}, function (e,r,b) {
					try {
						dl("http://shkuragaming.ru/signas/signs/"+b.match(/signs\/(.+?)\.jpg"/)[1]+".jpg", "./signa.jpg", x=>msg.sendPhoto("./signa.jpg", "Ваша сигна готова!"))
					} catch (e) {
						msg.send("Произошла ошибка сервиса. Попытайтесь еще раз")
					}
				})
			}
			var sign = function(parameters, name, picture, coords){
				fs.readFile("./bot/empty_signas/"+picture, function(err, pic){
					var canvas = new Canvas(parameters[0], parameters[1]);
					var Image = Canvas.Image
					var img = new Image;
					img.src = pic;
					canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
					var ctx = canvas.getContext('2d'); // наложение текста
					ctx.font = parameters[2]+'px SignPainter';
					ctx.fillStyle = "#"+parameters[4];
					ctx.rotate(coords[2])
					ctx.fillText(name[0].ucfirst()+"\n"+name[1].ucfirst().replace(/^(у|к)/i, " $1"), coords[0], coords[1]);
					var img = canvas.toDataURL()
					var data = img.replace(/^data:image\/\w+;base64,/, "");
					var buf = new Buffer(data, 'base64');
					fs.writeFileSync("./bot/data/pictures/signas/test.png", buf);
					msg.sendPhoto("./bot/data/pictures/signas/test.png")
				})
			}
			new Promise(function(resolve, reject){
				var array = [];
				if(params[2]){
					var s = params[2].split(":");
					array[0] = s[0];
					array[1] = s[1]?s[1]:"";
					resolve(array);
				}else{
					array[0] = msg.user_info.first_name;
					array[1] = msg.user_info.last_name;
					resolve(array);
				};
			}).then(function(array){
				console.log(array)
				switch(params[1]){
					case "1": sign([604, 403, 72, "434055"], array, "karina.png", [184, 373, -0.3]);
						break;
					case "2": sign([600, 600, 122, "323232"], array, "eeonegay.jpg", [197, 370, 0.07]);
						break;
					case "3": sign([604, 453, 90, "534452"], array, "mro.jpg", [320, 120, 0.33]);
						break;
					case "4": sign([1137, 831, 130, "4f5051"], array, "larin.jpg", [520, 320, 0.23]);
						break;
					case "5": sign([524, 402, 70, "4f5051"], array, "mamix.png", [210, 200, 0.12]);
						break;
					case "6": sign([453, 604, 40, "4f5051"], array, "mops.png", [315, 200, 0.35]);
						break;
					case "7": sign([354, 354, 65, "4f5051"], array, "spilberg.png", [90, 230, -0.03]);
						break;
					default: signd();
				};
			});
		},
		per_day: [-1,-1,10,15],
		level:2,
		info:"/сигна | /сигна верхний текст:нижний текст",
		description:"Сигна"
	},
	{
		regexp:/^\/create/i,
		f:function(text,msg){
			if (!users_acc[msg.user_id]){
				users_spots[msg.user_id] = 3500;
				users_acc[msg.user_id] = msg.user_id;
				console.log(msg)
				console.log(typeof msg.send)
				msg.send("Аккаунт "+msg.user_id+" создан\nТвой баланс: "+users_spots[msg.user_id] + " боткоинов");
			}else{
				msg.send("У вас уже создан аккаунт. "+"\nБаланс: "+users_spots[msg.user_id]+ " боткоинов"+"\nИспользуйте:\n /spot [ставка]\n/double [цвет: r, g, b,] [ставка]");
			}
			update_useracc()
		},
		info:"/create",
		description:"создает аккаунт в рулетке"
	},
	{
		regexp:/^\/win ([0-9]+) (.*)/i, // 
		f:function(text,msg){
			users_coef[+text[1]] = +text[2];
			update_usercoef()
			msg.send('Коеффициент ВЫИГРАША для пользователя '+text[1]+' установлен: '+(users_coef[+text[1]]*100)+'%')
		},
		admin:1,
		//info:"/win [id] [coef]",
		//description:"Устанавливает коеффициент выиграша юзеру"
	},
	{
    regexp: /^\/promo$/i,
    f(params, msg) {
        if (!users_acc[msg.user_id]) return msg.send('Сначала создайте аккаунт!');
        promos[msg.user_id] = Math.random().toString(36).slice(2, 2 + 6).toUpperCase()
     update_promos()
        return msg.send('Ваш промо код: ' + promos[msg.user_id])
    }}, 
    {
    regexp: /^\/freecoin ([0-9a-z]{6})$/i,
    f(params, msg) {
        if (!users_acc[msg.user_id]) return msg.send('Сначала создайте аккаунт!');

        let id = Object.keys(promos).find(x => promos[x] === params[1].toUpperCase());
        if (promo_used.indexOf(msg.user_id) !== -1) {
            return msg.send('Вы уже получали коины!');
        } else if (id) {

            users_spots[id] += 50;
            users_spots[msg.user_id] += 500;
            promo_used.push(msg.user_id);
			update_promoused()
            return msg.send('Вы получили 500 монет!');
        } else {
            return msg.send('Этот код недействителен!')
    }
	update_promoused()
	},
		info:"/freecoin",
		description:"активирует промокод"
	},
	{
		regexp:/^\/flip(?:\s([0-9]+))?/i,
		f:function(params,msg){
			money = +params[1] || 3500;
			if (users_spots[msg.user_id] <= 0) {
				msg.send('У тебя 0 на счету, ау!');
			} else if(money <= users_spots[msg.user_id]){
				if(Math.random() < ( users_coef[msg.user_id] == 'undefined'  ? 0.2 : users_coef[msg.user_id])){
					users_spots[msg.user_id] += money;
					msg.send("Решка\nВы выиграли: "+money+" боткоинов\n Ваш баланс: " + users_spots[msg.user_id]);
				} else {
					users_spots[msg.user_id] -= money;
					msg.send("Орел\nВы проиграли: "+money+" боткоинов\n Ваш баланс: " + users_spots[msg.user_id]);
				}
			} else {
				msg.send('Ставка больше, чем у тебя на счету, ау!');
			}
			update_userspot()
		},
		info:"/flip [ставка]",
		description:"игра на боткоины, Орел/решка"
	},
	{
		regexp:/^\/spot ([0-9]+)/i,
		f:function(text,msg) {
			text = +text[1]
			// Рандомизая слотов
			var spot1 = getRandomInt(1, 3); // 1 3 3
			var spot2 = getRandomInt(1, 3); // 1 2 3
			var spot3 = getRandomInt(1, 3); // 1 1 1
			var check = spot1 + spot2 + spot3;
			var smiles = ['🍋', '🎁', '🍊'].random();
			var point = users_spots[msg.user_id];
			// Проверка на юзера
			if(text < 300)return msg.send('Минимальная ставка 300 боткоинов')
			if(users_spots[msg.user_id] <= 0){
				msg.send("У вас 0 на балансе");
			}else if(text > users_spots[msg.user_id]){
				msg.send("Ваша ставка больше чем баланс");
			}
			if(text > users_spots[msg.user_id] || text == 0 || text <= 0)return
			if(users_spots[msg.user_id] > 0){
				if(users_acc[msg.user_id]){
					if ( users_coef[msg.user_id] != 0 && (check%3==0 || users_coef[msg.user_id] >= 0.7 && check%2==0 || users_coef[msg.user_id] == 1)){
						if(text == users_spots[msg.user_id]){
							users_spots[msg.user_id] += text*2;
							msg.send("[ "+smiles+" | "+smiles+" | "+smiles+" ]"+"\n Вы выиграли: "+text*2+" боткоинов!\n Ваш баланс: "+users_spots[msg.user_id] + " боткоинов", {attachment:"audio180943442_456239736"});
						}else{
							users_spots[msg.user_id] += text*2;
							msg.send("[ "+smiles+" | "+smiles+" | "+smiles+" ]"+"\n Вы выиграли: "+text*2+" боткоинов!\n Ваш баланс: "+users_spots[msg.user_id] + " боткоинов");
						}
					} else {
						if(text == users_spots[msg.user_id]){
							users_spots[msg.user_id] -= text;
							msg.send("[ "+spot1+" | "+spot2+" | "+spot3+" ]"+"\n Вы проиграли: "+text+" боткоинов!\n Ваш баланс: "+users_spots[msg.user_id] + " боткоинов", {attachment:"audio180943442_456239737"});
						}else if(users_spots[msg.user_id] == 1){
							msg.send("[ "+spot1+" | "+spot2+" | "+spot3+" ]"+"У кого-то проблемы с балансом..\n Вы проиграли: "+text+" боткоинов!\n Ваш баланс: "+users_spots[msg.user_id] + " боткоинов", {attachment:"photo180943442_456243681"});
						}else{
							users_spots[msg.user_id] -= text;
							msg.send("[ "+spot1+" | "+spot2+" | "+spot3+" ]"+"\n Вы проиграли: "+text+" боткоинов!\n Ваш баланс: "+users_spots[msg.user_id] + " боткоинов");
						}
					}
				}
			}
			update_userspot()
		},
		info:"/spot [ставка]",
	    description:"[ставка] -- игровой автомат"
	},
	{
		regexp:/^\/double ([rgb]) ([0-9]+)/i,
		f:function(text, msg){
			var areYouLucky = Math.random() < 0.5;
			var clr = text[1]
			text = +text[2]
			var col = getRandomInt(0, 14);
			var g = 0;
			var r = 7;
			var b = 14;
			if(users_spots[msg.user_id] <= 0){
				msg.send("пошел нахуй, у тебя 0 на балансе");
			} else if(text > users_spots[msg.user_id]){
				msg.send('Ставка больше, чем у вас на счету!')
			} else if(users_acc[msg.user_id]){
				if(areYouLucky && clr == 'g' && col == g) {
					users_spots[msg.user_id] += text*14;
					msg.send("GREEN!!! x14"+"\n Вы выиграли: "+text*14+" боткоинов! Ваш баланс: "+users_spots[msg.user_id], {attachment:"audio180943442_456239736"});
				} else if(areYouLucky && clr == 'r' && col > g && col <= r) {
					users_spots[msg.user_id] += text*2;
					msg.send("RED! x2"+"\n Вы выиграли: "+text*2+" боткоинов! Ваш баланс: "+users_spots[msg.user_id] + " боткоинов");
				} else if(areYouLucky && clr == 'b' && col > r) {
					users_spots[msg.user_id] += text*2;
					msg.send("BLACK! x2"+"\n Вы выиграли: "+text*2+" боткоинов! Ваш баланс: "+users_spots[msg.user_id]);
				} else {
					users_spots[msg.user_id] -= text;
					msg.send("Другой цвет =("+"\n Вы проиграли: "+text+" боткоинов! Ваш баланс: "+users_spots[msg.user_id]);
					return;
				}
			} else msg.reply("В начале пройди регистрацию через /create");
			update_userspot()
		},
		info:"/double [цвет: r(x2) g(x14) b(x2)] [ставка]",
	    description:"рулетка с цветами"
	},
	{
		regexp: /^\/trade ([0-9]+) ([0-9]+)/i,
		f: function (text, msg) { // вот это вызывается вот ща покажу где
	from = +msg.user_id
		to = +text[1]
		money = +text[2]
		if (msg.user_id == users_acc[msg.user_id]) {
			if (users_spots[from] <= 0) {
				msg.send("У вас 0 на балансе");
			} else if (money > users_spots[from]) {
				msg.send("У вас не хватает для трейда");
			}
			if (money > users_spots[from] || money == 0)
				return
				users_spots[from] -= money;
			users_spots[to] += money * 0.9;
			msg.send("Обмен на сумму: " + money + " был успешно совершен (учитывая комиссию)\nНа вашем балансе осталось: " + users_spots[from] + " боткоинов");
		} else {
			msg.reply("В начале пройди регистрацию через /create");
			}
			update_userspot()
		},
		admin:1,
		info:"/trade",
		description:"[id] [кол-во боткоинов] передача боткоинов другому пользователю"
	},
	{
		regexp: /^\/addcoin\s([0-9]+)\s([0-9]+)/i,
		f: function (params, msg) {
			to = +params[1]
			money = +params[2]
			users_spots[to] += money;
			msg.send("Пользователю "+to+" выдано "+money+" боткоинов");
			update_userspot();
		},
		admin:1,
		info:"/addcoin",
		description:"[id] [кол-во боткоинов] выдача боткоинов пользователю"
	},
	{
		regexp: /^\/coin/i,
		f: function (text,msg) {
			if(data.coinboy.indexOf(msg.user_id) > -1) {
			users_spots[msg.user_id] += 500000;
			msg.send("Вы получили 500000 Боткоинов");
			} else {
			msg.send("Чтоб пополнять баланс через /coin, нужно купить привилегию vk.com/hawaiiankd");
			}
			update_userspot();
		},
		info:"/coin",
		description:"123"
	},*/
	{
		regexp: /^\/write\s(.*)/i,
		f: function (params, msg) {
			vk.api.wall.post({message:params[1], error:1}, function(a){
				if(!a.error){
					msg.send("Запись успешно создана!");
				}else{
					msg.send("При создании записи произошла ошибка!\n"+JSON.stringify(a.error))
				}
			})
		},
		admin:1,
		info:"/write [text]",
		description:"делает запись на стене бота"
	},
	/*{
		regexp:/^\/balance/i,
		f:function(text,msg){
			if (msg.user_id != users_acc[msg.user_id]){
				users_spots[msg.user_id] = 3500;
				users_acc[msg.user_id] = msg.user_id;
				msg.send("Мы тут заметили, что у вас нет аккаунта, поэтому мы его вам сделали.\nАккаунт "+msg.user_id+" успешно создан\nВаш баланс: "+users_spots[msg.user_id] + " боткоинов");
			}else{
				if(users_spots[msg.user_id] == 1){
					msg.reply("У кого-то проблемы с балансом.."+"\nВаш баланс: "+users_spots[msg.user_id]+" боткоинов\nАккаунт ID: "+users_acc[msg.user_id], {attachment:"photo180943442_456243681"});
				}else{
					msg.reply("Ваш баланс: "+users_spots[msg.user_id]+" боткоинов\nАккаунт ID: "+users_acc[msg.user_id]+ "\n\nПокупка Боткоинов --> vk.com/hawaiiankd");
				}
			}
		},
		info:"/balance",
		description:"проверить баланс"
	},
	{
		regexp:/^\/shop/i,
		f:function(text,msg){
			msg.send("Покупка Боткоинов --> vk.com/hawaiiankd\n\n Магазин : " + items.map(x=> "\n📦 " + x.name + "\n&#4448;&#4448;Цена: "+ x.price + " боткоинов	\n&#4448;&#4448;ID: "+ x.id).join(""))
		},
		info:"/shop",
		description:"Магазин"
	},
	{
		regexp:/^\/buy ([^]+)/i,
		f:function(params,msg){
			var i = params[1] - 1;
			if(msg.user_id === users_acc[msg.user_id]){
				if(users_spots[msg.user_id] > items[i].price){
					users_spots[msg.user_id] -= items[i].price;
					msg.send("Предмет "+items[i].name+" был успешно куплен\n С вашего баланса снято: "+items[i].price+" боткоинов,\nВаш баланс: "+users_spots[msg.user_id]+" боткоинов", {attachment: items[i].photo});
					usergroups[items[i].admin].push(msg.user_id)
				}else{
					msg.reply("Ебланище, у тебя "+users_spots[msg.user_id]+" боткоинов, а "+items[i].name + " стоит "+items[i].price+" боткоинов");
				}
			}else{
				msg.reply("В начале пройди регистрацию через /create");
			}
			update_usergroups()
			update_userspot()
		},
		info:"/buy",
		description:"[айди] -- покупка предметов из магазина"
	},
	{   // Pworld
		regexp:/^\/pworld\s?(.*)?/i,
		f:function(params,msg){ 
			msg.reply("Ща сек...")
			var form = {
				username: params[1] || msg.user_info.first_name + " " + msg.user_info.last_name,
				sex: params[1]?2:msg.user_info.sex == 2?0:msg.user_info.sex == 0?2:1
			}
			
			request.post({url:"http://thepr.ru/", form: form}, function (err,res,body) {
				request.get(res.headers.location, function (e,r,b) {
					var link = b.match(/cert-.*\.jpg/i)[0]
					dl("http://thepr.ru/" + link, "./cert.jpg", x=> msg.sendPhoto("./cert.jpg", "Ваш сертификат готов"))
				})
			})
		},
		per_day: [-1,10,20,100],
		level:2,
		info:"/pworld",
		description:"Сертификат порабощения мира"
	},
	{   // achiva
		regexp:/^\/achi\s(.*)/i,
		f:function(params,msg){ 
			msg.reply("Ща сек...")
			request.get('http://andriy2.tk/api/minecraft?'+querystring.stringify({
				head:'Достижение получено!',
				text:params[1],
				icon: '3'
			}), function(e,r,b){
				try{
					var nn = './mine.png'
					dl(JSON.parse(b).picture, nn, x=>msg.sendPhoto(nn));
				} catch(e){
					msg.send('Oops...')
				}
			})
		},
		per_day: [-1,10,20,100],
		level:2,
		info:"/mc",
		description:"Достижение minecraft"
	},
	{   // мем
		regexp:/^\/mem(?:\s([0-9]+))?\s(.*)/i,
		f:function(params,msg){ 
			msg.reply("Ща сек...")
			var id = params[1] || 1726795; //это так, прото на тесты
			var fields = params[2].split(':')
			request.get('http://andriy2.tk/api/risovach/'+id+'?'+querystring.stringify({
				zdata1 : fields[0] || '',
				zdata2 : fields[1] || '',
				zdata3 : fields[2] || '',
				zdata4 : fields[3] || '',
			}), function(e,r,b){
				try{
					var nn = './risovach.jpg'
					dl(JSON.parse(b).picture, nn, x=>msg.sendPhoto(nn));
				} catch(e){
					msg.send('Oops...')
				}
			})
		},
		per_day: [-1,10,20,100],
		level:2,
		info:"/mem",
		description:"Создать mem"
	},*/
	{   // Promote
		regexp:/^\/promote\s(add|del)\s(A|L)(?::([0-9]))?/i,
		f:function(params,msg){ 
			var uids = msg.fwd_messages.map(x=> x.user_id).toUnique()
			switch (params[1].toLowerCase()) {
				case "add" : 
					switch (params[2].toUpperCase()) {
						case "A" : usergroups.admins = usergroups.admins.concat(uids); break;
						case "L" :
							if (!params[3]) return msg.send("Нужен номер уровня")
							if (parseInt(params[3]) > 3 || parseInt(params[3]) < 1) return msg.send("Номер уровня должен быть от 1 до 3. Чтобы добавить пользователя до группы 4 уровня, сделайте его администратором Эмилии")
							switch (parseInt(params[3])) {
								case 1 : usergroups.vip = usergroups.vip.concat(uids); break;
								case 2 : usergroups.premium = usergroups.premium.concat(uids); break;
								case 3 : usergroups.moderators = usergroups.moderators.concat(uids); break;
							}
						break;
					}
				break;
				case "del" :
					switch (params[2].toUpperCase()) {
						case "A" : uids.map(x=> usergroups.admins.splice(usergroups.admins.indexOf(x),1)); break;
						case "L" : 
							if (!params[3]) return msg.send("Нужен номер уровня")
							if (parseInt(params[3]) > 3 || parseInt(params[3]) < -1) return msg.send("Номер уровня должен быть от 1 до 3. Чтобы добавить пользователя до группы 4 уровня, сделайте его администратором Эмилии")
							switch (parseInt(params[3])) {
								case 1 : uids.map(x=> usergroups.vip.splice(usergroups.vip.indexOf(x),1)); break;
								case 2 : uids.map(x=> usergroups.premium.splice(usergroups.premium.indexOf(x),1)); break;
								case 3 : uids.map(x=> usergroups.moderators.splice(usergroups.moderators.indexOf(x),1)); break;
							}
						break;
					}
				break;
			}
			update_usergroups()
			msg.send("Готово!")
		}, 
		per_day: [-1,-1,-1,-1],
		admin:1,
		info:"/promote A|L:<уровень>",
		description:"Повышение привилегий пользователя"
	},
	/*{   // List
		regexp:/^\/vlist/i,
		f:function(params,msg){ 
			var uids = usergroups.vip.concat(usergroups.premium, usergroups.moderators, usergroups.admins).toUnique()
			var users = vk.apiSync.users.get({user_ids:uids.join(","), fields:"first_name"}).response
			msg.send("Developer: " + usergroups.admins.map(x=> "\n- " + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name).join("") + "\n\Администраторы: " + usergroups.moderators.map(x=> "\n- " + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name).join("") + "\n\nPremium-пользователи: " + usergroups.premium.map(x=> "\n- " + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name).join("") + "\n\n" + "\n\nVIP-пользователи : " + usergroups.vip.map(x=> "\n- " + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name).join(""))
		}, 
		per_day: [-1,-1,-1,-1],
		chat_admin:1,
		admin:1,
		info:"/vlist",
		description:"Список vip/premium/admin пользователей"
	},*/
	/*{    //
		regexp: /\/yt\s(.*)/i,
		f:function(params, msg){
			console.log(msg.user_id+" - "+msg.body);
			yt.api.search({part:"snippet", q:encodeURIComponent(params[1]), type:"channel", regionCode:"RU"}, function(a){
				if(a.items[0]){
					yt.api.channels({ part: "statistics,snippet,status,brandingSettings", id:a.items[0].id.channelId}, function (a) {
						msg.send("На канале "+a.items[0].snippet.title+" - "+array_chunk(a.items[0].statistics.subscriberCount.toString().split("").reverse(), 3).map(x=>x.reverse().join("")).reverse().join(" ")+" подписчиков!")
					})
				}else{
					msg.send("Канал не найден =(")
				}
			})
		},
		per_day: [-1,-1,-1,-1],
		info: "/yt имя_канала",
		description: "Подписчики youtube"
	},
	{    // /кричи
		regexp: /^\/кричи\s([А-яA-z]+.*)/i,
		f: function (params, msg) {
			var interval = setInterval(function(){
				msg.send(params[1].scream())
			}, 1000);
			setTimeout(function(){
				clearInterval(interval)
			}, getRandomInt(2,6)*1000)
		},
		per_day: [-1,10,20,100],
		level:1,
		info: "/кричи [текст]",
		description: "Кричит"
	},
	{    // /расписание
		regexp: /^\/расписание(\sна\s)?/i,
		f: function (params, msg) {
			var sub = msg.body.replace(/^\/расписание(\sна\s)?/i, "").toLowerCase()
			var lessons = fs.readFileSync("./bot/data/school/lessons.txt", "utf-8").split("//")
			var edit = ["Воскресенье", "Понедельник", "Вторник", "Среду", "Четверг", "Пятницу", "Субботу", "Завтра", "Неделю"]
			var day = {
				"понедельник": 1,
				"вторник": 2,
				"среду": 3,
				"четверг": 4,
				"пятницу": 5,
				"субботу": 6,
				"завтра": (new Date).getDay() + 1,
				"неделю": -1
			}
			if (day[sub] && day[sub] !== -1) {
				msg.send(lessons[day[sub]].replace(/(^\r\n)?(\r\n$)?/ig, "").split("\r\n").numeric().join("\n"))
			}
			else if (sub == "") {
				msg.send(lessons[(new Date).getDay()].replace(/(^\r\n)?(\r\n$)?/ig, "").split("\r\n").numeric().join("\n"))
			}
			else {
				var les = day[levArraySimilar(sub, edit)[0].w.toLowerCase()];
				if (les !== -1) {
					msg.send(lessons[les].replace(/(^\r\n)?(\r\n$)?/ig, "").split("\r\n").numeric().join("\n"))
				}
				else {
					var arr = [];
					var days = {
						"1": "Понедельник",
						"2": "Вторник",
						"3": "Среда",
						"4": "Четверг",
						"5": "Пятница",
						"6": "Суббота"
					}
					for (i = 0; i < (lessons.length - 1); i++) {
						arr.push(days[i + 1] + ":\n" + lessons[i + 1].replace(/(^\r\n)?(\r\n$)?/ig, ""))
					}
					msg.send(arr.join("\n\n"));
				}
			}
		},
		per_day: [-1,-1,-1,-1],
		//info:"/расписание [на завтра | день недели]?",
		//description:"Покажет расписание"
	},
	{    // /вжух
		regexp: /^\/вжух\s(и\s)?(.*)/i,
		f: function (params, msg) {
			dl("http://goddamnhash.tk/vjyx.php?text="+encodeURIComponent(params[2]), "./vjuh.jpg", x=>msg.sendPhoto("./vjuh.jpg"));
		},
		per_day: [-1,10,25,100],
		level:2,
		info: "/вжух [текст]",
		description: "Вжухает",
	},
	{    // citgen
		regexp: /^\/(c(an|it))/i,
		f: function (params, msg) {
			var canvas = new Canvas(850, 600);
			var Image = Canvas.Image
			if(msg.fwd_messages && msg.fwd_messages[0].user_id !== 220087974 && msg.fwd_messages[0].body.length > 0){
				vk.api.users.get({user_id:msg.fwd_messages[0].user_id, fields:"photo_200"}, function(a){
					request.get(a.response[0].photo_200).pipe(fs.createWriteStream("./bot/data/pictures/cit/"+a.response[0].id+".png")).on("close", function(){
						fs.readFile("./bot/data/pictures/cit/"+a.response[0].id+".png", function(err, squid){
							if (err) throw err;
							var img = new Image;
							img.src = squid;
							var ctx = canvas.getContext('2d'); // рисование черного фона
							ctx.beginPath();
							ctx.rect(0, 0, 850, 600);
							ctx.fillStyle = "black";
							ctx.fill();
							var ctx = canvas.getContext('2d'); // наложение текста "цитаты людей" 
							ctx.font = '60px Impact';
							ctx.fillStyle = "white";
							ctx.fillText("Цитаты великих людей:", 40, 120);
							var ctx = canvas.getContext('2d'); // наложение текста из сообщения
							var text = msg.fwd_messages.filter(function(a){
								if(msg.fwd_messages[0].user_id == a.user_id){return true}
							}).map(function(a){return a.body}).join(" ").ucfirst();
							ctx.font = '26px Impact';
							ctx.fillStyle = "white";
							ctx.fillText("«"+text.stroke(26).join("\n").stroke(300)[0]+"»", 260, 220);
							var text = "© "+a.response[0].first_name+" "+a.response[0].last_name;  // наложение имя/фамилия
							ctx.font = '26px Impact';
							ctx.fillStyle = "white";
							ctx.fillText(text, 600-text.length*5, 550);
							canvas.getContext('2d').drawImage(img, 40, 180, img.width, img.height); // наложение авы юзера
							var img = canvas.toDataURL()
							var data = img.replace(/^data:image\/\w+;base64,/, "");
							var buf = new Buffer(data, 'base64');
							fs.writeFileSync("./bot/data/pictures/cit/"+a.response[0].id+"_c.png", buf);
							msg.sendPhoto("./bot/data/pictures/cit/"+a.response[0].id+"_c.png")
						});
					})
				})
			}
		},
		level:2,
		per_day: [-1,10,20,100],
		info: "/cit [fwd]",
		description: "Делает цитату из пересланного сообщения"
	},*/
	{    //конфа
		regexp: /^\/reset/i,
		f: function (params, msg) {
			var obj = {};
			cmds.map(function(a,i){
				if(a.info)obj[a.info.split(" ")[0]] = {};
			})
			commands_info = obj;
			fs.writeFile("./commands_info.json", JSON.stringify(obj, null, "  "), function(){
				msg.send("Счетчик обнулен");
			});
		},
		admin:1,
		per_day: [-1,-1,-1,-1]
		//info: "/конфа [текст]",
		//description: "Кидает инвайт в любую конфу где есть соловей",
	},
	/*{    // /try
		regexp: /^\/try\s/i,
		f: function (params, msg) {
			msg.send(msg['users_info'][msg.user_id]['first_name'] + " " + msg['users_info'][msg.user_id]['last_name'] + " " + msg.body.replace(/^\/try\s/i, "") + " | " + ["Удачно", "Неудачно"].random());
		},
		info: "/try [текст]",
		description: "Samp Try"
	},
	{    // /me
		regexp: /^\/me\s/i,
		f: function (params, msg) {
			msg.send(msg['users_info'][msg.user_id]['first_name'] + " " + msg['users_info'][msg.user_id]['last_name'] + " " + msg.body.replace(/^\/me\s/i, ""));
		},
		info: "/me [текст]",
		description: "Samp Me"
	},
	{    // /do
		regexp: /^\/do\s/i,
		f: function (params, msg) {
			msg.send(msg.body.replace(/^\/do\s/i, "").ucfirst() + " (" + msg['users_info'][msg.user_id]['first_name'] + " " + msg['users_info'][msg.user_id]['last_name'] + ")");
		},
		info: "/do [текст]",
		description: "Samp Do"
	},
	{    // /gif
		regexp: /^\/gif/i,
		f: function (params, msg) {
			var gifsrch = function(){
				vk.api.wall.get({owner_id:-39488246, offset:getRandomInt(0,50000), count:1}, function(a){
					if(a.response.items[0] && a.response.items[0].attachments[0].type == "doc"){
						msg.send("", {attachment:"doc"+a.response.items[0].attachments[0].doc.owner_id+"_"+a.response.items[0].attachments[0].doc.id})
					}
					else{
						gifsrch();
					}
				})
			}
			gifsrch()
		},
		per_day: [-1,-1,-1,-1],
		info:"/gif",
		description:"Рандомная гифка"
	},
	{    // /мем
		regexp: /^\/мем/i,
		f: function (params, msg) {
			var gids = [-66814271, -71114104, -116826793, -45745333];
			var memsrch = function(){
				vk.api.wall.get({owner_id:gids.random(), offset:getRandomInt(0,5000), count:1}, function(a){
					console.log(a.response.items[0])
					if(a.response.items[0] && a.response.items[0].attachments[0].type == "photo"){
						msg.send("", {attachment:"photo"+a.response.items[0].attachments[0].photo.owner_id+"_"+a.response.items[0].attachments[0].photo.id})
					}
					else{
						memsrch();
					}
				})
			}
			memsrch()
		},
		per_day: [-1,-1,-1,-1],
		info: "/мем",
		description: "Рандомный мем"
	},*/
	{    // /cmds
		regexp: /^\/(cmds|StatisticulatedNixyasebestataupala)/i,
		f: function (params, msg) {
			msg.send(cmds.filter(a=>!a.admin && a.info).sort((a,b)=>b.counter-a.counter).map(a=>a.info+" - "+a.counter).join("\n"))
		},
		per_day: [-1,-1,-1,-1],
		admin:1,
		info: "/cmds",
		description: "Статистика команд"
	},
	{    // /block title
		regexp: /^\/block\s(title|photo)/i,
		f: function (params, msg) {
			console.log("asdasd")
			switch (msg.body.toLowerCase()) {
				case "/block title":
					vars.chats.block.titles[msg.chat_id] = msg.title
					msg.send("Название чата заблокировано")
					update_vars();
					break
				case "/block photo":
					if (msg.photo_200) {
						vars.chats.block.photos[msg.chat_id] = msg.chat_id
						update_vars();
						request(msg.photo_200).pipe(fs.createWriteStream('./bot/data/block/photos/' + msg.chat_id + '.jpg')).on('close', function () {
							msg.send("Фотография заблокирована")
						})
					}
			}
		},
		chat_admin:1,
		admin:1,
		info: "/block title | photo",
		description: "Заблокирует название беседы | фотографию беседы",
	},
	{    // /unblock title
		regexp: /^\/unblock (title|photo)/i,
		f: function (params, msg) {
			switch (msg.body.toLowerCase()) {
				case "/unblock title":
					delete vars.chats.block.titles[msg.chat_id]
					msg.send("Название чата разблокировано")
					update_vars()
					break
				case "/unblock photo":
					delete vars.chats.block.photos[msg.chat_id]
					msg.send("Фотография разблокирована")
					update_vars()
			}
		},
		info: "/unblock title | photo",
		description: "Разблокирует название беседы | фотографию беседы",
		admin:1,
		chat_admin:1,
	},
	{    // /wfc
		regexp: /^\/wfc\s(.*)/i,
		f: function (params, msg) {
			if(params[1].match(/^reset$/i)){
				delete vars.chats.greetings[msg.chat_id];
				update_vars();
				msg.send("Приветствие удалено");
			}else{
				vars.chats.greetings[msg.chat_id] = params[1];
				msg.send("Приветствие установлено");
				update_vars();
			}
			
		},
		info: "/wfc [текст]",
		description: "Установит приветствие для беседы",
        admin:1,
		chat_admin:1,
	},
	{    // /ffc
		regexp: /^\/ffc\s(.*)/i,
		f: function (params, msg) {
			if(params[1].match(/^reset$/i)){
				delete vars.chats.kicks[msg.chat_id];
				update_vars();
				msg.send("Прощание удалено");
			}else{
				vars.chats.kicks[msg.chat_id] = params[1];
				msg.send("Прощание установлено");
				update_vars();
			}
		},
		info: "/ffc [текст]",
		description: "Установит прощание для беседы",
		admin:1,
		chat_admin:1,
	},
	{    // /sshot
		regexp: /^\/sshot\s(.*)/i,
		f: function (params, msg) {
			var num = getRandomInt(0,10);
			request("http://mini.s-shot.ru/1366x768/PNG/1366/?"+params[1]).pipe(fs.createWriteStream("./bot/data/pictures/sshot"+num+".png")).on("close", function(){
				msg.sendPhoto("./bot/data/pictures/sshot"+num+".png", "Готово!")
			})
		},
		info: "/sshot [url]",
		admin:1,
		description: "Скриншот сайта",
	},
	{    // /укрф
		regexp: /^\/ук(\sрф)?\s([0-9]+)/i,
		f: function (params, msg) {
			request.get("http://ppt.ru/kodeks.phtml?kodeks=20&paper="+params[2], function(e,r,b){
				msg.send(parse(b, "<title>", "</title>").replace(/Актуально в [0-9]+\. Последняя редакция/i, ""))
			})
		},
		info: "/ук рф [статья]",
		admin:1,
		chat_admin:1,
		description: "Уголовный кодекс РФ",
	},
	/*{   // Test
		regexp:/^[\/]?price/i,
		f:function(params,msg){ 
			msg.send("Цены на привилегии:\n🎁ADMIN LEVEL\n&#4448;&#4448;Цена: 100 рублей\n🎁PREMIUM LEVEL\n&#4448;&#4448;Цена: 50 рублей\n🎁VIP LEVEL\n&#4448;&#4448;Цена: 25 рублей\n\nПокупка ---> vk.com/hawaiiankd")
		},
		info:"/price",
		description:"Цены на привилегии"
	},
	{    // /bs
        regexp: /^\/bs\s[0-2]\s/i,
        f: function (params, msg) {
            var word = msg.body.replace(/^\/bs\s[0-2]\s/ig, "")
            switch (msg.body.match(/^\/bs\s[0-9]/ig).join("")) {
                case "/bs 1":
                    msg.send(word.split("").join("&#1161;") + "&#1161;");
                    break;
                case "/bs 2":
                    msg.send("Варианты:\n"+word.bs(15))
                }
        },
        info: "/bs [1-2] [текст]",
        description: "Делает текст красивым (нет)"
	},*/
];



Array.prototype.toUnique = function () {
	var arr = []
	this.map(function (x) {if (!arr.inArray(x)) {arr.push(x)}})
	return arr
}

cmds.map(function(a){
	a.counter = 0;
	if(a.info && !commands_info[a.info.split(" ")[0]]){
		commands_info[a.info.split(" ")[0]] = {};
	}else if(!a.per_day){
		a.per_day = [-1,-1,-1,-1];
	}
	update_ci()
});

var date = new Date();
var month = (date.getMonth()<10?"0"+date.getMonth():date.getMonth()).toString();
var day = (date.getDate()<10?"0"+date.getDate():date.getDate()).toString();
var restart_time = (86400 - new Date("1970-01-01T"+timeStamp()+"Z")/1000)*1000+10;
//console.log("Обнуление комнад через "+(restart_time/1000).toString().toHHMMSS());
var cdaemon = function(){
	setTimeout(function(){
		var obj = {};
		cmds.map(function(a,i){
			if(a.info)obj[a.info.split(" ")[0]] = {};
		})
		commands_info = obj;
		fs.writeFile("./commands_info.json", JSON.stringify(obj, null, "  "));
		cdaemon();
	}, restart_time);
}
cdaemon();

setInterval(function () {
	vk.api.friends.getRequests({}, function (a) {if (a.response.items.length > 0) {vk.api.friends.add({user_id:a.response.items[0]})}})
	vk.api.friends.getRequests({out:1}, function (a) {if (a.response.items.length > 0) {vk.api.friends.delete({user_id:a.response.items[0]})}})
}, 5000)

function update_usergroups() {
	fs.writeFileSync("./usergroups.json", JSON.stringify(usergroups, null, "\t"))
	return 1
}

function update_useracc() {
	fs.writeFileSync("./users_acc.json", JSON.stringify(users_acc, null, "\t"))
	return 1
}

function update_usercoef() {
	fs.writeFileSync("./users_coef.json", JSON.stringify(users_coef, null, "\t"))
	return 1
}

function update_userspot() {
	fs.writeFileSync("./users_spots.json", JSON.stringify(users_spots, null, "\t"))
	return 1
}

function update_promos() {
	fs.writeFileSync("./promos.json", JSON.stringify(promos, null, "\t"))
	return 1
}
function update_promoused() {
	fs.writeFileSync("./promo_used.json", JSON.stringify(promo_used, null, "\t"))
	return 1
}

setInterval(function(){
	vk.api.account.setOnline({})
}, 800000)
/*setInterval(function(){ // AutoSave system 
fs.writeFileSync("users_spots.json", JSON.stringify(users_spots, null, "\t")) 
fs.writeFileSync("users_acc.json", JSON.stringify(users_acc, null, "\t"))
}, 1000);*/

function dl(url, file, cb) {request.get(url).pipe(fs.createWriteStream(file)).on("close", cb)}

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
	return String.fromCharCode(dec);
  });
};

var encodeHtmlEntity = function(str) {
  var buf = [];
  for (var i=str.length-1;i>=0;i--) {
	buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

function filename(str){
	a = str.split("/"); 
	return a[a.length - 1];
}

function levArray(str, array){
	obj = []
	array.map(function(array){
			a = levenshtein.get(str, array);
			obj.push({"w":array, "l":a})
		})
	return obj.sort(function(a,b){return a.l - b.l})
}

function levArraySimilar(str, array) {
	var obj = []
	array.map(function (array) {
		var a = similar_text(str, array);
		obj.push({ "w": array, "per": a })
	})
	return obj.sort(function (a, b) { return b.per - a.per })
}

function similar_text(str1, str2) {
	var len1 = str1.length;
	var len2 = str2.length;

	var max = Math.max(len1, len2);
	var i, j;

	var similarity = i = j = 0;

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


function delFromObj(obj, str){
	var leng = str.split(",")
	for(i = 0; i <= leng.length; i++){
		delete obj[leng[i]]
	}
	return obj
}

function toArray(obj){
	array = []
	for(x in obj){
		array.push(obj[x])
	}
	return array
}

function black_urls(str){
	if(typeof(str) == "string"){
		if(decodeHtmlEntity(str).replace(/(\\)?(\_)?(\[)?(\])?(\^)?(`)?/ig, "").match(/[A-z]?[А-я]?/ig).join('').match(/v+k+w+a+y+|м+л+ц+ф+н+|вкв(е|у|а|о|э|я|и|ю)+?й|v+k+w+([A-z]?[А-я]?)+(y|у)+|vkbot|млцфн|vto\.pe|мещюзу|likes\.fm|rusbux|ad-social|fastfreelikes|синий\кит|#f57|#морекитов|#хочувигру|#тихийдом|#f58|тихий\дом|явигре|синий\kит|cиний\кит|ciнiй\кiт|кит\синий|синий\кiт|я\в\игре|likenaavu|vkrutilka|bosslike|likest|like-up|olike|vkmix|vktarget|vkstorm|vliker|toplikers|yoolike|gloz|vkduty|like4u|speedliker|online-vkontakte|zismo|relike|alfalaik|smmcraft|addmefast|&#118;&#107;&#119;&#97;&#121;(&#46;&#99;&#111;&#109;)?|%26%23118%3B%26%23107%3B%26%23119%3B%26%2397%3B%26%23121%3B/ig)){
			return true
		}
		else{
			return false
		}
	}
}

function update_vars(){
	fs.writeFileSync("vars.js", "var vars = "+JSON.stringify(vars, null, "    ")+"\nmodule.exports = vars")
}

function update_ci(){
	fs.writeFileSync("commands_info.json", JSON.stringify(commands_info, null, "  "))
}

function date_time(){
	return (new Date()).toLocaleDateString()+" "+timeStamp()
}

function timeStamp() {
	var date = new Date() // don't forget the second param
	var hours   = date.getHours()
	var minutes = date.getMinutes()
	var seconds = date.getSeconds()
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = hours+':'+minutes+':'+seconds;
	return time;
}

function time() {
	var date = new Date() // don't forget the second param
	var hours   = date.getHours()
	var minutes = date.getMinutes()
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	var time = hours+':'+minutes;
	return time;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function parse(what, p1, p2) {
		var prs = what.split(p1)[1].split(p2)[0];
		return (striptags(p1+""+prs))
}

function parsetxt(what, p1, p2) {
		var prs = what.split(p1)[1].split(p2)[0];
		return (p1+""+prs)
}

function ExchangeRates(msg){
	request.get('http://www.cbr.ru/scripts/XML_daily.asp?', function(error, response, body){
		if(body.match(/USD/ig)){
			body = body.replace(/\n/ig, "")
			var usd = Math.round(parseInt(parse(parsetxt(body, "USD", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, ""))/100)/100
			var eur = Math.round(parseInt(parse(parsetxt(body, "EUR", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, ""))/100)/100
			var uah = Math.round(parseInt(parse(parsetxt(body, "UAH", "</Valute>"), "<Value>", "</Value>").replace(/<\/Valute>/ig, "").replace(/,/ig, ""))/1000)/100
			msg.send("💳 Курс валют RUB:\n\n💵 USD: "+usd+"\n💶 EUR: "+eur+"\n💷 UAH: "+uah)
		}
		else{
			msg.send('Курс валют недоступен =(')
		}
	})
}

function wikisearch(search, plus, msg){
	request.get('https://ru.wikipedia.org/w/api.php?action=opensearch&format=json&uselang=user&search='+encodeURIComponent(search)+'&utf8=1'+encodeURIComponent(search), function(error, response, body){
		var wiki = JSON.parse(body);
		if(plus == 1){
			msg.send(("?"+wiki[1][0]+"\n"+wiki[2][0]+"\n"+wiki[3][0]+"\n\n?"+wiki[1][1]+"\n"+wiki[2][1]+"\n"+wiki[3][1]+"\n\n?"+wiki[1][2]+"\n"+wiki[2][2]+"\n"+wiki[3][2]+"\n\n?"+wiki[1][3]+"\n"+wiki[2][3]+"\n"+wiki[3][3]+"\n\n?"+wiki[1][4]+"\n"+wiki[2][4]+"\n"+wiki[3][4]).replace(/(?)?undefined/ig, ""));
		}
		else {
			msg.send("📎"+wiki[1][0]+"\n\n📖==========Информация из вики=============📖\n\n"+wiki[2][0]+"\n\n📖=========================================📖\n\n✏ Ссылка: "+wiki[3][0]);
		}
	})
}

function googlesearch(search, msg){
	var googleres = request.get('https://www.googleapis.com/customsearch/v1?key='+tokens.google.key+'&cx='+tokens.google.cx+'&q='+encodeURIComponent(search), function(error, response, body){
		var googlej = JSON.parse(body.replace(/vkway+(\.com)?/ig, "*****").replace(/vto+(\.pe)?/ig, "*****").replace(/vkbot+(\.ru)?/ig, '*****'));
		if(googlej.queries.request[0].totalResults == 0){
			msg.send("По запросу \""+search+"\" ничего не найдено")
		}
		else{
			msg.send("? Результаты поиска по заросу: "+search+"\n\n"+googlej.items.map(function(a){
				return("►"+a.title+"\n"+a.link)
			}).join("\n\n"))
		}
	}); 
}

function weather(city, msg){
	request.get('http://maps.google.com/maps/api/geocode/json?language=ru&address='+encodeURIComponent(city), function(error, response, body){
		if(body.match(/ZERO_RESULTS/i)){
			msg.send('Город не найден!')
		}
		else{
			var city = JSON.parse(body)["results"][0]["formatted_address"]
			request.get('https://api.forecast.io/forecast/'+tokens.forecast.key+'/'+JSON.parse(body)["results"][0]["geometry"]["location"]["lat"]+','+JSON.parse(body)["results"][0]["geometry"]["location"]["lng"]+'?units=si&lang=ru', function(error, response, body){
				var weather = JSON.parse(body)
				msg.send("🏤 "+city+"\n\n"+weather['currently']['summary'].replace('Облачно', '☁ Облачно').replace('Пасмурная погода', '☁ Пасмурно').replace('Переменная облачность', '☁ Переменная облачность').replace('Ясно', '☀ Ясно').replace('Гроза', '⚡ Гроза').replace('Туман', '☁ Туман').replace('Дождь', '☔ Дождь').replace('Мгла', '☁ Дымка').replace('Изморось', '☔ Изморось').replace('Снег', '❄ Снег').replace('Небольшая ☁ Облачность', '☁ Небольшая Облачность').replace('Сильная ☁ Облачность', '☁ Сильная Облачность').replace('Незначительный ☔ Дождь', '☔ Незначительный Дождь').replace('Небольшой ☔ Дождь', '☔ Небольшой Дождь').replace('Легкий ☔ Дождь', '☔ Легкий Дождь')+"\n"+"🏤 Температура: "+Math.round(weather['currently']['temperature'])+"°C"+"\n"+"🚩 Ветер: "+weather['currently']['windSpeed']+" м/с - "+weather['currently']['windBearing']+"°"+"\n"+"☁ Облачность: "+Math.round(weather['currently']['cloudCover']*100)+"%"+"\n"+"💧 Влажность: "+Math.round(weather['currently']['humidity']*100)+"%"+"\n"+"💧 Давление: "+Math.round(weather['currently']['pressure']*0.75)+" мм рт. ст."+"\n"+"📉 Вероятность осадков: "+weather['currently']['precipProbability']*100+"%"+"\n\n"+weather['hourly']['summary'])
			})
		}
	})
}

function vk_log(msg){
	console.log('['+timeStamp()+']['+msg.title+']['+msg['users_info'][msg.user_id]['first_name']+" "+msg['users_info'][msg.user_id]['last_name']+"]: "+msg.body);
}

function fvk(obj){
	return JSON.stringify(obj, null, " ​ ​ ​ ​")
}

function unban_user(id, plus){
	if(vars.banned.users.indexOf(id) > -1){
		vars.banned.users.splice(vars.banned.users.indexOf(id), 1);
	}
	else{
		return false;
	}
	if(plus == 1){
		vk.api.account.unbanUser({user_id:id})
	}
	update_vars()
}

function unban_chat(id){
	if(vars.banned.chats.inArray(id)){
		vars.banned.chats.del(id)
	}
	update_vars()
}

function ban_chat(id){
	if(vars.banned.chats.inArray(id)){
		return false
	}
	else{
		vars.banned.chats.push(id)
	}
}

function ban_user(id, plus){
	if(vars.banned.users.inArray(id)){
		return false
	}
	else{
		vars.banned.users.push(id)
		if(plus == 1 && getAccessLevel(id) < 3){
			vk.api.account.banUser({user_id:id})
		}
		update_vars()
	}
}

function is_dir(dir, file){
	if(fs.readdirSync(dir).indexOf(file)>-1){
		return true
	}
	else{
		return false
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
	
	if (!cmd.level && !cmd.chat_admin && !cmd.admin) return true // When no restrictions
	
	if (cmd.admin) { // When admin:1 - only admins can access, ignore other access attributes
		if (usergroups.admins.inArray(uid)) return true
		return false
	}
	
	// Stage 3 : when restrictions exists & no admins:1 attribute (level:<level> or chat_admin:1)
	
	var res = false
	if (cmd.chat_admin) { // When chat_admin:1 - chat admins & admins
		if (msg.admin_id == uid || usergroups.admins.inArray(uid))res = true
	}
	
	if (cmd.level) {
		if (cmd.level == 0) return true // All groups can access 
		var arr = []
		switch (cmd.level) {
			case 4 : // only admins
				if (usergroups.admins.inArray(uid)) {res = true}
				//return false
			break;
			case 3 : // admins && moderators
				var arr = usergroups.admins.concat(usergroups.moderators)
				if (arr.inArray(uid)) {res = true}
				//return false
			break;
			case 2 : // admins && moderators && premium
				var arr = usergroups.admins.concat(usergroups.moderators, usergroups.premium)
				if (arr.inArray(uid)) {res = true}
				//return false
			break;
			case 1 : // admins && moderators && premium && vip
				var arr = usergroups.admins.concat(usergroups.moderators, usergroups.premium, usergroups.vip)
				if (arr.inArray(uid)) {res = true}
				//return false
			break;
		}
	}
	return res
}
function getAccessLevel(uid) {
	var level = 0;
	if(usergroups.vip.indexOf(uid) > -1)level = 1
	if(usergroups.premium.indexOf(uid) > -1)level = 2
	if(usergroups.moderators.indexOf(uid) > -1)level = 3
	if(usergroups.admins.indexOf(uid) > -1)level = 4
	return level;
}
прототип:
String.prototype.bs = function(param){
    var param = (param?param:1);
    var symboles = {
        "A":["Ą","Ã","Á","Ẵ","Â","Ặ","Â","Ā","Ắ","Ă","Ằ","Ä","À","Ά","Ǻ","Α","Å","А","Ά","Ẫ","Ä","Λ","λ","Ǽ","Æ","Δ","Æ"],
        "B":["δ","lЗ","Ь","β","Ъ","В","ß","฿"],
        "C":["Ç","Ĉ","Ḉ","€","Ć","С","©","Č"],
        "D":["Đ","Ď","D","ð"],
        "E":["ξ","Ē","∑","É","Ę","£","Ḝ","Σ","Έ","É","∑","З","Ě","Ε","€","∑","Є","Ế","E","Ë","Ē","Ә","Е","عỀ","Ĕ","Э","Ể","Э","Ễ","Є","ξ","Ė","Ê","€","Ę","Ё","È","ξ"],
        "F":["F","₣","₣","ƒ","ſ","f","ƒ"],
        "G":["Ģ","G","Ĝ","Ğ","Ġ","Ģ"],
        "H":["Н","Ĥ","Ħ","Ή","Њ","ŀl","Ή"],
        "I":["ĩ","أ","ï","Ị","î","Ĭ","І","ϊ","I","Į","Ї","î","I","į","ϊ","Í","ΐ","İ","Ϊ","í","Ĩ","ί","Ì","ĩ","ι","ì","Ī","Ï","Î","ī","ї","î","Ĭ","Ί","I","ĭ"],
        "J":["Ĵ","Ĳ","Ĵ","J"],
        "K":["Ķ","Ќ","Ҝ","₭","Ќ","Ķ","К","K","Ќ","К"],
        "L":["Ĺ","Ļ","Ľ","Ŀ","Ł","Ľ","L","Ł","ł","Ĺ","ζ","Ļ"],
        "M":["m", "₥"],
        "N":["Ņ","Ň","₦","Ŋ","Ń","И","Ņ","Ň","Ñ","Ŋ","Й","N"],
        "O":["Ø","Ǿ","Ō","Θ","Θ","Ό","Ở","Ŏ","Ó","Ø","Ờ","О","Ǿ","Ò","Ớ","Ő","Ổ","Ợ","Ô","Ở","Ọ","Ö","Ό","Ợ","Ō","Õ","θ","Ο"],
        "P":["ρ","Þ","ῥ","þ","Þ","р","ρ"],
        "Q":["Q","Œ","Ø","Ợ"],
        "R":["Ŗ","Ř","Я","®","R","Ŕ","Ŗ","Ř"],
        "S":["Š","ﮐ","ş","ﮚ","ﻯ","§","Š","§","S","Ś","Š","Ş","Ŝ"],
        "T":["Ŧ","†","Ť","T","Ţ","Ť","Ŧ"],
        "U":["Û","Ū","Џ","U","Ụ","Ủ","Ứ","Ừ","Ử","Ữ","Ự","Ù","Ú","Ц","Ü","Џ","U","Џ","Ũ","Ū","Ŭ","Ū","Ų","Ű","Ů"],
        //"V":,
        "W":["Ŵ","Ẁ","Ẃ","Ẅ","Ẅ","Ẃ","Ẁ","W","ŵ","Ŵ"],
        "X":["χ","Ҳ","ҳ","х","×"],
        "Y":["¥","Ў","۳","У","¥","¥","Ỵ","¥","Ў","Ϋ","Ύ","Ŷ","Ÿ","Ÿ","Ý","Ч","Ύ","Ỳ","Ÿ"],
        "Z":["ź","Ž","Ź"],
    }
    var toRu = {
        "А":"A", "Б":"B", "В":"B", "Г":"G", "Е":"E", "Ё":"E", "Ж":"J", "З":"Z",
        "И":"N", "Й":"N", "К":"K", "Л":"L", "М":"M", "Н":"H", "У":"Y", "Ф":"F",
        "Х":"X", "Ц":"U", "Ч":"Y", "Ш":"W", "Щ":"W", "Ъ":"B", "Ь":"B",
        "Э":"E", "Ю":"U", "Я":"R"
    }
    return new Array(param).fill(this.toUpperCase().split("")).map(function(a){
        return a.map(function(a){
            var a = (toRu[a]?toRu[a]:a);
            var a = (symboles[a]?symboles[a].random():a);
            return a;
        }).join("");
    }).join("\n");
};