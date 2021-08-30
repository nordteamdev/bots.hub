var access_token = '1fba8908beffb7ae165f8a8b0599129df6d1348df316d0ceba8c61ba613ee08cd28f0cd28cb34849c3bfb';
var access_token_2 = '47c5f83bfd18703ee040cc457006806ef7b0a98b9488305b574b59ce5125810f9d14c35df002d94f13b1d';
const request = require("request");
const os = require("os");
const punycode = require('punycode');
const readline = require('readline');
//var Canvas = require('canvas');
var colors = require('colors/safe');
var steam = require('steam-web');
var date = require('date-and-time');
var in_array = require('in_array');
var tcpp = require('tcp-ping');
const {exec} = require('child_process');
var VK = require("VK-Promise"),
    http = require("http"),
	   https = require("https"),
    tts_key = "8b2e2fd5-64c8-4b94-af99-dfbe0a0a5f3c",
    vk = new VK(access_token);
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'mrpickles1960',
database: 'Bot'
});
var s = new steam({
apiKey: '7120DB0648C20196C97DD1EE615BE329',
format: 'json'
});
var b = colors.black; 	// Черный
var r = colors.red; 	// Красный
var z = colors.green; 	// Зеленый
var y = colors.yellow; 	// Жёлтый
var B = colors.blue; 	// Синий
var m = colors.magenta; // Пурпуровый
var c = colors.cyan; 	// Голубой
var w = colors.white; 	// Белый
var g = colors.gray; 	// Серый
var G = colors.grey; 	// Пасмурный
var game = {}
var anti_spam = {}
var anti_spam_msgs = {}
var anti_spam_block = {}
var anti_spam_start = {}
var userid =451546864 ;
/*443243772*/
var stats = 0;
var sms_counts = 0;
var api = 0;
var seconds = 0;
var minute = 0;
var hours = 0;
var days = 0;
var friends_add = 0;
var friends_del = 0;
var add_chat = 0;
var create_chat = 0;

/*
 *
 * Технические работы
 *
 */

var debug = 0;
var debug_msg = '✖ Бот отключен на технические работы!';
var command_off = 0;

var piars = {};
setInterval(function(){
  exec("cd /root/bot/php/tmp && rm -rf *");
}, 600000); //раз в час очишять останки временых файлов
/*
 *
 * Технические работы
 *
 */

setInterval(function(){
var time = new Date();
var noww = date.format(time, 'HH:mm:ss');
vk("status.set", {text: " Принято: "+stats+" | Отправлено: "+sms_counts+" | ⏰ "+noww+" | 💡 Бот работает: дней: "+days+", часов: "+hours+", минут: "+minute});
++api
}, 60000)

setInterval(function(){
request.get("https://api.vk.com/method/account.setOnline?access_token="+access_token_2+"", function (e,r,b){});
request.get("https://api.vk.com/method/account.setOnline?access_token="+access_token+"", function (e,r,b){});
}, 60000)
setInterval(function(){
vk.friends.getRequests({extended: 0, need_mutual: 0, out: 0, count: 1}).then(function (r) {
if(r.items.length != 0){
vk.friends.add({user_id: r.items[0]});
++friends_add;
}}).catch(function (error){
console.log("Ошибка",error);
});
vk.friends.getRequests({extended: 0, need_mutual: 0, out: 1, count: 1}).then(function (res) {
if(res.items.length != 0){
vk.friends.delete({user_id: res.items[0]});
++friends_del;
}}).catch(function (error) {
console.log("Ошибка",error);
});
}, 2000)
setInterval(function(){
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
}, 1000)
console.log("Бот успешно запущен! test");
if(debug == 1){
console.log((r("Включен режим технических работ!")));
}
vk.init_longpoll();
vk.on("message",function (event, msg) {
connection.query("SELECT * FROM `bots` WHERE `bot_id`='"+msg.from_id+"'", function(gol, bid, bol){
if(bid[0] != null) return;
var cid = msg.peer_id;
var uid = msg.from_id;
var message = msg.body;
var mess_id = msg.id;
/*var time1 = new Date();
var noww1 = date.format(time1, 'HH:mm:ss');vk.users.get({
user_id: msg.from_id,
}).then(function(res) {
if(cid == uid){
console.log((w("(")) + (z(noww1)) + (w(") ")) + (w("(")) + (y("ID: "+uid+"")) + (w(") ")) + (w("(")) + (m(res[0].first_name+" "+res[0].last_name)) + (w(")")) + (w(" » ")) + (r(message)));
}else{
var chat_id = msg.peer_id - 2000000000
if(msg.action != null){
var action = msg.action;
var action_id = msg.action_mid;
}else{
if(message == ''){
}else{
console.log((w("(")) + (z(noww1)) + (w(") ")) + (w("(")) + (B(msg.title)) + (w(") ")) + (w("(")) + (G("CID: "+chat_id)) + (w(") ")) + (w("(")) + (y("ID: "+uid+"")) + (w(") ")) + (w("(")) + (m(res[0].first_name+" "+res[0].last_name)) + (w(")")) + (w(" » ")) + (r(message)));
}
}
}
});	*/

function ad(){
ad_msg = 'У бота появились привилегии. За покупкой писать [id244762915|Ивану Лису]\n\n';
return ad_msg;
}

function anti_spam_func(user_id_spam){
if(user_id_spam != 244762915){
if(anti_spam_start[user_id_spam] != 1){
anti_spam_start[user_id_spam] = 1;
var timers = setInterval(function(){
anti_spam_start[user_id_spam] = 0;
anti_spam_msgs[user_id_spam] = 0;
clearInterval(timers)
}, 60000)
}
if(anti_spam_block[user_id_spam] == 1) return true;
if(anti_spam_msgs[user_id_spam] > 8){
send('reply', "✖ Ошибка, вы пишите слишком много команд в минуту, начался игнор на две минуты!");
anti_spam_block[user_id_spam] = 1;
var test = setInterval(function(){
vk.users.get({user_id: user_id_spam}).then(function(res){
send('send', "✔ *id"+user_id_spam+" ("+res[0].first_name+"), игнор закончился, вы вновь можете пользоваться моими командами.");
});
anti_spam_block[user_id_spam] = 0;
anti_spam_msgs[user_id_spam] = 0;
clearInterval(test);
}, 120000)
return true;
}
if(anti_spam_msgs[user_id_spam] == null) anti_spam_msgs[user_id_spam] = 1; anti_spam_msgs[user_id_spam] += 1;
}
}

function send(vid, messagese, att){
++sms_counts;
msg.setActivity()
if(vid == 'send'){
msg.send(messagese, {attachment: att})
}else if(vid == 'reply'){
msg.reply(messagese, {attachment: att})
}
return;
}
var sms = msg.body.toLowerCase().split(" ");

if(msg.action == "chat_create"){
++create_chat;
send('send', '✨ Привет всем! Я рад что вы создали беседу, и не забыли обо мне.\n💻 Для тех кто меня не знает, я чат-бот MegaPlugBot\n⚡ Чтобы посмотреть весь список моих команд, используйте: /help, /cmd, /помощь\n\n🐩 Мой разработчик: *id244762915 (Иван Лис)\n📢 Моя группа: vk.com/megaplugbot');
return;
}
if(msg.action == "chat_title_update" && msg.chat_id == 264 && msg.title != "ⓜⓔⓖⓐⓟⓛⓤⓖ  ➽ⓑⓞⓣ ►"){
msg.editChat("MegaPlugBot ►");
return;
}
connection.query("SELECT * FROM `chat_titles` WHERE `chat_id`='"+msg.chat_id+"'", function(error, result, fields){
if(msg.action == "chat_title_update" && result[0] != null){
if(result[0].chat_title != msg.title){
var title = result[0].chat_title;
msg.editChat(''+title+'');
}
}
})
if (msg.action == "chat_kick_user" && msg.from_id !== userid){
vk.users.get({
user_id: msg.action_mid,
}).then(function(res) {
send('send', '📢 '+res[0].first_name + ' '+res[0].last_name+' нас покинул, а пока вы можете использовать мои команды: /help'); //хрень
});
}
if(msg.action == "chat_invite_user" && msg.from_id !== userid){
if(msg.action_mid == userid){
++add_chat;
}
if(msg.chat_id == 264 && msg.from_id != 244762915 && msg.from_id != msg.action_mid){
msg.removeChatUser(msg.action_mid)
return;
}
vk.users.get({
user_id: msg.action_mid,
fields: 'sex'
}).then(function(res) {
var sex = res[0].sex;
if(sex == 1) n = 'попала';
if(sex == 2) n = 'попал';
connection.query("SELECT * FROM `chat_hello` WHERE `chat_id`='"+msg.chat_id+"'", function(error, result, fields){
if(result[0] != null){
send('send', '🌴 Добро пожаловать на борт [id' + res[0].id + '|' + res[0].first_name + ' ' + res[0].last_name + ']!\n✨ Ты '+n+' в беседу «'+msg.title+'», чтобы посмотреть мои команды используй: /help\n\n💡 Сообщение от создателя беседы:\n'+result[0].chat_hello_message+'');
}else{
send('send', '🌴 Добро пожаловать на борт [id' + res[0].id + '|' + res[0].first_name + ' ' + res[0].last_name + ']!\n✨ Ты '+n+' в беседу «'+msg.title+'», чтобы посмотреть мои команды используй: /help\n\n🐩 Чтобы создать сообщение для новичков используйте /hello [текст]');
}
})
});
}
if(msg.out)return;
++stats;
++api;
if(command_off == 1) return;

	if(game[msg.peer_id] != null){
	var gg_wp = game[msg.peer_id].split("_");
	if(sms[0] == gg_wp[3]){
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
		connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
	if(result[0] == null){
		send('reply', "✖ Ошибка, вы не зарегистрированы! /create [ник]");
	return;
	}
	var moneys = result[0].money;
		connection.query("UPDATE `accounts` SET `money` = money+"+gg_wp[4]+" WHERE `id` = '"+msg.from_id+"'");
		connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
	var money = result[0].money;
		send('send', ""+ad()+"✔ Вы успешно решили пример!\n💡 Пример: "+gg_wp[0]+" "+gg_wp[2]+" "+gg_wp[1]+" = "+gg_wp[3]+"\n💰 Награда: "+gg_wp[4]+" монет\n⚡ Баланс: "+money+" монет");
		game[msg.peer_id] = null;
	})
	return;
	})
	})
	}
	}

	/*f(sms[0] == "/urldecode"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var url_s = msg.body.replace(msg.body.split(" ")[0], "");
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == ""){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
        if(sms[1] == ""){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
		return;
		}
		    send('send', decodeURIComponent(url_s));
	})})
	return;
	}*/

	if(sms[0] == "/urlencode"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var url_s = msg.body.replace(msg.body.split(" ")[0], "");
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == ""){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
        if(sms[1] == ""){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
		return;
		}
		url = encodeURIComponent(url_s);
		send('send', url);
	})})
	return;
	}
    if(sms[0] == "/convert" || sms[0] == "/phar" || sms[0] == "/zip"){
      //говно минутка
      if(anti_spam_func(msg.from_id) == true) return;
      var url_s = msg.body.replace(msg.body.split(" ")[0], "");
      connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result1, fields){
        if(result1[0] != null) return;

    connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
      if(result[0] == undefined){
        send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
        return;
      }
      if( result[0].user_use <= 0){
        send('reply', "✖ Увы, но у вас кончились использования!", "photo-153396867_456239018");
        return;
      }



      //КОНЕЦ говна
      exec("cd php && php pharConverter.php "+access_token+ " 1 " + msg.attachments + " " + msg.peer_id + " " + msg.id + " " + result[0].user_use, (err, stdouts, stderrs) => { //костыль продакшен
      if (err) {
        throw err;
      }

      if(stdouts == "converted"){
          /*connection.query("UPDATE `accounts` SET `user_use` = user_use - 1 WHERE `id` = '"+msg.from_id+"'");
          var use = result[0].user_use;
          use = use - 1;
          send('reply', "У вас ещё осталось "+use+" использываний");*/

      }
    });
  });
});
        }
        if((sms[0] == "кто" && sms[1] == "тут") || (sms[2] == "теперь" && sms[3] != undefined) ){
        var sms = msg.body.toLowerCase().split(" ");
        if(anti_spam_func(msg.from_id) == true) return;
        var url_s = msg.body.replace(msg.body.split(" ")[0], "");
        connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result1, fields){
          if(result1[0] != null) return;

      connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
        if(result[0] == undefined){
          send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
          return;
        }
        var sms = msg.body.toLowerCase().split(" ");
        if(sms[2] == "теперь" && sms[3] != undefined){
          var sms = msg.body.split(" ");
          exec("cd php && php nicknames.php  1 " + sms[0] + " " + sms[1] + " " + sms[3] + " " + msg.peer_id + " " + msg.chat_id, (err, stdouts, stderrs) => {
          if (err) {
            throw err;
          }

          console.log(stdouts);
        });

        }

        if(sms[0] == "кто" && sms[1] == "тут"){
            var sms = msg.body.split(" ");
          exec("cd php && php nicknames.php  2 " + sms[0] + " " + sms[1] + " " + sms[3] + " " + msg.peer_id + " " + msg.chat_id + " " + sms[2] , (err, stdouts, stderrs) => {
          if (err) {
            throw err;
          }

          console.log(stdouts);
        });
              }
    });
  });
}


        var sms = msg.body.toLowerCase().split(" ");
	if(sms[0] == "/editnick" || sms[0] == "/setnick" || sms[0] == "/nick" || sms[0] == "/ник"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var nick = msg.body.split(" ")[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm < 1) return send('reply', "✖ Ошибка, у вас недостаточно прав для использования данной команды!");
        if(nick == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ник]");
		return;
		}
        if(nick == result[0].nick){
            send('reply', "✖ Ошибка, это уже ваш ник!");
        return;
		}
		if(!nick.match(/^[A-Z0-9]+$/i)){
		    send('reply', "✖ Ошибка, ник должен состоять из цифр, и Английских букв!");
	    return;
		}
		if(nick.length < 4 || nick.length > 15){
		    send('reply', "✖ Ошибка, ник должен быть не длиннее 15 символов, и не короче 4!");
		return;
		}
		connection.query("SELECT * FROM `accounts` WHERE `nick`='"+nick+"'", function(error, result, fields){
		if(result[0] != null){
            send('reply', "✖ Ошибка, данный ник занят другим пользователем!");
		return;
		}
		    connection.query("UPDATE `accounts` SET `nick` = '"+nick+"' WHERE `id` = '"+msg.from_id+"'");
			send('send', ""+ad()+"✔ Выполнено, вы успешно сменили ник, теперь ваш ник "+nick+"!");
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/vip" || sms[0] == "/вип"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		    send('send', ""+ad()+"🎩 Описание привилегии вип:\n⚡ Права на команды:\n✨ /editnick [ник] -- Изменить свой ник\n💶 /setmoney [сумма] -- Установка своего баланса\n\n💰 Стоимость: 50 рублей\n💡 Если вы хотите купить данную привилегию пишите разработчику бота: vk.com/null.ivan.null");
	})
	})
	return;
	}

	if(sms[0] == "/kick" || sms[0] == "/кик"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    var id = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав для использования данной команды!");
		if(msg.chat_id != 264) return msg.removeChatUser(userid);
		if(id == null) return send('reply', "✖ Ошибка, используйте: "+sms[0]+" [айди]");
		    msg.removeChatUser(id);
		vk.users.get({
            user_id: id
        }).then(function(res) {
			send('send', ""+ad()+"✔ Выполнено, пользователь *id"+id+" ("+res[0].first_name+" "+res[0].last_name+") успешно кикнут.")
		})
	})
	})
	return;
	}

	if(sms[0] == "/invite" || sms[0] == "/пригласи"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    var id = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав для использования данной команды!");
		if(id == null) return send('reply', "✖ Ошибка, используйте: "+sms[0]+" [айди]");
		    request.get("https://api.vk.com/method/friends.areFriends?user_ids="+id+"&access_token="+access_token+"&v=5.15", function (e,r,b){
        var data = JSON.parse(b);
	    if(data.error != null) return;
        var is = data.response[0].friend_status;
        if(is != 3 && msg.from_id != '439615678'){
            msg.reply("✖ Ошибка, данного пользователя нету у меня в друзьях.");
        return;
		}
		    msg.addChatUser(id);
		vk.users.get({
            user_id: id
        }).then(function(res) {
			send('send', ""+ad()+"✔ Выполнено, пользователь *id"+id+" ("+res[0].first_name+" "+res[0].last_name+") успешно приглашен.")
		})
		})
	})
	})
	return;
	}

	if(sms[0] == "/money" || sms[0] == "/balance" || sms[0] == "/mymoney" || sms[0] == "/баланс"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;


		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		    send('send', ""+ad()+"📍 Ваш ник: "+result[0].nick+"\n💰 Ваш баланс: "+result[0].money+" монет");
	})
	})
	return;
	}

	if(sms[0] == "/document" || sms[0] == "/док" || sms[0] == "/документ" || sms[0] == "/documentument"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

		var docse = msg.body.replace(msg.body.split(" ")[0], '');
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(docse == ''){
		    send('reply', "✖ Ошибка, используйте: "+sms[0]+" [название]");
		return;
		}
		if(result[0].user_use == null){
		    connection.query("UPDATE `accounts` SET `user_use` = '10' WHERE `id` = '"+msg.from_id+"'");
		}
		    connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
        if(result[0].user_use <= 0){
		    send('reply', "✖ Увы, но у вас кончились использования!", "photo-153396867_456239018");
        }else{
		vk.docs.search({q: docse, count: 200, v: 5.69}).then(function (resuo) {
		var docss = resuo.items;

		if(docss.length > 4){
		var offset = getRandomInt(0, docss.length);
		}else{
		var offset = 0;
		}
        vk.docs.search({
        q: docse,
		count: 5,
		offset: offset,
		v: 5.69
        }).then(function (res) {
		if(!res.items[0]) return send('reply', "✖ Ошибка, по вашему запросу документов не найдено");
		var docses = res.items;
		    connection.query("UPDATE `accounts` SET `user_use` = user_use - 1 WHERE `id` = '"+msg.from_id+"'");
		    var use = result[0].user_use - 1;
			if(docses.length == 1){
			var doc = 'документ';
			}else if(docses.length >= 5){
			var doc = 'документов';
			}else{
			var doc = 'документа';
			}
			send('send', ""+ad()+"🎫 У вас осталось: "+use+" использований.\n🔎 Найдено "+docss.length+" документов\n📕 Показано " + docses.length + " "+doc+":", docses.map(a=> "doc" + a.owner_id + "_" + a.id).join(','));
        })
		});
		}
		})
		})
		})
	return;
	}

	if(sms[0] == "/видос" || sms[0] == "/видосы" || sms[0] == "/видео" || sms[0] == "/video"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

		var video = msg.body.replace(msg.body.split(" ")[0], '');
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(video == ''){
		    send('reply', "✖ Ошибка, используйте: "+sms[0]+" [название]");
		return;
		}
		if(sms[1].match(/^\/?(сиски|tits|brazzers|porn|dick|хентай|сосет|порно|пизда|хуй|секс|шлюха|пидор|пидар|педик|гомик|гомосек|гей|геи|трахаться|трах|ебля|пориво|голые|член|пенис|вагина|титьки|сиськи)/i)){
		if(result[0].perm < 1){
			send('reply', "✖ Ошибка, у вас должна быть привилегия 'VIP', и выше, для поиска данных видео.");
        return;
		}
		}
		if(result[0].user_use == null){
		    connection.query("UPDATE `accounts` SET `user_use` = '10' WHERE `id` = '"+msg.from_id+"'");
		}
		    connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
        if(result[0].user_use <= 0){
		    send('reply', "✖ Увы, но у вас кончились использования!", "photo-153396867_456239018");
        }else{
		vk.video.search({
        q: video,
		count: 200,
		}).then(function (resuo) {
		var videose = resuo.items;

        vk.video.search({
        q: video,
		count: 4,
		offset: getRandomInt(0, videose.length),
        adult: 0,
		sort: 2,
		v: 5.69
        }).then(function (res) {
		if(!res.items[0]) return send('reply', "✖ Ошибка, по вашему запросу видео не найдено");
		var videos = res.items;
		    connection.query("UPDATE `accounts` SET `user_use` = user_use - 1 WHERE `id` = '"+msg.from_id+"'");
		    var use = result[0].user_use - 1;
			send('send', ""+ad()+"🎫 У вас осталось: "+use+" использований.\n📹 Найдено " + videos.length + " видео:", videos.map(a=> "video" + a.owner_id + "_" + a.id).join(','));
        })
		});
		}
		})
		})
		})
	return;
	}

	if(sms[0] == "/lottery" || sms[0] == "/game" || sms[0] == "/lotery" || sms[0] == "/ivanlis"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

		var money = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(money == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ставка]");
		return;
		}
		if(!Number(money)){
			send('reply', "✖ Ошибка, ставка должна быть из цифр!");
		return;
		}
		if(money < 1){
		    send('reply', "✖ Ошибка, ставка должна быть не меньше 1 монеты!");
		return;
		}
		if(result[0].money < money){
			send('reply', "✖ Ошибка, на вашем счету недостаточно монет!");
	    return;
		}
		var random = getRandomInt(1, money * 2);
		if(random <= money){
		var smile = '🐩';
		}else{
		var smile = '💥';
		}
		connection.query("UPDATE `accounts` SET `money` = money-"+money+" WHERE `id` = '"+msg.from_id+"'");
		connection.query("UPDATE `accounts` SET `money` = money+"+random+" WHERE `id` = '"+msg.from_id+"'");
		connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		    send('send', ""+ad()+"📍 Лотерея: \n"+smile+" Выигрышь: "+random+" монет\n💸 Ставка: "+money+" монет\n💰 Баланс: "+result[0].money+" монет");
		})
		})
		})
	return;
	}

	if(sms[0] == "/url" || sms[0] == "/ссылка"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;


		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(sms[1] == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ссылка]");
	    return;
		}
		    request.get("https://api.vk.com/method/utils.checkLink?url="+sms[1]+"&access_token="+access_token+"&v=5.69", function (e,r,b){
		var data = JSON.parse(b);
		if(data.error != null) return send('reply', "✖ Ошибка, что-то пошло не так, попробуйте ввести данную команду позже!");
		var status_link = data.response.status;
        if(status_link == "banned"){
           send('reply', "✖ Ошибка, данная ссылка заблокирована!");
        return;
		}
		    request.get("https://api.vk.com/method/utils.getShortLink?url="+sms[1]+"&private=0&access_token="+access_token+"&v=5.69", function (e,r,b){
		var data = JSON.parse(b);
		if(data.error != null) return send('reply', "✖ Ошибка, что-то пошло не так, попробуйте ввести данную команду позже!");
		var url = data.response.short_url;
		   send('send', ""+ad()+"✔ Выполнено, ссылка успешно сокращена, вот она: "+url+"");
		})
		})
		})
		})
	return;
	}

	if(sms[0] == "/math" || sms[0] == "/пример"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(game[msg.peer_id] == null){
		var game_vid = getRandomInt(0, 2);
		if(game_vid == 0){
		var one = getRandomInt(1, 1000);
		var two = getRandomInt(1, 1000);
		var zna = '+';
		var otv = eval(one+""+zna+""+two+"");
		var nag = getRandomInt(1, 100);
		}else if(game_vid == 1){
		var one = getRandomInt(1, 10);
		var two = getRandomInt(1, 10);
		var zna = '*';
		var otv = eval(one+""+zna+""+two+"");
		var nag = getRandomInt(1, 100);
		}else if(game_vid == 2){
		var one = getRandomInt(1, 10000);
		var two = getRandomInt(1, 9999);
		var zna = '-';
		var otv = eval(one+""+zna+""+two+"");
		var nag = getRandomInt(1, 100);
		}
		game[msg.peer_id] = ""+one+"_"+two+"_"+zna+"_"+otv+"_"+nag+"";
		var gg_wp = game[msg.peer_id].split("_");
		send('send', ""+ad()+"💡 Пример 💡\n\n➡ "+gg_wp[0]+" "+gg_wp[2]+" "+gg_wp[1]+" = ?\n💰 Награда: "+gg_wp[4]+" монет\n📎 Чтобы ответить просто напишите ответ в сообщении");
		}else{
		var gg_wp = game[msg.peer_id].split("_");
		send('send', ""+ad()+"❗ Пример ❗\n\n➡ "+gg_wp[0]+" "+gg_wp[2]+" "+gg_wp[1]+" = ?\n💰 Награда: "+gg_wp[4]+" монет\n📎 Чтобы ответить просто напишите ответ в сообщении");
		}
	    });
	    });
	return;
	}

    if(sms[0] == "/create" || sms[0] == "/reg" || sms[0] == "/create" || sms[0] == "/рег"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var nick = msg.body.split(" ")[1];
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] != null){
			send('reply', "✖ Ошибка, у вас уже есть аккаунт!");
		return;
		}
        if(nick == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ник]");
		return;
		}
		if(!nick.match(/^[A-Z0-9]+$/i)){
		    send('reply', "✖ Ошибка, ник должен состоять из цифр, и Английских букв!");
	    return;
		}
		if(nick.length < 4 || nick.length > 15){
		    send('reply', "✖ Ошибка, ник должен быть не длиннее 15 символов, и не короче 4!");
		return;
		}
		connection.query("SELECT * FROM `accounts` WHERE `nick`='"+nick+"'", function(error, result, fields){
		if(result[0] != null){
            send('reply', "✖ Ошибка, данный ник уже зарегистрирован!");
		return;
		}
		connection.query("SELECT * FROM `id`", function(errors, results, fieldss){
	    var id = results[0].id + 1;
		connection.query("UPDATE `id` SET `id` = '"+id+"'");
		    connection.query("INSERT INTO `accounts` (`access_level`, `status`, `nick`, `id`, `id_reg`, `money`, `perm`, `user_use`) VALUES ('0', '1', '"+nick+"', '"+msg.from_id+"', '"+id+"', '1000', '0', '10')");
            send('send', ""+ad()+"Привет "+nick+", я создала тебе аккаунт на котором 1000 монет!")
		});
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/hello"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var messagess = msg.body.replace(msg.body.split(" ")[0], "");
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(msg.chat_id == null){
			send('reply', "✖ Ошибка, используйте данную команду в беседе!");
		return;
		}
		connection.query("SELECT * FROM `chat_hello` WHERE `chat_id`='"+msg.chat_id+"'", function(errors, results, fieldss){
		if(results[0] == null && messagess == ''){
		    send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
		return;
		}else if(messagess == ''){
			send('reply', "💡 Чтобы поменять сообщение для новичков используйте: /hello [текст]\n\n📍 Текущее сообщение для новичков:\n"+results[0].chat_hello_message+"");
	    return;
		}
		vk.messages.getChat({
			chat_id: msg.chat_id,
		}).then(function (res) {
		if(res.admin_id != msg.from_id && msg.from_id != 244762915) return send('reply', "✖ Ошибка, вы не создатель беседы!");
		if(messagess.length > 1500) return send('send', ""+ad()+"✖ Ошибка, сообщение должно быть не длиннее 1500 символов! (В вашем сообщении "+messagess.length+" символов)");
	    if(results[0] == null){
			connection.query("INSERT INTO `chat_hello` (`chat_id`, `chat_hello_message`) VALUES ('"+msg.chat_id+"', '"+messagess+"')");
		}else{
			connection.query("UPDATE `chat_hello` SET `chat_hello_message` = '"+messagess+"' WHERE `chat_id` = '"+msg.chat_id+"'");
		}
			send('send', ""+ad()+"✔ Выполнено, вы успешно создали сообщение для новичков!");
		})})})})
    return;
	}

    if(sms[0] == "/scan"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

		var test = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(test == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [id беседы]");
		return;
		}
		if(result[0].scan != "true"){
			send('reply', "✖ Ошибка, для использования данной команды надо купить товар 'Сканер бесед'!");
		return;
		}
	    if(test.length == 0) return send('send', msg.chat_id);
		vk.messages.getChat({
			chat_id: test,
			fields: "sex"
		}).then(function (res) {
		if(!res.users[0] || test == 1) return send('send', ""+ad()+"✖ Ошибка, меня кикнули из этой беседы");
		var chusers = res.users;
		var admins = res.admin_id;
		var num = 0;
		vk("users.get", {user_ids: admins}).then(function (ress){
			send('send', ""+ad()+"💡 Название беседы: "+res.title+"\n🐩 Создатель беседы: [id"+res.admin_id+"|" + ress[0].first_name + " " + ress[0].last_name + "]\n⚡ Пользователи беседы: \n " + chusers.map(a=> ""+ ++num +" *id" + a.id + "(" + a.first_name + " " + a.last_name + ")").join('\n'));
		});
		}).catch(function (error) {
		if(error.error != null){
		if(error.error.error_code == 100) return send('send', ""+ad()+"✖ Ошибка, такой беседы не существует");
		return;
		}
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/buy" || sms[0] == "/купить"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

	    var item_id = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(item_id == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [номер товара]");
		return;
		}
		if(item_id == 1){
		if(result[0].money < 1100){
			send('reply', "✖ Ошибка, на вашем счету недостаточно монет!");
		return;
		}
		    connection.query("UPDATE `accounts` SET `money` = money-1100, `scan`='true' WHERE `id` = '"+msg.from_id+"'");
			send('send', ""+ad()+"✔ Вы успешно преобрели товар 'Сканер бесед'\n➡ Для сканирования бесед используйте: /scan [id беседы]!");
		return;
		}else if(item_id == 3){
		if(result[0].money < 5000){
			send('reply', "✖ Ошибка, на вашем счету недостаточно монет!");
		return;
		}
		    connection.query("UPDATE `accounts` SET `money` = money-5000, `user_use` = user_use+30 WHERE `id` = '"+msg.from_id+"'");
			send('send', ""+ad()+"✔ Вы успешно преобрели товар '30 использований'\n➡ Использования успешно выданы!");
		}else if(item_id == 2){
		if(msg.chat_id == null){
			send('reply', "✖ Ошибка, используйте данную команду в беседе!");
		return;
		}
		if(result[0].money < 3300) return send('reply', "✖ Ошибка, на вашем счету недостаточно монет!");
		    request.get("https://api.vk.com/method/messages.getChat?access_token="+access_token+"&chat_id="+msg.chat_id+"&v=5.69", function(e,r,b){
        var data = JSON.parse(b);
        var admin = data.response.admin_id;
		if(admin != msg.from_id && msg.from_id != 244762915) return send('reply', "✖ Ошибка, вы не создатель беседы!");
		    connection.query("UPDATE `accounts` SET `money` = money-3300 WHERE `id` = '"+msg.from_id+"'");
			connection.query("SELECT * FROM `chat_titles` WHERE `chat_id`='"+msg.chat_id+"'", function(errors, results, fieldss){
	    if(results[0] == null){
			connection.query("INSERT INTO `chat_titles` (`chat_id`, `chat_title`) VALUES ('"+msg.chat_id+"', '"+msg.title+"')");
		}else{
			var title = msg.title.replace(/\./g, "_");
			connection.query("UPDATE `chat_titles` SET `chat_title` = '"+title+"' WHERE `chat_id` = '"+msg.chat_id+"'");
		}
			send('send', ""+ad()+"✔ Вы успешно преобрели товар 'Заблокировать название беседы'\n➡ Название успешно заблокаировано!\n💡 Чтобы разблокировать название беседы используйте: /unlock");
		})})
		}else{
			send('reply', "✖ Ошибка, данного товара несуществует!");	
		}
	    });
	    });
	return;
	}

	if(sms[0] == "/shop" || sms[0] == "/shopping" || sms[0] == "/магаз" || sms[0] == "!shop"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			send('send', ""+ad()+"&#4448;&#4448;&#4448;&#4448;&#4448;&#4448;🛒 Магазин 🛒\n\n➡ Товар: 'Сканер бесед'\n💰 Цена: 1100 монет\n📍 Номер: 1\n\n➡ Товар: 'Заблокировать название беседы'\n💰 Цена: 3300 монет\n📍 Номер: 2\n\n➡ Товар: '30 использований'\n💰 Цена: 5000 монет\n📍 Номер: 3\n\n💡 Чтобы купить товар используйте: /buy [номер товара]")
		});
	    });
	return;
	}

	if(sms[0] == "/casino" || sms[0] == "/казино"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
		if(anti_spam_func(msg.from_id) == true) return;
		var text = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(text == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ставка]");
		return;
		}
		if(text > result[0].money){
			send('reply', "✖ Ошибка, на вашем счету недостаточно монет!");
		return;
		}
		if(!Number(text) || sms[0].match(/^\?([?]|[-]|[+]|[*]|[/])/i)){
			send('reply', "✖ Ошибка, ставка должна быть из цифр!");
		return;
		}
		if(text <= 1){
			send('reply', "✖ Ошибка, ставка должна быть не меньше 2 монет!");
		return;
		}
			var spot1 = getRandomInt(1, 3);
	    if(spot1 == 1){
		var spot1 = '🎁';
		var win_1 = '1';
		}else if(spot1 == 2){
		var spot1 = '🍊';
		var win_1 = '2';
		}else if (spot1 == 3){
		var spot1 = '🍋';
		var win_1 = '3';
		}else if(spot1 == 4){
		var spot1 = '💎';
		var win_1 = '4';
		}else if(spot1 == 5){
		var spot1 = '💣';
		var win_1 = '5';
		}
			var spot2 = getRandomInt(1, 3);
		if(spot2 == 1){
		var spot2 = '🎁';
		var win_2 = '1';
		}else if(spot2 == 2){
		var spot2 = '🍊';
		var win_2 = '2';
		}else if(spot2 == 3){
		var spot2 = '🍋';
		var win_2 = '3';
		}
			var spot3 = getRandomInt(1, 3);
        if(spot3 == 1){
		var spot3 = '🎁';
		var win_3 = '1';
		}else if(spot3 == 2){
		var spot3 = '🍊';
		var win_3 = '2';
		}else if (spot3 == 3){
		var spot3 = '🍋';
		var win_3 = '3';
		}
		if(win_1 == 1 && win_2 == 1 && win_3 == 1){
		var win = text * 1;
		var moneys = result[0].money + win;
			send('send', ""+ad()+"&#4448;&#4448;&#4448;[ "+spot1+" | "+spot2+" | "+spot3+" ]\n✔ Вы выиграли 'x1' ставку!\n➡ Ставка: "+text+" монет\n💡 Выигрышь: "+win+" монет\n💰 Баланс: "+moneys+" монет");
		}else if(win_1 == 2 && win_2 == 2 && win_3 == 2){
		var win = text * 3;
		var moneys = result[0].money + win;
		connection.query("UPDATE `accounts` SET `money` = '"+moneys+"' WHERE `id` = '"+msg.from_id+"'");
			send('send', ""+ad()+"&#4448;&#4448;&#4448;[ "+spot1+" | "+spot2+" | "+spot3+" ]\n✔ Вы выиграли 'x3' ставку!\n➡ Ставка: "+text+" монет\n💡 Выигрышь: "+win+" монет\n💰 Баланс: "+moneys+" монет");
		}else if(win_1 == 3 && win_2 == 3 && win_3 == 3){
		var win = text * 5;
		var moneys = result[0].money + win;
		connection.query("UPDATE `accounts` SET `money` = '"+moneys+"' WHERE `id` = '"+msg.from_id+"'");
		    send('send', ""+ad()+"&#4448;&#4448;&#4448;[ "+spot1+" | "+spot2+" | "+spot3+" ]\n✔ Вы выиграли 'x5' ставку!\n➡ Ставка: "+text+" монет\n💡 Выигрышь: "+win+" монет\n💰 Баланс: "+moneys+" монет");
		}else{
		var moneys = result[0].money - text;
		connection.query("UPDATE `accounts` SET `money` = '"+moneys+"' WHERE `id` = '"+msg.from_id+"'");
		    send('send', ""+ad()+"&#4448;&#4448;&#4448;[ "+spot1+" | "+spot2+" | "+spot3+" ]\n✖ К сожалению вы проиграли!\n➡ Ставка: "+text+" монет\n💰 Баланс: "+moneys+" монет");
		}
	    });
	    });
	return;
	}

	if(sms[0] == "/ban" || sms[0] == "/бан"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var uid = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm < 2){
		    send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
	    return;
		}
		if(uid == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [id]");
		return;
		}
		    connection.query("SELECT * FROM `accounts` WHERE `id`='"+uid+"'", function(error, results, fields){
		if(results[0] == null){
		var perm = 0;
		}else{
		var perm = results[0].perm;
		}
        if(1 <= perm && result[0].perm < 2){
            send('send', ""+ad()+"✖ Ошибка, нельзя банить пользователей с привилегией 'VIP' и выше!")
        }else{
            connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+uid+"'", function(errorss, resultss, fieldsss){
		if(resultss[0] == null){
		    connection.query("INSERT INTO `users_ban` (`user_id`) VALUES ('"+uid+"')");
		vk.users.get({
            user_ids: uid
        }).then(function (res) {
			send('send', ""+ad()+"✔ Вы успешно заблокировали пользователя: *id"+uid+" ("+res[0].first_name+" "+res[0].last_name+")");
		});
		}else{
		vk.users.get({
            user_ids: uid
        }).then(function (res) {
			send('send', ""+ad()+"✖ Ошибка, пользователь *id"+uid+" ("+res[0].first_name+" "+res[0].last_name+") уже заблокирован!");
		});
		}
		})
        }
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/pardon" || sms[0] == "/разбан" || sms[0] == "/пардон"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var uid = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(uid == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [id]");
		return;
		}
		if(result[0].perm < 2){
		    send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
	    return;
		}
		    connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+uid+"'", function(errorss, resultss, fieldsss){
		if(resultss[0] != null){
		    connection.query("DELETE FROM `users_ban` WHERE `user_id`='"+uid+"'");
		vk.users.get({
            user_ids: uid
        }).then(function (res) {
			send('send', ""+ad()+"✔ Вы успешно разблокировали пользователя: *id"+uid+" ("+res[0].first_name+" "+res[0].last_name+")");
		});
		}else{
		vk.users.get({
            user_ids: uid
        }).then(function (res) {
			send('reply', "✖ Ошибка, пользователь *id"+uid+" ("+res[0].first_name+" "+res[0].last_name+") не был забанен!");
		});
		}
		})
		});
	    });
	return;
	}

	if(sms[0] == "/info" || sms[0] == "/infoserv" || sms[0] == "/mcpe" || sms[0] == "/server"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var ip = sms[1];
		var port = sms[2];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
	        connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(ip == null || port == null){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ip] [port]");
	    return;
		}
		    request.get("https://use.gameapis.net/mcpe/query/extensive/"+ip+":"+port+"", function (e,r,b){
        var data = JSON.parse(b);
		var status = data.status;
		    if(status == false || ip.match(/^[а-яА-Я]+$/i) || port.match(/^[а-яА-Я]+$/i)){
			   send('reply', "✖ Ошибка, данный сервер выключен!");
			return;
			}
		var software = data.software;
		var online = data.players.online;
		var max = data.players.max;
		var map = data.map;
		var plug = data.plugins;
		var ver = data.version;
		var motd = data.motd;
		var not_motd = motd.replace(/(§1|§2|§3|§4|§5|§6|§7|§8|§9|§0|§a|§e|§r|§c|§b|§l|§i|§o|§k|§f|§d)/g, "");
		if(plug == null || plug == software){
		    send('send', ""+ad()+"✨ Сервер: "+ip+" "+port+"\n💎 Название: "+motd+"\n⚡ Название (без §): "+not_motd+"\n💡 Карта: "+map+"\n🐩 Онлайн: ("+online+"/"+max+")\n📊 Версия: "+ver+"\n💣 Ядро: "+software+"\n📡 Плагины: Скрыты");
		return;
		}
		var plugins = plug.join('\n📎 ');
		var plugins = plugins.replace(software, "");
		var count = plug.length;
		    send('send', ""+ad()+"✨ Сервер: "+ip+" "+port+"\n💎 Название: "+motd+"\n⚡ Название (без §): "+not_motd+"\n💡 Карта: "+map+"\n🐩 Онлайн: ("+online+"/"+max+")\n📊 Версия: "+ver+"\n💣 Ядро: "+software+"\n⚡ Кол-во плагинов: "+count+"\n📡 Плагины:\n📎 "+plugins+"");
		});
		});
	    });
	return;
	}

	if(sms[0] == "/set" || sms[0] == "/setmoney" || sms[0] == "/сет"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var count = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
		    connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(count == null || !Number(count)){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [сумма]");
	    return;
		}
		if(result[0].perm < 1){
			send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
		return;
		}
		if(count >= 50000000){
		if(result[0].perm != 2){
			send('reply', "✖ Ошибка, вы не можете сетать столько монет!");
		return;
		}
		}
		    send('send', ""+ad()+"✔ Вы успешно установили свой баланс на "+count+" монет");
			connection.query("UPDATE `accounts` SET `money` = '"+count+"' WHERE `id` = '"+msg.from_id+"'");
	    });
	    });
	return;
	}

	if(sms[0] == "/account" || sms[0] == "/ac" || sms[0] == "/профиль" || sms[0] == "/profile"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm == 2){
		var perm = 'Создатель';
		}else if(result[0].perm == 1){
		var perm = 'VIP';
	    }else{
		var perm = 'Пользователь';
		}
		vk.friends.get({
            user_id: msg.from_id,
        }).then(function (friend) {
		var friends = friend.items.length;
		vk.users.get({
            user_ids: msg.from_id,
		    fields: "photo_id,has_photo,photo_200,status,followers_count"
        }).then(function (res) {
		var pid = res[0].photo_id;
		if(pid == null){
		var likes = "✖";
		if(res[0].status == ''){
		var status = '✖';
		}else{
		var status = res[0].status;
		}
		    https.get(res[0].photo_200, function(stream){
		    stream.filename = 'avas.jpg';
		    vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
	        files:{file:stream}}).then(function (r){
		    send('send', ""+ad()+"💭 Информация о аккаунте:\n📝 Ты: "+res[0].first_name+" "+res[0].last_name+"\n💡 Номер аккаунта: "+result[0].id_reg+"\n🎫 Использований: "+result[0].user_use+"\n💎 Привилегия: "+perm+"\n💰 Баланс: "+result[0].money+"\n📋 Ник: "+result[0].nick+"\n🤝 Друзей: "+friends+"\n👫 Подписчиков: "+res[0].followers_count+"\n♥ Лайков на аве: "+likes+"\n💬 Статус: "+status+"", "photo"+r[0].owner_id+"_"+r[0].id);
		})
		});
		}else{
		var pid = res[0].photo_id;
		var photo_id = pid.split("_");
		    request.get("https://api.vk.com/method/likes.getList?type=photo&owner_id="+msg.from_id+"&item_id="+photo_id[1]+"", function (e,r,b){
        var data = JSON.parse(b);
		var likes = data.response.count;
		if(res[0].status == ''){
		var status = '✖';
		}else{
		var status = res[0].status;
		}
		    https.get(res[0].photo_200, function(stream){
		    stream.filename = 'avas.jpg';
		    vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
	        files:{file:stream}}).then(function (r){
		    send('send', ""+ad()+"💭 Информация о аккаунте:\n📝 Ты: "+res[0].first_name+" "+res[0].last_name+"\n💡 Номер аккаунта: "+result[0].id_reg+"\n🎫 Использований: "+result[0].user_use+"\n💎 Привилегия: "+perm+"\n💰 Баланс: "+result[0].money+"\n📋 Ник: "+result[0].nick+"\n🤝 Друзей: "+friends+"\n👫 Подписчиков: "+res[0].followers_count+"\n♥ Лайков на аве: "+likes+"\n💬 Статус: "+status+"", "photo"+r[0].owner_id+"_"+r[0].id);
		})
		});
        });
		}
		})});
	    });
	    });
	return;
	}

	if(sms[0] == "/lock" || sms[0] == "/лок" || sms[0] == "/заблочить"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
		    connection.query("SELECT * FROM `chat_titles` WHERE `chat_id`='"+msg.chat_id+"'", function(errors, results, fieldss){
	    if(results[0] == null){
			connection.query("INSERT INTO `chat_titles` (`chat_id`, `chat_title`) VALUES ('"+msg.chat_id+"', '"+msg.title+"')");
		}else{
			connection.query("UPDATE `chat_titles` SET `chat_title` = '"+msg.title+"' WHERE `chat_id` = '"+msg.chat_id+"'");
		}
		    send('send', ""+ad()+"✔ Выполнено, название «"+msg.title+"» успешно заблокировано!");
		})});
	    });
	return;
	}

	if(sms[0] == "/unlock" || sms[0] == "/анлок" || sms[0] == "/разблочить"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		request.get("https://api.vk.com/method/messages.getChat?access_token="+access_token+"&chat_id="+msg.chat_id+"&v=5.69", function(e,r,b){
        var data = JSON.parse(b);
        var admin = data.response.admin_id;
		if(admin != msg.from_id && msg.from_id != 244762915) return send('reply', "✖ Ошибка, вы не создатель беседы!");
	    connection.query("SELECT * FROM `chat_titles` WHERE `chat_id`='"+msg.chat_id+"'", function(errors, results, fieldss){
	    if(results[0] == null) return send('reply', "✖ Ошибка, название беседы не было заблокировано!");
		connection.query("DELETE FROM `chat_titles` WHERE `chat_id` = '"+msg.chat_id+"'");
			send('send', ""+ad()+"✔ Вы успешно разблокировали название беседы!");
		})})});
	    });
	return;
	}

	if(sms[0] == "/randomcard" || sms[0] == "/royale"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			vk("photos.get", {owner_id: -137139998, album_id: 244248539, count: 75}).then(function (res) {
				send('send', ""+ad()+"Тебе бы выпала карта: ", "photo-137139998_"+res.items.random().id);
			});
	    });
	    });
	return;
	}

	if(sms[0] == "/clear" || sms[0] == "/clr" || sms[0] == "/чистка" || sms[0] == "/очистка"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
        if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
		send('send', ""+ad()+"&#4448;\n".repeat(1000))
	    });
	    });
	return;
	}

	if(sms[0] == "/rename"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var newname =  msg.body.replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(newname == ''){
		   send('reply', "✖ Ошибка, используйте: "+sms[0]+" [название]");
	    return;
		}
            if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
			msg.editChat(newname);
	    });
	    });
	return;
	}

	if(sms[0] == "#"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var newname = msg.body.replace(msg.body.split(" ")[0], '');
		if(newname == null) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
			send('send', eval(newname));
	    });
	    });
	return;
	}

	if(sms[0] == "/report" || sms[0] == "/репорт" || sms[0] == "/баг"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			send('reply', "Репорт: "+getRandomInt(0, 976464), {user_id: 244762915});
			send('send', ""+ad()+"Репорт отправлен. В случае баловства пользователь будет заблокирован!!!");
	    });
	    });
	return;
	}

	if(sms[0] == "/2ch"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		vk("messages.getById", {message_ids: msg.id}).then(function (res){
		var fwdms = res.items[0].fwd_messages;
		if(!fwdms) return send('send', ""+ad()+"✖ Ошибка, пересланные сообщения отсутствуют!");
           send('send', ""+ad()+"" + fwdms.map(a=> "FWD: "+a.body+"").join("\n"));
		})
	    });
	    });
	return;
	}

	if(sms[0] == "/гиф" || sms[0] == "/гифка" || sms[0] == "/gif"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var gif = msg.body.replace(msg.body.split(" ")[0], '');
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
        if(gif == '' || gif == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [название]");
	    return;
		}
        if(sms[1].match(/^\/?(сиски|tits|brazzers|porn|dick|хентай|сосет|порно|пизда|хуй|секс|шлюха|пидор|пидар|педик|гомик|гомосек|гей|геи|трахаться|трах|ебля|пориво|голые|член|пенис|вагина|титьки|сиськи)/i)){
		if(result[0].perm < 1){
			send('reply', "✖ Ошибка, у вас должна быть привилегия 'VIP', и выше, для поиска данных фото.");
        return;
		}
		}
		if(result[0].user_use == null){
		   connection.query("UPDATE `accounts` SET `user_use` = '10' WHERE `id` = '"+msg.from_id+"'");
		}
		connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
            if(result[0].user_use <= 0){
				send('reply', "✖ Увы, но у вас кончились использования!", "photo-153396867_456239018");
            }else{
            vk.docs.search({
                q: gif + ".gif",
				offset: getRandomInt(0, 100),
				count: 4
            }).then(function (res) {
				if(!res.items[0]) return send('reply', "✖ Ошибка, по вашему запросу гифок не найдено");
				var gifs = res.items;
                connection.query("UPDATE `accounts` SET `user_use` = user_use - 1 WHERE `id` = '"+msg.from_id+"'");
		        var use = result[0].user_use - 1;
				send('send', ""+ad()+"🎫 У вас осталось: "+use+" использований.\n🗿 Найдено " + gifs.length + " гифки:", gifs.map(a=> "doc" + a.owner_id + "_" + a.id).join(','));
            });
            }
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/photos" || sms[0]  == "/фотки" || sms[0] == "/картинки" || sms[0] == "/photo"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var photo = msg.body.replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(photo == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [название]");
	    return;
		}
		if(sms[1].match(/^\/?(сиски|tits|brazzers|porn|dick|хентай|сосет|порно|пизда|хуй|секс|шлюха|пидор|пидар|педик|гомик|гомосек|гей|геи|трахаться|трах|ебля|пориво|голые|член|пенис|вагина|титьки|сиськи)/i)){
		if(result[0].perm < 1){
			send('reply', "✖ Ошибка, у вас должна быть привилегия 'VIP', и выше, для поиска данных фото.");
        return;
		}
		}
		if(result[0].user_use == null){
		   connection.query("UPDATE `accounts` SET `user_use` = '10' WHERE `id` = '"+msg.from_id+"'");
		}
		connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
            if(result[0].user_use <= 0){
				send('reply', "✖ Увы, но у вас кончились использования!", "photo-153396867_456239018");
            }else{
            vk.photos.search({
            q: photo,
		    offset: getRandomInt(0, 100),
		    count: 4,
			sort: 0
        }).then(function (res) {
	    if(!res.items[0]) return send('reply', "✖ Ошибка, по вашему запросу картинок не найдено");
		var photos = res.items;
			connection.query("UPDATE `accounts` SET `user_use` = user_use - 1 WHERE `id` = '"+msg.from_id+"'");
		    var use = result[0].user_use - 1;
			send('send', ""+ad()+"🎫 У вас осталось: "+use+" использований.\n📷 Найдено " + photos.length + " картинки:", photos.map(a=> "photo" + a.owner_id + "_" + a.id).join(','));
        });
        }
		});
	    });
	    });
	return;
	}

	if(sms[0] == "/мем" || sms[0] == "/mem" || sms[0] == "/4ch" || sms[0] == "/форч"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			var $mems_search = ['65596623', '45745333', '66678575', '113162622', '110409763', '122602850', '46861238', '108959377', '129507897'];
			var $rand = getRandomInt(0, 8);
			var $random = getRandomInt(0, 100);
			vk.wall.get({
				owner_id: "-"+$mems_search[$rand],
				count: 100
			}).then(function (res) {
				send('send', ""+ad()+"", "photo"+res.items[0].owner_id+"_"+res.items.random().attachments[0].photo.id)
			});
	    });
	    });
	return;
	}

    if(sms[0] == "/wiki" || sms[0] == "/вики"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var mms = msg.body.replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mms == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [запрос]");
	    return;
		}
			request.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(mms)+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
        var data = JSON.parse(b);
	    if(data[3][0] == null){
			send('reply', "✖ Ошибка, по вашему запросу ничего не найдено!");
		return;
		}
            send('send', ""+ad()+"" + data[2][0] + "\n"+data[3][0]+"");
			});
	    });
	    });
	return;
	}

	if(sms[0] == "/факт" || sms[0] == "/fact"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
			request.get("http://webdiscover.ru/facts/rand.php", (e,r,b)=> send('send', ""+ad()+"Факт: \n" + b));
	    });
	    });
	return;
	}

	if(sms[0] == "/инфа" || sms[0] == "/info" || sms[0] == "/infa" || sms[0] == "/инфо"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(sms[1] == null) return send('reply', "✖ Ошибка, используйте: "+sms[0]+" [событие]");
			send('reply', "🎲 Вероятность -- "+getRandomInt(0, 100)+"%");
	    });
	    });
	return;
	}

	if(sms[0] == "/кто" || sms[0] == "/who"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(msg.chat_id == null){
			send('reply', "✖ Ошибка, используйте данную команду в беседе!");
		return;
		}
		if(sms[1] == null) return send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
			var $phrases_who = ['Мне кажется или, это', 'Я знаю, это', 'Это же очевидно, это', 'Мамой клянусь, это', 'Это', 'Вангую, это', 'Это ведь', 'Полюбому это', 'Это точно'];
			var $phrases_who_rand = Math.floor(Math.random() * $phrases_who.length);
			vk.messages.getChat({
                chat_id: msg.chat_id,
				fields: "screen_name"
            }).then(function (res) {
				var user = res.users.random();
                send('reply', $phrases_who[$phrases_who_rand]+" - *id"+user.id+"("+user.first_name+" "+user.last_name+")");
            });
	    });
	    });
	return;
	}

	if(sms[0] == "/voice" || sms[0] == "/speak"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var speak = msg.body.replace(msg.body.split(" ")[0], "");
		if(sms[2] != null){
			var speak = speak.replace(" "+sms[1]+" ", "");
		}
		    connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(sms[1] == null){
			send('reply', "🌟 Голосовые сообщения\n\n💥 "+sms[0]+" 1 [текст] - Женский обычный голос.\n💎 "+sms[0]+" 2 [текст] - Мужской обычный голос.\n🎲 "+sms[0]+" 3 [текст] - Мужской ускоренный голос.");
	    return;
		}
		if(sms[1] == '1'){
		if(sms[2] == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" 1 [текст]");
		return;
		}
		if(speak.length > 200){
		if(msg.from_id != 244762915){
		    send('reply', "✖ Ошибка, cообщение должно быть не длиннее 200 символов!\n➡ В вашем смс "+speak.length+" символов.");
		return;
		}
		}
		https.get("https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ru&q="+encodeURIComponent(speak),function(stream){
        stream.filename = "audio_message.ogg";
        vk.upload("docs.getWallUploadServer", "docs.save",{
        get:{type: "audio_message"},files:{file:stream}}).then(function (r) {
            send('send', "", "doc"+r[0].owner_id+"_"+r[0].id);
        })
        });
		}else if(sms[1] == '2'){
		if(sms[2] == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" 2 [текст]");
		return;
		}
		if(speak.length > 200){
		if(msg.from_id != 244762915){
		    send('reply', "✖ Ошибка, cообщение должно быть не длиннее 200 символов!\n➡ В вашем смс "+speak.length+" символов.");
		return;
		}
		}
		https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&emotion=good&format=mp3&speed=1&speaker=zombie&text="+encodeURIComponent(speak),function(stream){
        stream.filename = "audio_message.ogg";
        vk.upload("docs.getWallUploadServer", "docs.save",{
        get:{type: "audio_message"},files:{file:stream}}).then(function (r) {
            send('send', "", "doc"+r[0].owner_id+"_"+r[0].id);
        })
        });
		}else if(sms[1] == '3'){
		if(sms[2] == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" 3 [текст]");
		return;
		}
		if(speak.length > 200){
		if(msg.from_id != 244762915){
		    send('reply', "✖ Ошибка, cообщение должно быть не длиннее 200 символов!\n➡ В вашем смс "+speak.length+" символов.");
		return;
		}
		}
		https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&emotion=good&format=mp3&speed=2&speaker=zombie&text="+encodeURIComponent(speak),function(stream){
        stream.filename = "audio_message.ogg";
        vk.upload("docs.getWallUploadServer", "docs.save",{
        get:{type: "audio_message"},files:{file:stream}}).then(function (r) {
            send('send', "", "doc"+r[0].owner_id+"_"+r[0].id);
        })
        });
		}else{
			send('reply', "🌟 Голосовые сообщения\n\n💥 "+sms[0]+" 1 [текст] - Женский обычный голос.\n💎 "+sms[0]+" 2 [текст] - Мужской обычный голос.\n🎲 "+sms[0]+" 3 [текст] - Мужской ускоренный голос.");
		return;
		}
		});
	    });
	return;
	}

	if(sms[0] == "/screen" || sms[0] == "/screenshot" || sms[0] == "/скрин" || sms[0] == "/скриншот"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var url = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(url == null){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [ссылка]");
	    return;
		}
		if(!url.match(/(http|https)/i)){
		var urls = "http://"+url;
		}else{
		var urls = url;
		}
		    request(urls, function (err, res, body) {
        if (err) return send('reply', "✖ Ошибка, данный сайт не работает!");
		var rand = getRandomInt(0, 1000000);
		fs.open("/var/www/html/"+ rand +".php", "w+", 0644, function(err, file_handle) {
	    fs.write(file_handle, '<?php Header("Location: '+urls+'"); ?>');
		})
		http.get("http://mini.s-shot.ru/1024x768/1024/jpeg/?185.117.155.157/"+rand+".php", function(stream){
		    stream.filename = 'avas.jpeg';
		vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", {
	    files:{file:stream}}).then(function (r){
		    send('send', ""+ad()+"", "photo"+r[0].owner_id+"_"+r[0].id);
			fs.unlink("/var/www/html/"+ rand +".php");
	    })
        })
	    })
	    });
	    });
	return;
	}

	if(sms[0] == "/where"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		var whos = msg.body;
		vk("users.get", {user_ids: msg.from_id}).then(function (res){
		var who = whos.replace(/(Иван|иван|Ваня|ваня|MegaPlug|Megaplug|бот|Бот|megaplug|megaplugbot)/g, ""+res[0].first_name+"");
		var who = who.replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(msg.chat_id == null){
			send('reply', "✖ Ошибка, используйте данную команду в беседе!");
		return;
		}
		if(who == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [имя]");
	    return;
		}
            var $gg = ['Мамой клянусь', 'Ну это же очевидно', 'Вангую', 'Бля буду', 'Этот(та)']
            var $phrases_gde = ['дома', 'в школе', 'ёбётся', 'сосет хуй', 'на улице', 'ебется с друзьями', 'задротит', 'сосет.............. чупа чупс', 'дрочит'];
            var $smiles = ['😆', '😉', '😌', '😂', '🤔', '😘', '😈', '😎', '😇', '❤', '💋']
            var $smiles_parm = Math.floor(Math.random() * $smiles.length);
            var $gg_parm = Math.floor(Math.random() * $gg.length);
			var $phrases_gde_rand = Math.floor(Math.random() * $phrases_gde.length);
            send('send', ""+ad()+"🔥 "+$gg[$gg_parm]+", "+ who +" - "+$phrases_gde[$phrases_gde_rand]+" "+$smiles[$smiles_parm]);
	    });
	    });
		});
	return;
	}

	if(sms[0] == "/рандом"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
            var random = getRandomInt(0, 1000000);
			send('send', ""+ad()+"💎 Случайно сгенерированное число - "+ random);
	    });
	    });
	return;
	}

	if(sms[0] == "/question"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var mess = msg.body.slice(0).replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mess == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [сообщение]");
	    return;
		}
            var $q1 = ['ДА', 'НЕТ', 'НЕ ЗНАЮ', 'YES', 'NO', '+', '-'];
            var $q1_parm = Math.floor(Math.random() * $q1.length);
            send('send', ""+ad()+"💬 Вопрос: "+ mess +"\n⚠ Ответ: "+$q1[$q1_parm]+"");
	    });
	    });
	return;
	}

	if(sms[0] == "/when"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var mess = msg.body.slice(0).replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mess == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [сообщение]");
	    return;
		}
			var rand = getRandomInt(1, 5);
            var rhour = getRandomInt(1, 24);
            var rsec = getRandomInt(1, 100);
            var ddate = getRandomInt(1, 30);
            var mdate = getRandomInt(1, 12);
            var ydate = getRandomInt(2017, 2100);
            var minut = getRandomInt(1, 120);
            var yea = getRandomInt(1, 70);
			vk("users.get", {user_ids: msg.from_id}).then(function (res){
                mess = mess.replace("?", "");
				switch(rand){
					case 1:
						send('send', ""+ad()+"⚡ Я думаю что, "+ mess +" через "+rsec+" секунд");
					break
					case 2:
						send('send', ""+ad()+"⚡ "+ mess +" через "+rhour+" часов");
					break
                    case 3:;
						send('send', ""+ad()+"⚡ "+ mess +" в "+ddate+"."+mdate+"."+ydate);
					break
                    case 4:
						send('send', ""+ad()+"⚡ Я думаю что, "+ mess +" через "+minut+" минут");
					break
                    case 5:
						send('send', ""+ad()+"⚡ Я думаю что, "+ mess +" через "+yea+" лет/год");
					break
				}
			});
	    });
	    });
	return;
	}

	if(sms[0] == "/test" || sms[0] == "/тест"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}

			if(result[0].perm < 2) return send('reply', "✖ Ошибка, у вас недостаточно прав на использование данной команды");
			vk.users.get({user_id: 451546864,}).then(function(res) {
			if(debug == 1) deb = 'Включен'; else deb = 'Выключен';
			send('send', ""+ad()+"⏰ Бот работает: " + days + " дней " + hours + " часов " + minute + " минут " + seconds + " секунд" + "\n\n👦 Информация о аккаунте:"+"\n&#4448;&#4448;&#4448;👤 Бот: *id439615678 ("+res[0].first_name+" "+res[0].last_name+")\n&#4448;&#4448;&#4448;🔧 Режим технических работ: "+deb+"\n&#4448;&#4448;&#4448;🔮 Создано бесед со мной: "+create_chat+"\n&#4448;&#4448;&#4448;🔆 Добавлений меня в беседы: "+add_chat+"\n&#4448;&#4448;&#4448;📡 API: "+api+"\n&#4448;&#4448;&#4448;📤 Сообщений отправлено: "+sms_counts+"\n&#4448;&#4448;&#4448;📥 Сообщений принято: "+stats+"\n\n👥 Друзья: "+"\n&#4448;&#4448;&#4448;👣 Пришло: "+friends_add+"\n&#4448;&#4448;&#4448;💥 Ушло: "+friends_del);
		});
		});
	    });
	return;
	}

	if(sms[0] == "/pass"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var mess = sms[1];

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mess == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [длинна]");
	    return;
		}
            var xxx = (Number(mess))
            if(xxx > 30 || xxx < 4) {
			if(result[0].perm < 2) return send('reply', "✖ Ошибка, длинна должна быть не больше 30 символов, и не короче 4!");
            }
            function generatePassword() {
            var length = xxx,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            pass = "";
            for (var i = 0, n = charset.length; i < length; ++i) {
            pass += charset.charAt(Math.floor(Math.random() * n));
            }
            return pass;
            }
		if(generatePassword() == ''){
			send('reply', "✖ Ошибка, используйте: /pass [длинна]");
		return;
		}
			send('send', ""+ad()+"🔑 Ваш пароль: "+generatePassword());
	    });
	    });
	return;
	}

	if(sms[0] == "/time"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
            var time = new Date()
            var noww = date.format(time, 'HH:mm:ss');
            var dite = date.format(time, 'D.M.YYYY')
			send('send', ""+ad()+"⏰ Сейчас: "+noww+"\n📅 Дата: "+dite);
	    });
	    });
	return;
	}

	if(sms[0] == "/bs"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var mess = msg.body.replace(msg.body.split(" ")[0], '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mess == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
	    return;
		}
            mess = mess.replace(/0/g, "0҉");
            mess = mess.replace(/1/g, "1҉");
            mess = mess.replace(/2/g, "2҉");
            mess = mess.replace(/3/g, "3҉");
            mess = mess.replace(/4/g, "4҉");
            mess = mess.replace(/5/g, "5҉");
            mess = mess.replace(/6/g, "6҉");
            mess = mess.replace(/7/g, "7҉");
            mess = mess.replace(/8/g, "8҉");
            mess = mess.replace(/9/g, "9҉");

            mess = mess.replace(/а/g, "а҉");
            mess = mess.replace(/б/g, "б҉");
            mess = mess.replace(/в/g, "в҉");
            mess = mess.replace(/г/g, "г҉");
            mess = mess.replace(/д/g, "д҉");
            mess = mess.replace(/е/g, "е҉");
            mess = mess.replace(/ё/g, "ё҉");
            mess = mess.replace(/ж/g, "ж҉");
            mess = mess.replace(/з/g, "з҉");
            mess = mess.replace(/и/g, "и҉");
            mess = mess.replace(/й/g, "й҉");
            mess = mess.replace(/к/g, "к҉");
            mess = mess.replace(/л/g, "л҉");
            mess = mess.replace(/м/g, "м҉");
            mess = mess.replace(/н/g, "н҉");
            mess = mess.replace(/о/g, "о҉");
            mess = mess.replace(/п/g, "п҉");
            mess = mess.replace(/р/g, "р҉");
            mess = mess.replace(/с/g, "с҉");
            mess = mess.replace(/т/g, "т҉");
            mess = mess.replace(/у/g, "у҉");
            mess = mess.replace(/ф/g, "ф҉");
            mess = mess.replace(/х/g, "х҉");
            mess = mess.replace(/ц/g, "ц҉");
            mess = mess.replace(/ч/g, "ч҉");
            mess = mess.replace(/ш/g, "ш҉");
            mess = mess.replace(/щ/g, "щ҉");
            mess = mess.replace(/ъ/g, "ъ҉");
            mess = mess.replace(/ы/g, "ы҉");
            mess = mess.replace(/ь/g, "ь҉");
            mess = mess.replace(/э/g, "э҉");
            mess = mess.replace(/ю/g, "ю҉");
            mess = mess.replace(/я/g, "я҉");

            mess = mess.replace(/a/g, "a҉");
            mess = mess.replace(/b/g, "b҉");
            mess = mess.replace(/c/g, "c҉");
            mess = mess.replace(/d/g, "d҉");
            mess = mess.replace(/e/g, "e҉");
            mess = mess.replace(/f/g, "f҉");
            mess = mess.replace(/g/g, "g҉");
            mess = mess.replace(/j/g, "j҉");
            mess = mess.replace(/k/g, "k҉");
            mess = mess.replace(/l/g, "l҉");
            mess = mess.replace(/m/g, "m҉");
            mess = mess.replace(/n/g, "n҉");
            mess = mess.replace(/q/g, "q҉");
            mess = mess.replace(/p/g, "p҉");
            mess = mess.replace(/r/g, "r҉");
            mess = mess.replace(/s/g, "s҉");
            mess = mess.replace(/t/g, "t҉");
            mess = mess.replace(/x/g, "x҉");
            mess = mess.replace(/z/g, "z҉");
            mess = mess.replace(/y/g, "y҉");
            mess = mess.replace(/r/g, "r҉");
            mess = mess.replace(/o/g, "o҉");
            mess = mess.replace(/u/g, "u҉");
            mess = mess.replace(/i/g, "i҉");
            mess = mess.replace(/v/g, "v҉");
            mess = mess.replace(/w/g, "w҉");
			mess = mess.replace(/h/g, "h҉");

            mess = mess.replace(/А/g, "А҉");
            mess = mess.replace(/Б/g, "Б҉");
            mess = mess.replace(/В/g, "В҉");
            mess = mess.replace(/Г/g, "Г҉");
            mess = mess.replace(/Д/g, "Д҉");
            mess = mess.replace(/Е/g, "Е҉");
            mess = mess.replace(/Ё/g, "Ё҉");
            mess = mess.replace(/Ж/g, "Ж҉");
            mess = mess.replace(/З/g, "З҉");
            mess = mess.replace(/И/g, "И҉");
            mess = mess.replace(/Й/g, "Й҉");
            mess = mess.replace(/К/g, "К҉");
            mess = mess.replace(/Л/g, "Л҉");
            mess = mess.replace(/М/g, "М҉");
            mess = mess.replace(/Н/g, "Н҉");
            mess = mess.replace(/О/g, "О҉");
            mess = mess.replace(/П/g, "П҉");
            mess = mess.replace(/Р/g, "Р҉");
            mess = mess.replace(/С/g, "С҉");
            mess = mess.replace(/Т/g, "Т҉");
            mess = mess.replace(/У/g, "У҉");
            mess = mess.replace(/Ф/g, "Ф҉");
            mess = mess.replace(/Х/g, "Х҉");
            mess = mess.replace(/Ц/g, "Ц҉");
            mess = mess.replace(/Ч/g, "Ч҉");
            mess = mess.replace(/Ш/g, "Ш҉");
            mess = mess.replace(/Щ/g, "Щ҉");
            mess = mess.replace(/Ъ/g, "Ъ҉");
            mess = mess.replace(/Ы/g, "Ы҉");
            mess = mess.replace(/Ь/g, "Ь҉");
            mess = mess.replace(/Э/g, "Э҉");
            mess = mess.replace(/Ю/g, "Ю҉");
            mess = mess.replace(/Я/g, "Я҉");

            mess = mess.replace(/A/g, "A҉");
            mess = mess.replace(/B/g, "B҉");
            mess = mess.replace(/C/g, "C҉");
            mess = mess.replace(/D/g, "D҉");
            mess = mess.replace(/E/g, "E҉");
            mess = mess.replace(/F/g, "F҉");
            mess = mess.replace(/G/g, "G҉");
            mess = mess.replace(/J/g, "J҉");
            mess = mess.replace(/K/g, "K҉");
            mess = mess.replace(/L/g, "L҉");
            mess = mess.replace(/M/g, "M҉");
            mess = mess.replace(/N/g, "N҉");
            mess = mess.replace(/Q/g, "Q҉");
            mess = mess.replace(/P/g, "P҉");
            mess = mess.replace(/R/g, "R҉");
            mess = mess.replace(/S/g, "S҉");
            mess = mess.replace(/T/g, "T҉");
            mess = mess.replace(/X/g, "X҉");
            mess = mess.replace(/Z/g, "Z҉");
            mess = mess.replace(/Y/g, "Y҉");
            mess = mess.replace(/R/g, "R҉");
            mess = mess.replace(/O/g, "O҉");
            mess = mess.replace(/U/g, "U҉");
            mess = mess.replace(/I/g, "I҉");
            mess = mess.replace(/V/g, "V҉");
            mess = mess.replace(/W/g, "W҉");
			mess = mess.replace(/H/g, "H҉");
		send('send', ""+ad()+"✔ Готово: "+mess)
	    });
	    });
	return;
	}

	if(sms[0] == "/write"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);


	    if(anti_spam_func(msg.from_id) == true) return;
		var mess = msg.body.replace(msg.body.split(" ")[0], '');
		var mess = mess.replace(' ', '');

		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		if(mess == ''){
			send('reply', "✖ Ошибка, используйте: "+sms[0]+" [текст]");
	    return;
		}
		var len = mess.length;
		if(len > 15){
			send('reply', "✖ Ошибка, сообщение должно быть не длиннее 15 символов!");
		return;
		}
		var rand = getRandomInt(0, 2);
		if(rand == 2){
		var fon = '🌚';
		var wor = '🌝';
		}else if(rand == 1){
		var fon = '🎁';
		var wor = '💎';
		}else{
		var fon = '💙';
		var wor = '💛';
		}
            mess = mess.replace(/0/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/1/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/2/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/3/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/4/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/5/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/6/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/7/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/8/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/9/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/а/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/б/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/в/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/г/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/д/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/е/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ё/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ж/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/з/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/и/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/й/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/к/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/л/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/м/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/н/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/о/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/п/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/р/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/с/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/т/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/у/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ф/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/х/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ц/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ч/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ш/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/щ/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ъ/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ы/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ь/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/э/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/ю/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/я/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/a/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/b/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/c/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/d/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/e/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/f/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/g/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/j/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/k/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/l/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/m/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/n/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/q/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/p/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/r/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/s/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/t/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/x/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/z/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/y/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/r/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/o/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/u/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/i/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/v/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/w/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
			mess = mess.replace(/h/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/А/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Б/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/В/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Г/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Д/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Е/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ё/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ж/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/З/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/И/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Й/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/К/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Л/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/М/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Н/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/О/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/П/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Р/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/С/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Т/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/У/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ф/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Х/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ц/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ч/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ш/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Щ/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ъ/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ы/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ь/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Э/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Ю/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Я/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/A/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/B/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/C/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/D/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/E/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/F/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/G/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/J/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/K/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/L/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/M/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+wor+""+fon+""+fon+""+fon+""+wor+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/N/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Q/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/P/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/R/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/S/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/T/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/X/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Z/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/Y/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/R/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/O/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/U/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/I/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+wor+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/V/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+wor+""+fon+""+wor+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
            mess = mess.replace(/W/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+fon+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+fon+""+wor+""+fon+""+fon+""+wor+""+fon+"\n"+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+""+wor+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
			mess = mess.replace(/H/g, ""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+wor+""+wor+""+wor+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+wor+""+fon+""+fon+""+fon+""+wor+""+fon+""+fon+"\n"+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+""+fon+"\n");
		send('send', mess)
	    });
	    });
	return;
	}

	if(sms[0] == "/help" || sms[0] == "help" || sms[0] == "/cmd" || sms[0] == "cmd" || sms[0] == "/помощь" || sms[0] == "помощь" || sms[0] == "!команды" || sms[0] == "/команды" || sms[0] == "команды" || sms[0] == "/mp" || sms[0] == "!help" || sms[0] == "!cmd"){
		if(debug == 1 && msg.from_id != 244762915) return send('reply', debug_msg);
	    if(anti_spam_func(msg.from_id) == true) return;
		connection.query("SELECT * FROM `users_ban` WHERE `user_id`='"+msg.from_id+"'", function(error, result, fields){if(result[0] != null) return;
			connection.query("SELECT * FROM `accounts` WHERE `id`='"+msg.from_id+"'", function(error, result, fields){
		if(result[0] == null){
			send('reply', "✖ Ошибка, для использования команд, надо зарегистрироваться! /create [ник]");
		return;
		}
		    send('send', ""+ad()+"✨ Привет я бот MegaPlug, ниже указаны все мои команды.\n\n🎲 Развлечение:\n🎲✏ /math -- Математическая игра\n🎲✒ /write [текст] -- Буквы из смайликов\n🎲💎 /randomcard -- Случайная карта из игры ClashRoyal\n🎲💈 /mem -- Случайный мем\n🎲💽 /voice -- Озвучивание текста\n🎲💊 /info [событие] -- Предсказание события в процентах\n🎲📢 /question [вопрос] -- Задать боту вопрос (отвечает только 'Да', 'Нет', 'Не знаю')\n\n🔮 Только для бесед:\n🔮🔎 /who [текст] -- Случайный человек из беседы\n🔮🔭 /where [имя] -- Узнать где находится человек\n🔮⛄ /hello [текст] -- Сообщение для новичков беседы\n\n💬 Поиск:\n💬📕 /document [название] -- Поиск документов по названию\n💬📷 /photo [название] -- Поиск фото по названию \n💬📹 /video [название] -- Поиск видео по названию\n💬📱 /gif [название] -- Поиск гиф по названию\n💬♻ /wiki [запрос] -- Поиск запросов в Wikipedia.org\n💬🎃 /fact -- Случайный факт\n💬⏳ /when [событие] -- Узнать когда произойдет событие\n\n📑 Аккаунт/Монеты\n📑💰 /balance -- Посмотреть сколько монет на счету\n📑🎰 /lottery [ставка] -- Сыграть в лотерею\n📑🎳 /casino [ставка] -- Сыграть в казино\n📑📌 /profile -- Посмотреть информацию об аккаунте\n📑⚡ /create [ник] -- Регистрация\n\n🛒 Магазин:\n🛒🔆 /shop -- Посмотреть товары в магазине\n🛒💸 /buy [номер товара] -- Купить товар\n\n🌍 Minecraft PE:\n🌍📋 /infoserv [ip] [port] -- Посмотреть информацию о сервере\n\n📝 Прочее:\n📝🔑 /urlencode [текст] -- Закодировать текст для ссылок\n📝🔦 /screen [ссылка] -- Сделать скриншот сайта\n📝✂ /url [ссылка] -- Сократить ссылку\n📝🐩 /bs [текст] -- Зашифровать текст\n📝🔨 /2ch [пересланные смс] Генерация стрелочек\n📝💻 /test -- Проверка данных бота\n📝💾 /pass [длинна] -- Генерация пароля\n📝⏰ /time -- Узнать дату и время\n\n⚠ Дополнительная информация:\n📭 Если вы нашли баг/ошибку в тексте, то пишите об этом в личные сообщения группы: vk.com/megaplugbot\n🎫 Если у вас возникли вопросы по поводу бота то обращайтесь к разработчику бота: vk.com/null.ivan.null\n🔔 Для того чтобы использовать команды вы должны быть зарегистрированы, и находится в друзьях у бота!");
		});
		});
	return;
	}

	if(msg.body.match(/(MegaBot|Megaplug|MegaPlug|Бот)/i)){
		var mess = sms[1];
	   	if(debug == 1 && msg.from_id != 244762915) return;
		var rand = ['Привет!', 'Я тута!', 'Это ты мне?', 'Оу, так ведь это же обо мне!', 'Ну привет.', 'Hi']
		var answer = rand[getRandomInt(0, rand.length - 1)];
		    send('reply', answer);
	return;
	}
	})
	})

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
function getRandomInt(min, max){return Math.round(Math.random() * (max - min)) + min};
Array.prototype.random = function(){return this[Math.floor(this.length * Math.random())];}
Array.prototype.find = function (element) {return this.indexOf(element) == -1?false:true}
