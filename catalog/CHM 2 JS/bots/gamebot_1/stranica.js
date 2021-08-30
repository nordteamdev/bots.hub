var playa_module = require("playadope.js")
var functions = require("./functions.js")
var vksdk = require("node-vk-sdk")
var sha256 = require("sha256")
var timediff = require("timediff")
var fs = require("fs")
var request = require("request")
var RuCaptcha = require("rucaptcha")
var vkadmin = playa_module("889a39318e77bb8ce536f3659ad41c32a41bb790c339c1ae4796c2ef3c386eea0973fcbd232a8b5b38a35")
var vkmanager = playa_module("080f6f458f31b6bffc145eaed58082edeb8370dd03f6fabca512c637def2c4f2d604bb124ea23a69859c2")
var autostatusgroup = playa_module("21bac705e64305b85fa42c3c6f79c9ed0e854c318de34eead16909076e670a79e7dc31d1ea280c24e4b4d")
var modkeys = playa_module("905749023d199734b70e84e8f70a0c4817ae6cb69946e496ff0e10f1c0e3c903c8e1dd53c675e26a286eb")
var moderkeys = require("./bots/adminbot/data/moderkeys.json")
var database = require("./bots/adminbot/data/database.json")
var reports = require("./bots/adminbot/data/reports.json")
var lang = require("./bots/adminbot/data/languages.json")
var messages_readadmin = 0

let api = new vksdk.VKApi({
    token: "c239b5c69f2d0b17894bad91232aff43e991f68edfa01205675a57e2f644a1cd38555fd5c4961362",
    logger: new vksdk.ConsoleLogger()
})
let updatesProvider = new vksdk.BotsLongPollUpdatesProvider(api, 181128460)
var solver = new RuCaptcha({
	apiKey: 'e4383ca8c38d1da08aeb210028415fcb',
	tmpDir: './tmp',
	checkDelay: 1000
})

vkadmin.on.captcha = function (_error, _m, _q, _cb) {
	vkadmin.cart.pause = 1
	vkadmin.captcha = 1
	_q["captcha_sid"] = _error["captcha_sid"]
	vkadmin._api(_m, _q, _cb, -1)
	fs.writeFileSync('kaadm.jpg', vkadmin.requestSync('GET', _error.captcha_img).getBody())
	solver.solve('kaadm.jpg', function (err, answer) {
		if(err) {
			console.log(err)
		}
		else {
			vkadmin.on.captchaSubmit(answer)
		}
	})
}

vkmanager.on.captcha = function (_error, _m, _q, _cb) {
	vkmanager.cart.pause = 1
	vkmanager.captcha = 1
	_q["captcha_sid"] = _error["captcha_sid"]
	vkmanager._api(_m, _q, _cb, -1)
	fs.writeFileSync('captchamanager.jpg', vkmanager.requestSync('GET', _error.captcha_img).getBody())
	solver.solve('captchamanager.jpg', function (err, answer) {
		if(err) {
			console.log(err)
		}
		else {
			vkmanager.on.captchaSubmit(answer)
		}
	})
}

for(var i = 0; i < database.users.length; i++) {
	database.users[i].muted = false
}

/*for(var i = 0; i < database.top.chats.length; i++) {
	database.top.chats[i].matsmsg = 0
}*/

var chats = { "moders": 3, "supports": 4, "admins": 2, "create_chat": 10 }
var botid = 506872307
var group_ans = -171260710

vkmanager.addListener.messages(function (msg) {
	checkBanBot(msg.user_id, function(cb) {
		if(cb == false) {
			cmds_manager.map(function(cmd){
				var matched = msg.text.match(cmd.regexp)
				if (msg.action) {
					if(msg.action.type == 'chat_invite_user' && msg.action.member_id == 508264596 && msg.user_id != 508264596) {
						vkmanager.api.messages.removeChatUser({user_id: 508264596, chat_id: msg.chat_id});
						return false;
					}
					else if(msg.action.type == 'chat_create' && msg.user_id != 508264596) {
						vkmanager.api.messages.removeChatUser({user_id: 508264596, chat_id: msg.chat_id});
						return false;
					}
				}
				else{
					if(matched){
						try {cmd.f(matched,msg)} catch (e) {msg.send(e.name + " : " + e.message)}
					}
				}
			})
		}
	})
}, {interval:1000})

var cmds_manager = [
	{
		regexp:/^\/on$/i,
		f:function(params,msg){
			if(msg.user_id == 489356469){
				vkmanager.api.status.set({text:"🌐 @SocialKot | &#128276; Создание бесед доступно!"})
				msg.send("+")
				functions.logTxt("[Create Chat] Function enabled")
				database.cancreatechat = 1
			}
		},
	},
	{
		regexp:/^\/off$/i,
		f:function(params,msg){
			if(msg.user_id == 489356469){
				vkmanager.api.status.set({text:"🌐 @SocialKot | &#128277; В данный момент нельзя создать беседу!"})
				msg.send("+")
				functions.logTxt("[Create Chat] Function disabled")
				database.cancreatechat = 0
			}
		},
	},
	{
		regexp:/^\/чат$/i,
		f:function(params,msg){
			if(!msg.chat_id){
				if(database.cancreatechat == 1){
					vkmanager.api.messages.getChat({chat_id:3}, function(a){
						var users = a.response.users
						if(users.indexOf(msg.user_id) !== -1){
							msg.send("Ошибка! Вы уже есть в беседе, либо у вас закрыты личные сообщения.")
						}
						else{
							vkadmin.api.friends.areFriends({user_ids: msg.user_id}, function(a){
								if(a.response[0].friend_status == 3){
									vkmanager.api.messages.addChatUser({chat_id:1,user_id:msg.user_id}, function(a){
										if(!a.error){
											vkmanager.api.messages.send({peer_id: 2000000001, message: "Привет! Ты попал в меню для создания беседы. 😉\n💬 Чтобы создать беседу введи /создать\n\n⏰ На создание беседы у вас — 1 минута."})
											setTimeout(function () {
												vkmanager.api.messages.send({peer_id: 2000000001, message: "Время вышло. ⏳"})
												vkmanager.api.messages.removeChatUser({chat_id:1,member_id:msg.user_id})
											}, 60000)
										}
										else{
											msg.send("Ошибка! Вы уже есть в беседе, либо у вас закрыты личные сообщения.")
										}
									})
								}
								else {
									msg.send("Я не могу добавить вас, т.к вас нет в моем списке друзей.\nЕсли вы отправили заявку в друзья, подождите пока я приму ее.\nТак же, советую добавить нашего бота @id"+botid+" (Chat Manager), чтобы могли создать беседу с ним.")
								}
							})
						}
					})
				}
				else{
					msg.send("В данный момент нельзя создавать конференции.\nСоздание новых конференций будет доступно позже.\n\nОжидайте пожалуйста.")
				}
			}
		}
	},
]

vkadmin.addListener.messages(function(msg){
	if(!msg.chat_id)return;
	var checkchats = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == msg.chat_id) {
			checkchats = i
		}
	}
	if(checkchats == null) {
		vkadmin.api.messages.removeChatUser({member_id: botid, chat_id: msg.chat_id})
	}
	else {
		checkBanBot(msg.user_id, function(cb) {
			if(cb == true) {
				vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id})
			}
		})
		var is = null
		for(var i = 0; i < database.chats.length; i++) {
			if(database.chats[i].chat == msg.chat_id) {
				is = i
			}
		}
		if(database.chats[is].muted == true) {
			checkStaff(msg.user_id, msg.chat_id, function(b) {
				if(b.level == 0) {
					vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id})
				}
			})
		}
		var ffa = null
		for(var i = 0; i < database.users.length; i++) {
			if(database.users[i].user_id == msg.user_id && database.users[i].chat_id == msg.chat_id) {
				ffa = i
			}
		}
		if(ffa != null) {
			if(database.users[ffa].muted == true) {
				database.users[ffa].muted = false
				vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id})
			}
		}
		if(msg.text.match(/(https:\/\/|)vk\.me\/join\/(.*)/)) {
			if(database.chats[is].link_ban == true) {
				checkStaff(msg.user_id, msg.chat_id, function(b) {
					if(b.level == 0) {
						vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id})
						fabanUserInChat(msg.user_id, msg.chat_id)
					}
				})
			}
		}
		messages_readadmin = messages_readadmin + 1;
		msg.jsend = function(text) {
			if(database.chats[is].group_answer && database.chats[is].stop_group != 1) {
				modkeys.api.messages.send({peer_id: database.chats[is].group_answer, message: text}, function(a) {
					if(a.error) {
						msg.jsend(text)
						database.chats[is].stop_group = 1
					}
				})
			}
			else {
				msg.send(text)
			}
		}
		msg.jsendMessage = msg.jsend;
		msg.setChatPhoto = function(p, chat){ 
			vkadmin.api.photos.getChatUploadServer({chat_id:chat}, function(r){ 
				vkadmin.sreq.post(r.response.upload_url, {photo: fs.createReadStream(p)}, function(u){ 
					database.chats[is].photo = u.response
					vkadmin.api.messages.setChatPhoto({file:u.response},function(a){ 
							
						}) 
					})
				})
			}
		msg.setChatPhotoModer = function(p, chat){ 
			vkadmin.api.photos.getChatUploadServer({chat_id:chat}, function(r){ 
				vkadmin.sreq.post(r.response.upload_url, {photo: fs.createReadStream(p)}, function(u){ 
					var v = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == chat) {
							v = i
						}
					}
					database.chats[v].photo = u.response
					upd_db()
					vkadmin.api.messages.setChatPhoto({file:u.response},function(a){ 
							if(!a.error) {
								vkadmin.api.messages.send({chat_id: chat, message:"💮 Модератор одобрил Вашу заявку на смену названия конференции № "+chat})
							}
						}) 
					})
				})
			}
		msg.setChatPhotoAdmin = function(p, chat){ 
			vkadmin.api.photos.getChatUploadServer({chat_id:chat}, function(r){ 
				vkadmin.sreq.post(r.response.upload_url, {photo: fs.createReadStream(p)}, function(u){ 
					var v = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == chat) {
							v = i
						}
					}
					database.chats[v].photo = u.response
					upd_db()
					vkadmin.api.messages.setChatPhoto({file:u.response},function(a){ 
							if(!a.error) {
								var editedchat = 2000000000 + chat
								vkadmin.api.messages.send({peer_id:editedchat, message:"🅰 Администратор сменил вам аватар"})
							}
						}) 
					})
				})
			}
		msg.jsendAM = function (stream, text) {
			vkadmin.upload(vkadmin.api.docs.getUploadServer, vkadmin.api.docs.save, {type:"audio_message",files:{file: stream}},function(a){ 
				msg.jsend(text,{attachment:["doc"+a.response[0].owner_id+"_"+a.response[0].id]}); 
			})
		}
		if(msg.action) {
			if(msg.action.type == "chat_title_update" && !msg.out) {
				resetTitle(msg.chat_id)
				botWarn(msg.user_id, msg.chat_id)
				return false;
			}
			else if(msg.action.type == "chat_photo_update" || msg.action.type == "chat_photo_remove") {
				resetPhoto(msg.chat_id)
				botWarn(msg.user_id, msg.chat_id)
				return false;
			}
			else if(msg.action.type == "chat_pin_message" || msg.action.type == "chat_unpin_message") {
				var is = null
				for(var i = 0; i < database.chats.length; i++) {
					if(database.chats[i].chat == msg.chat_id) {
						is = i
					}
				}
				if(database.chats[is].pin_msg != 0) {
					vkadmin.api.messages.pin({peer_id: msg.peer_id, message_id: database.chats[is].pin_msg})
				}
				else if(database.chats[is].pin_msg == 0) {
					vkadmin.api.messages.unpin({peer_id: msg.peer_id})
				}
				botWarn(msg.user_id, msg.chat_id)
				return false;
			}
			else if(msg.action.type == "chat_kick_user" && msg.action.member_id == msg.user_id) {
				var is = null
				for(var i = 0; i < database.chats.length; i++) {
					if(database.chats[i].chat == msg.chat_id) {
						is = i
					}
				}
				if(database.chats[is].kick_leave == true) {
					checkStaff(msg.user_id, msg.chat_id, function(f) {
						if(f.level == 0) {
							vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id}, function(a) {
								rChatUser(msg.user_id, msg.chat_id)
							})
						}
					})
				}
			}
			else if(msg.action.type == "chat_invite_user_by_link") {
				checkBanBot(msg.action.member_id, function(cb) {
					if(cb == true) {
						vkadmin.api.messages.removeChatUser({member_id: msg.from_id, chat_id: msg.chat_id})
					}
					else {
						var hth = "chat"+msg.chat_id
						var date = new Date();
						date.setMonth(date.getMonth() + 1)
						var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
						var s = null
						for(var i = 0; i < database.users.length; i++) {
							if(database.users[i].chat_id == msg.chat_id && database.users[i].user_id == msg.from_id) {
								s = i
							}
						}
						if(s != null) {
							if(database.users[s].banned == true) {
								vkadmin.api.messages.removeChatUser({member_id: msg.from_id, chat_id: msg.chat_id}, function(a) {
									rChatUser(msg.from_id, msg.chat_id)
								})
							}
						}
						else {
							var idd = null
							for(var i = 0; i < database.top.users[hth].length; i++){
								if(database.top.users[hth][i].user_id == msg.from_id){
									idd = i
								}
							}
							if(idd == null){
								database.top.users[hth].push({"user_id": msg.from_id, "in_chat": true, "count": 1, "date": dddate})
							}
							else {
								database.top.users[hth][idd].date = dddate
							}
							aChatUser(msg.from_id, msg.chat_id)
						}
					}
				})
			}
			else if(msg.action.type == "chat_invite_user" && msg.action.member_id != msg.user_id) {
				var hth = "chat"+msg.chat_id
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				checkBanBot(msg.action.member_id, function(cb) {
					if(cb == true) {
						vkadmin.api.messages.removeChatUser({member_id: msg.action.member_id, chat_id: msg.chat_id})
					}
				})
				var f = database.users.filter(a=> a.user_id == msg.user_id && a.chat_id == msg.chat_id).map(a=> a.moder)
				var is = null
				for(var i = 0; i < database.chats.length; i++) {
					if(database.chats[i].chat == msg.chat_id) {
						is = i
					}
				}
				if(database.chats[is].can_invite == false) {
					checkStaff(msg.user_id, msg.chat_id, function(f) {
						if(f.level == 0) {
							vkadmin.api.messages.removeChatUser({member_id: msg.action.member_id, chat_id: msg.chat_id}, function(a) {
								rChatUser(msg.action.member_id, msg.chat_id)
								botWarn(msg.user_id, msg.chat_id)
							})
							botWarn(msg.user_id, msg.chat_id)
						}
						else {
							var s = null
							for(var i = 0; i < database.users.length; i++) {
								if(database.users[i].chat_id == msg.chat_id && database.users[i].user_id == msg.action.member_id) {
									s = i
								}
							}
							if(s != null) {
								if(database.users[s].banned == true) {
									vkadmin.api.messages.removeChatUser({member_id: msg.action.member_id, chat_id: msg.chat_id}, function(a) {
										rChatUser(msg.action.member_id, msg.chat_id)
									})
								}
							}
							else {
								var idd = null
								for(var i = 0; i < database.top.users[hth].length; i++){
									if(database.top.users[hth][i].user_id == msg.action.member_id){
										idd = i
									}
								}
								if(idd == null){
									database.top.users[hth].push({"user_id": msg.action.member_id, "in_chat": true, "count": 1, "date": dddate})
								}
								else {
									database.top.users[hth][idd].date = dddate
								}
								aChatUser(msg.action.member_id, msg.chat_id)
							}
						}
					})
				}
				else {
					var s = null
					for(var i = 0; i < database.users.length; i++) {
						if(database.users[i].chat_id == msg.chat_id && database.users[i].user_id == msg.action.member_id) {
							s = i
						}
					}
					if(s != null) {
						if(database.users[s].banned == true) {
							vkadmin.api.messages.removeChatUser({member_id: msg.action.member_id, chat_id: msg.chat_id}, function(a) {
								rChatUser(msg.action.member_id, msg.chat_id)
							})
						}
						else {
							var idd = null
							for(var i = 0; i < database.top.users[hth].length; i++){
								if(database.top.users[hth][i].user_id == msg.action.member_id){
									idd = i
								}
							}
							if(idd == null){
								database.top.users[hth].push({"user_id": msg.action.member_id, "in_chat": true, "count": 1, "date": dddate})
							}
							else {
								database.top.users[hth][idd].date = dddate
							}
							aChatUser(msg.action.member_id, msg.chat_id)
						}
					}
					else {
						var idd = null
						for(var i = 0; i < database.top.users[hth].length; i++){
							if(database.top.users[hth][i].user_id == msg.action.member_id){
								idd = i
							}
						}
						if(idd == null){
							database.top.users[hth].push({"user_id": msg.action.member_id, "in_chat": true, "count": 1, "date": dddate})
						}
						else {
							database.top.users[hth][idd].date = dddate
						}
						aChatUser(msg.action.member_id, msg.chat_id)
					}
				}
			}
			else if(msg.action.type == "chat_kick_user" && msg.action.member_id != msg.user_id) {
				rChatUser(msg.action.member_id, msg.chat_id)
			}
		}
		else{
			var s = null
			var matched = null
			for(var i = 0; i < cmds_admin.length; i++) {
				if(msg.text.match(cmds_admin[i].regexp)) {
					matched = msg.text.match(cmds_admin[i].regexp)
					s = i
				}
			}
			if(s == null) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var hth = "chat"+msg.chat_id
				if(!database.top.users[hth]){
					database.top.users[hth] = [ {"user_id": msg.user_id, "in_chat": true, "count": 1, "date": dddate} ]
				}
				else {
					var idd = null
					for(var i = 0; i < database.top.users[hth].length; i++){
						if(database.top.users[hth][i].user_id == msg.user_id){
							idd = i
						}
					}
					if(idd == null){
						database.top.users[hth].push({"user_id": msg.user_id, "in_chat": true, "count": 1, "date": dddate})
					}
					else {
						database.top.users[hth][idd].count += 1
						database.top.users[hth][idd].date = dddate
					}
				}
				var dbidf = null
				for(var i = 0; i < database.chats.length; i++) {
					if(database.chats[i].chat == msg.chat_id) {
						dbidf = i
					}
				}
				if(database.chats[dbidf].matsfilter == true) {
					if(msg.text) {
						if(msg.text.match(/(6ля|6лядь|6лять|b3ъeб|cock|cunt|e6aль|ebal|eblan|eбaл|eбaть|eбyч|eбать|eбёт|eблантий|fuck|fucker|fucking|xyёв|xyй|xyя|xуе|xуй|xую|zaeb|zaebal|zaebali|zaebat|архипиздрит|ахуел|ахуеть|бздение|бздеть|бздех|бздецы|бздит|бздицы|бздло|бзднуть|бздун|бздунья|бздюха|бздюшка|бздюшко|бля|блябу|блябуду|бляд|бляди|блядина|блядище|блядки|блядовать|блядство|блядун|блядуны|блядунья|блядь|блядюга|блять|вафел|вафлёр|взъебка|взьебка|взьебывать|въеб|въебался|въебенн|въебусь|въебывать|выблядок|выблядыш|выеб|выебать|выебен|выебнулся|выебон|выебываться|выпердеть|высраться|выссаться|вьебен|гавно|гавнюк|гавнючка|гамно|гандон|гнид|гнида|гниды|говенка|говенный|говешка|говназия|говнецо|говнище|говно|говноед|говнолинк|говночист|говнюк|говнюха|говнядина|говняк|говняный|говнять|гондон|доебываться|долбоеб|долбоёб|долбоящер|дота|дрисня|дрист|дристануть|дристать|дристун|дристуха|дрочелло|дрочена|дрочила|дрочилка|дрочистый|дрочить|дрочка|дрочун|е6ал|е6ут|еб твою мать|ёб твою мать|ёбaн|ебaть|ебyч|ебал|ебало|ебальник|ебан|ебанамать|ебанат|ебаная|ёбаная|ебанический|ебанный|ебанныйврот|ебаное|ебануть|ебануться|ёбаную|ебаный|ебанько|ебарь|ебат|ёбат|ебатория|ебать|ебать-копать|ебаться|ебашить|ебёна|ебет|ебёт|ебец|ебик|ебин|ебись|ебическая|ебки|ебла|еблан|ебливый|еблище|ебло|еблысть|ебля|ёбн|ебнуть|ебнуться|ебня|ебошить|ебская|ебский|ебтвоюмать|ебун|ебут|ебуч|ебуче|ебучее|ебучий|ебучим|ебущ|ебырь|елда|елдак|елдачить|жопа|жопу|заговнять|задрачивать|задристать|задрота|зае6|заё6|заеб|заёб|заеба|заебал|заебанец|заебастая|заебастый|заебать|заебаться|заебашить|заебистое|заёбистое|заебистые|заёбистые|заебистый|заёбистый|заебись|заебошить|заебываться|залуп|залупа|залупаться|залупить|залупиться|замудохаться|запиздячить|засерать|засерун|засеря|засирать|засрун|захуячить|заябестая|злоеб|злоебучая|злоебучее|злоебучий|ибанамат|ибонех|изговнять|изговняться|изъебнуться|ипать|ипаться|ипаццо|какдвапальцаобоссать|конча|курва|курвятник|лох|лошарa|лошара|лошары|лошок|лярва|малафья|манда|мандавошек|мандавошка|мандавошки|мандей|мандень|мандеть|мандища|мандой|манду|мандюк|минет|минетчик|минетчица|млять|мокрощелка|мокрощёлка|мразь|мудak|мудaк|мудаг|мудак|муде|мудель|мудеть|муди|мудил|мудила|мудистый|мудня|мудоеб|мудозвон|мудоклюй|на хер|на хуй|набздел|набздеть|наговнять|надристать|надрочить|наебать|наебет|наебнуть|наебнуться|наебывать|напиздел|напиздели|напиздело|напиздили|насрать|настопиздить|нахер|нахрен|нахуй|нахуйник|не ебет|не ебёт|невротебучий|невъебенно|нехира|нехрен|нехуй|нехуйственно|ниибацо|ниипацца|ниипаццо|ниипет|никуя|нихера|нихуя|обдристаться|обосранец|обосрать|обосцать|обосцаться|обсирать|объебос|обьебать|обьебос|однохуйственно|опездал|опизде|опизденивающе|остоебенить|остопиздеть|отмудохать|отпиздить|отпиздячить|отпороть|отъебись|охуевательский|охуевать|охуевающий|охуел|охуенно|охуеньчик|охуеть|охуительно|охуительный|охуяньчик|охуячивать|охуячить|очкун|падла|падонки|падонок|паскуда|педерас|педик|педрик|педрила|педрилло|педрило|педрилы|пездень|пездит|пездишь|пездо|пездят|пердануть|пердеж|пердение|пердеть|пердильник|перднуть|пёрднуть|пердун|пердунец|пердунина|пердунья|пердуха|пердь|переёбок|пернуть|пёрнуть|пи3д|пи3де|пи3ду|пиzдец|пидар|пидарaс|пидарас|пидарасы|пидары|пидор|пидорасы|пидорка|пидорок|пидоры|пидрас|пизда|пиздануть|пиздануться|пиздарваньчик|пиздато|пиздатое|пиздатый|пизденка|пизденыш|пиздёныш|пиздеть|пиздец|пиздит|пиздить|пиздиться|пиздишь|пиздища|пиздище|пиздобол|пиздоболы|пиздобратия|пиздоватая|пиздоватый|пиздолиз|пиздонутые|пиздорванец|пиздорванка|пиздострадатель|пизду|пиздуй|пиздун|пиздунья|пизды|пиздюга|пиздюк|пиздюлина|пиздюля|пиздят|пиздячить|писбшки|писька|писькострадатель|писюн|писюшка|по хуй|по хую|подговнять|подонки|подонок|подъебнуть|подъебнуться|поебать|поебень|поёбываает|поскуда|посрать|потаскуха|потаскушка|похер|похерил|похерила|похерили|похеру|похрен|похрену|похуй|похуист|похуистка|похую|придурок|приебаться|припиздень|припизднутый|припиздюлина|пробзделся|проблядь|проеб|проебанка|проебать|промандеть|промудеть|пропизделся|пропиздеть|пропиздячить|раздолбай|разхуячить|разъеб|разъеба|разъебай|разъебать|распиздай|распиздеться|распиздяй|распиздяйство|распроеть|сволота|сволочь|сговнять|секель|серун|серька|сестроеб|сикель|сила|сирать|сирывать|соси|спиздел|спиздеть|спиздил|спиздила|спиздили|спиздит|спиздить|срака|сраку|сраный|сранье|срать|срун|ссака|ссышь|стерва|страхопиздище|сука|суки|суходрочка|сучара|сучий|сучка|сучко|сучонок|сучье|сцание|сцать|сцука|сцуки|сцуконах|сцуль|сцыха|сцышь|съебаться|сыкун|трахае6|трахаеб|трахаёб|трахатель|ублюдок|уебать|уёбища|уебище|уёбище|уебищное|уёбищное|уебк|уебки|уёбки|уебок|уёбок|урюк|усраться|ушлепок|х_у_я_р_а|хyё|хyй|хyйня|хамло|хер|херня|херовато|херовина|херовый|хитровыебанный|хитрожопый|хуeм|хуе|хуё|хуевато|хуёвенький|хуевина|хуево|хуевый|хуёвый|хуек|хуёк|хуел|хуем|хуенч|хуеныш|хуенький|хуеплет|хуеплёт|хуепромышленник|хуерик|хуерыло|хуесос|хуесоска|хуета|хуетень|хуею|хуи|хуй|хуйком|хуйло|хуйня|хуйрик|хуище|хуля|хую|хуюл|хуя|хуяк|хуякать|хуякнуть|хуяра|хуясе|хуячить|целка|чмо|чмошник|чмырь|шалава|шалавой|шараёбиться|шлюха|шлюхой|шлюшка|ябывает)/i)) {
							checkStaff(msg.from_id, msg.chat_id, function(f) {
								if(f.level == 0) {
									warnMat(msg.from_id, msg)
								}
							})
						}
					}
				}
				var chta = null
				for(var i = 0; i < database.top.chats.length; i++){
					if(database.top.chats[i].chat_id == msg.chat_id){
						chta = i
					}
				}
				if(chta == null) {
					if(msg.text) {
						database.top.chats.push({ "chat_id": msg.chat_id, "count": 1, "banned": false, "creator": database.chats[is].creator, "title": database.chats[is].title, "count_sim": msg.text.length, "commands": 0})
					}
					else {
						database.top.chats.push({ "chat_id": msg.chat_id, "count": 1, "banned": false, "creator": database.chats[is].creator, "title": database.chats[is].title, "count_sim": 1, "commands": 0})
					}
				}
				else {
					database.top.chats[chta].count += 1
					database.top.chats[chta].title = database.chats[is].title
					if(msg.text) {
						database.top.chats[chta].count_sim += msg.text.length
						if(msg.text.match(/(6ля|6лядь|6лять|b3ъeб|cock|cunt|e6aль|ebal|eblan|eбaл|eбaть|eбyч|eбать|eбёт|eблантий|fuck|fucker|fucking|xyёв|xyй|xyя|xуе|xуй|xую|zaeb|zaebal|zaebali|zaebat|архипиздрит|ахуел|ахуеть|бздение|бздеть|бздех|бздецы|бздит|бздицы|бздло|бзднуть|бздун|бздунья|бздюха|бздюшка|бздюшко|бля|блябу|блябуду|бляд|бляди|блядина|блядище|блядки|блядовать|блядство|блядун|блядуны|блядунья|блядь|блядюга|блять|вафел|вафлёр|взъебка|взьебка|взьебывать|въеб|въебался|въебенн|въебусь|въебывать|выблядок|выблядыш|выеб|выебать|выебен|выебнулся|выебон|выебываться|выпердеть|высраться|выссаться|вьебен|гавно|гавнюк|гавнючка|гамно|гандон|гнид|гнида|гниды|говенка|говенный|говешка|говназия|говнецо|говнище|говно|говноед|говнолинк|говночист|говнюк|говнюха|говнядина|говняк|говняный|говнять|гондон|доебываться|долбоеб|долбоёб|долбоящер|дота|дрисня|дрист|дристануть|дристать|дристун|дристуха|дрочелло|дрочена|дрочила|дрочилка|дрочистый|дрочить|дрочка|дрочун|е6ал|е6ут|еб твою мать|ёб твою мать|ёбaн|ебaть|ебyч|ебал|ебало|ебальник|ебан|ебанамать|ебанат|ебаная|ёбаная|ебанический|ебанный|ебанныйврот|ебаное|ебануть|ебануться|ёбаную|ебаный|ебанько|ебарь|ебат|ёбат|ебатория|ебать|ебать-копать|ебаться|ебашить|ебёна|ебет|ебёт|ебец|ебик|ебин|ебись|ебическая|ебки|ебла|еблан|ебливый|еблище|ебло|еблысть|ебля|ёбн|ебнуть|ебнуться|ебня|ебошить|ебская|ебский|ебтвоюмать|ебун|ебут|ебуч|ебуче|ебучее|ебучий|ебучим|ебущ|ебырь|елда|елдак|елдачить|жопа|жопу|заговнять|задрачивать|задристать|задрота|зае6|заё6|заеб|заёб|заеба|заебал|заебанец|заебастая|заебастый|заебать|заебаться|заебашить|заебистое|заёбистое|заебистые|заёбистые|заебистый|заёбистый|заебись|заебошить|заебываться|залуп|залупа|залупаться|залупить|залупиться|замудохаться|запиздячить|засерать|засерун|засеря|засирать|засрун|захуячить|заябестая|злоеб|злоебучая|злоебучее|злоебучий|ибанамат|ибонех|изговнять|изговняться|изъебнуться|ипать|ипаться|ипаццо|какдвапальцаобоссать|конча|курва|курвятник|лох|лошарa|лошара|лошары|лошок|лярва|малафья|манда|мандавошек|мандавошка|мандавошки|мандей|мандень|мандеть|мандища|мандой|манду|мандюк|минет|минетчик|минетчица|млять|мокрощелка|мокрощёлка|мразь|мудak|мудaк|мудаг|мудак|муде|мудель|мудеть|муди|мудил|мудила|мудистый|мудня|мудоеб|мудозвон|мудоклюй|на хер|на хуй|набздел|набздеть|наговнять|надристать|надрочить|наебать|наебет|наебнуть|наебнуться|наебывать|напиздел|напиздели|напиздело|напиздили|насрать|настопиздить|нахер|нахрен|нахуй|нахуйник|не ебет|не ебёт|невротебучий|невъебенно|нехира|нехрен|нехуй|нехуйственно|ниибацо|ниипацца|ниипаццо|ниипет|никуя|нихера|нихуя|обдристаться|обосранец|обосрать|обосцать|обосцаться|обсирать|объебос|обьебать|обьебос|однохуйственно|опездал|опизде|опизденивающе|остоебенить|остопиздеть|отмудохать|отпиздить|отпиздячить|отпороть|отъебись|охуевательский|охуевать|охуевающий|охуел|охуенно|охуеньчик|охуеть|охуительно|охуительный|охуяньчик|охуячивать|охуячить|очкун|падла|падонки|падонок|паскуда|педерас|педик|педрик|педрила|педрилло|педрило|педрилы|пездень|пездит|пездишь|пездо|пездят|пердануть|пердеж|пердение|пердеть|пердильник|перднуть|пёрднуть|пердун|пердунец|пердунина|пердунья|пердуха|пердь|переёбок|пернуть|пёрнуть|пи3д|пи3де|пи3ду|пиzдец|пидар|пидарaс|пидарас|пидарасы|пидары|пидор|пидорасы|пидорка|пидорок|пидоры|пидрас|пизда|пиздануть|пиздануться|пиздарваньчик|пиздато|пиздатое|пиздатый|пизденка|пизденыш|пиздёныш|пиздеть|пиздец|пиздит|пиздить|пиздиться|пиздишь|пиздища|пиздище|пиздобол|пиздоболы|пиздобратия|пиздоватая|пиздоватый|пиздолиз|пиздонутые|пиздорванец|пиздорванка|пиздострадатель|пизду|пиздуй|пиздун|пиздунья|пизды|пиздюга|пиздюк|пиздюлина|пиздюля|пиздят|пиздячить|писбшки|писька|писькострадатель|писюн|писюшка|по хуй|по хую|подговнять|подонки|подонок|подъебнуть|подъебнуться|поебать|поебень|поёбываает|поскуда|посрать|потаскуха|потаскушка|похер|похерил|похерила|похерили|похеру|похрен|похрену|похуй|похуист|похуистка|похую|придурок|приебаться|припиздень|припизднутый|припиздюлина|пробзделся|проблядь|проеб|проебанка|проебать|промандеть|промудеть|пропизделся|пропиздеть|пропиздячить|раздолбай|разхуячить|разъеб|разъеба|разъебай|разъебать|распиздай|распиздеться|распиздяй|распиздяйство|распроеть|сволота|сволочь|сговнять|секель|серун|серька|сестроеб|сикель|сила|сирать|сирывать|соси|спиздел|спиздеть|спиздил|спиздила|спиздили|спиздит|спиздить|срака|сраку|сраный|сранье|срать|срун|ссака|ссышь|стерва|страхопиздище|сука|суки|суходрочка|сучара|сучий|сучка|сучко|сучонок|сучье|сцание|сцать|сцука|сцуки|сцуконах|сцуль|сцыха|сцышь|съебаться|сыкун|трахае6|трахаеб|трахаёб|трахатель|ублюдок|уебать|уёбища|уебище|уёбище|уебищное|уёбищное|уебк|уебки|уёбки|уебок|уёбок|урюк|усраться|ушлепок|х_у_я_р_а|хyё|хyй|хyйня|хамло|хер|херня|херовато|херовина|херовый|хитровыебанный|хитрожопый|хуeм|хуе|хуё|хуевато|хуёвенький|хуевина|хуево|хуевый|хуёвый|хуек|хуёк|хуел|хуем|хуенч|хуеныш|хуенький|хуеплет|хуеплёт|хуепромышленник|хуерик|хуерыло|хуесос|хуесоска|хуета|хуетень|хуею|хуи|хуй|хуйком|хуйло|хуйня|хуйрик|хуище|хуля|хую|хуюл|хуя|хуяк|хуякать|хуякнуть|хуяра|хуясе|хуячить|целка|чмо|чмошник|чмырь|шалава|шалавой|шараёбиться|шлюха|шлюхой|шлюшка|ябывает)/i)) {
							database.top.chats[chta].matsmsg += 1
						}
					}
					if(typeof msg.attachments[0] !== "undefined") {
						if(msg.attachments[0].type == "sticker") {
							database.top.chats[chta].stickers += 1
						}
						else if(msg.attachments[0].type == "photo") {
							database.top.chats[chta].photos += 1
						}
					}
					if(typeof msg.fwd_messages[0] !== "undefined") {
						database.top.chats[chta].fwd_messages += msg.fwd_messages.length
					}
				}
				upd_db()
			}
			else {
				var chta = null
				for(var i = 0; i < database.top.chats.length; i++){
					if(database.top.chats[i].chat_id == msg.chat_id){
						chta = i
					}
				}
				if(chta == null) {
					if(msg.text) {
						database.top.chats.push({ "chat_id": msg.chat_id, "count": 1, "banned": false, "creator": database.chats[is].creator, "title": database.chats[is].title, "count_sim": 1, "commands": 1})
					}
					else {
						database.top.chats.push({ "chat_id": msg.chat_id, "count": 1, "banned": false, "creator": database.chats[is].creator, "title": database.chats[is].title, "count_sim": 1, "commands": 1})
					}
				}
				else {
					database.top.chats[chta].title = database.chats[is].title
					database.top.chats[chta].commands += 1
				}
				upd_db()
				var dbid = null
				for(var i = 0; i < database.chats.length; i++) {
					if(database.chats[i].chat == msg.chat_id) {
						dbid = i
					}
				}
				cmds_admin[s].f(matched,msg,dbid);
			}
		}
	}
}, {interval:500});

var cmds_admin = [
	{
		regexp:/^\/создать$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.create_chat){
				var is = null
				for(var i = 0; i < database.created_chats.length; i++) {
					if(database.created_chats[i].user_id == msg.user_id) {
						is = i
					}
				}
				if(is == null) {
					vkadmin.api.friends.areFriends({user_ids: msg.user_id}, function(a){
						if(a.response[0].friend_status == 3){
							vkadmin.api.users.get({users_ids: msg.user_id, fields: "can_write_private_message"}, function(a){
								if(a.response[0].can_write_private_message == 1){
									createChat(msg.user_id, msg)
									database.created_chats.push( { "user_id": msg.user_id, "count": 0 } )
								}
								else{
									msg.reply("❌ Извини, я не могу добавить тебя в беседу, т.к у тебя закрыты личные сообщения 😒")
								}
							})
						}
						else {
							msg.reply("❌ Извини, я не могу добавить тебя в беседу, т.к тебя нет у меня в друзьях 😒\nЕсли ты отправил заявку, нужно подождать примерно 1 минуту.")
						}
					})
				}
				else if(database.created_chats[is].count > 0) {
					vkadmin.api.friends.areFriends({user_ids: msg.user_id}, function(a){
						if(a.response[0].friend_status == 3){
							vkadmin.api.users.get({users_ids: msg.user_id, fields: "can_write_private_message"}, function(a){
								if(a.response[0].can_write_private_message == 1){
									createChat(msg.user_id, msg)
								}
								else{
									msg.reply("❌ Извини, я не могу добавить тебя в беседу, т.к у тебя закрыты личные сообщения 😒")
								}
							})
						}
						else {
							msg.reply("❌ Извини, я не могу добавить тебя в беседу, т.к тебя нет у меня в друзьях 😒\nЕсли ты отправил заявку, нужно подождать примерно 1 минуту.")
						}
					})
				}
				else{
					msg.reply("Вы не можете создать конференцию.\nКоличество конференций доступных для Вас: 0\nПокупка осуществляется через разработчика: vk.com/playadope")
				}
			}
		},
	},
	{
		regexp:/^\/apanel (.*)/i,
		f:function(params,msg,dbid) {
			if(msg.chat_id == chats.admins) {
				checkAdmin(msg, function(cb) {
					if(cb == true) {
						if(params[1] == "admins") {
							var test = []
							for(var i = 0; i < database.admins.length; i++){
								test.push(database.admins[i].user_id)
							}
							var users = vkadmin.apiSync.users.get({user_ids:test.join(","), fields:"first_name"}).response
							msg.jsend("💳 Список администраторов бота: " + test.map(x=> "\n" + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name + " - vk.com/id" + users.filter(e=> e.id == x)[0].id).join(""))
						}
						else if(params[1] == "moders") {
							var test = []
							for(var i = 0; i < database.moderators.length; i++){
								if(database.moderators[i].user_id > 0) {
									test.push(database.moderators[i].user_id)
								}
							}
							var users = vkadmin.apiSync.users.get({user_ids:test.join(","), fields:"first_name"}).response
							msg.jsend("💳 Список модераторов бота: " + test.map(x=> "\n" + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name + " - vk.com/id" + users.filter(e=> e.id == x)[0].id).join(""))
						}
						else if(params[1] == "blist") {
							var test = []
							for(var i = 0; i < database.banned.length; i++){
								if(database.banned[i].user_id > 0) {
									test.push(database.banned[i].user_id)
								}
							}
							var asfa = []
							for(var i = 0; i < database.banned.length; i++){
								if(database.banned[i].user_id < 0) {
									var fafs = database.banned[i].user_id
									fafs =-fafs
									asfa.push(fafs)
								}
							}
							var grp = vkadmin.apiSync.groups.getById({group_ids:asfa.join(",")}).response
							var users = vkadmin.apiSync.users.get({user_ids:test.join(","), fields:"first_name"}).response
							msg.jsend("Заблокированные пользователи: " + test.map(x=> "\n" + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name + " - vk.com/id" + users.filter(e=> e.id == x)[0].id) + asfa.map(a=> "\n Сообщество «" + grp.filter(e=> e.id == a)[0].name + "» - vk.com/club" + a))
						}
						else if(params[1] == "supports") {
							var test = []
							for(var i = 0; i < database.supports.length; i++){
								if(database.supports[i].user_id > 0) {
									test.push(database.supports[i].user_id)
								}
							}
							var users = vkadmin.apiSync.users.get({user_ids:test.join(","), fields:"first_name"}).response
							msg.jsend("💳 Список агентов поддержки бота: " + test.map(x=> "\n" + users.filter(e=> e.id == x)[0].first_name + " " + users.filter(e=> e.id == x)[0].last_name + " - vk.com/id" + users.filter(e=> e.id == x)[0].id).join(""))
						}
						else if(params[1].match(/^addmoder (.*)/)) {
							var getuser = params[1].replace(/^addmoder /, "")
							getUserID(getuser, function(id) {
								database.moderators.push( { "user_id": id, "level": 1, "accept": 0, "deny": 0, "deleted": 0, "reqban": 0 } )
							})
							msg.jsend("Добавлен модератор")
							upd_db()
						}
						else if(params[1].match(/^ban (.*)/)) {
							var getuser = params[1].replace(/^ban /, "")
							getUserID(getuser, function(id) {
								botBan(id)
							})
							msg.jsend("Пользователь заблокирован")
						}
						else if(params[1].match(/^unban (.*)/)) {
							var getuser = params[1].replace(/^unban /, "")
							getUserID(getuser, function(id) {
								botUnBan(id)
							})
							msg.jsend("Пользователь разблокирован")
						}
						else if(params[1].match(/^removemoder (.*)/)) {
							var getuser = params[1].replace(/^removemoder /, "")
							getUserID(getuser, function(id) {
								var fsf = null
								for(var i = 0; i < database.moderators.length; i++){
									if(database.moderators[i].user_id == id){
										fsf = i
									}
								}
								if(fsf != null) {
									database.moderators[fsf].user_id = -228
									database.moderators.splice(fsf, 1)
								}
								upd_db()
							})
							msg.jsend("Модератор снят")
							upd_db()
						}
						else if(params[1].match(/^addsupport (.*)/)) {
							var getuser = params[1].replace(/^addsupport /, "")
							getUserID(getuser, function(id) {
								database.supports.push( { "user_id": id } )
							})
							msg.jsend("Вы добавили саппорта")
							upd_db()
						}
						else if(params[1].match(/^addchats ([0-9]+) (.*)$/)) {
							var pamas = params[1].match(/^addchats ([0-9]+) (.*)$/)
							getUserID(pamas[2], function(id) {
								var is = null
								for(var i = 0; i < database.created_chats.length; i++) {
									if(database.created_chats[i].user_id == id) {
										is = i
									}
								}
								if(is == null) {
									var cc = 1 + parseInt(pamas[1])
									database.created_chats.push( { "user_id": id, "count": cc } )
									vkmanager.api.messages.send({user_id: id, message: "Вам была выдана возможность создать конференцию\nКоличество конференций: "+cc+"\n\nДля создания конференции, напишите команду « /чат »"})
								}
								else {
									database.created_chats[is].count += parseInt(pamas[1])
									vkmanager.api.messages.send({user_id: id, message: "Вам была выдана возможность создать конференцию\nКоличество конференций: "+database.created_chats[is].count+"\n\nДля создания конференции, напишите команду « /чат »"})
								}
							})
							msg.jsend("Вы добавили создание конференций пользователю")
						}
						else if(params[1] == "комм") {
							msg.jsend("Удалённых комментов: "+database.deletedcomments)
						}
						else if(params[1].match(/^removesupport (.*)/)) {
							var getuser = params[1].replace(/^removesupport /, "")
							getUserID(getuser, function(id) {
								var fsf = null
								for(var i = 0; i < database.supports.length; i++){
									if(database.supports[i].user_id == id){
										fsf = i
									}
								}
								if(fsf != null) {
									database.supports[fsf].user_id = -228
									database.supports.splice(fsf, 1)
								}
							})
							msg.jsend("Саппорт снят")
							upd_db()
						}
						else if(params[1].match(/^addvip ([0-9]+) ([0-9]+)/)) {
							var prms = params[1].match(/^addvip ([0-9]+) ([0-9]+)/)
							var fsf = null
							for(var i = 0; i < database.chats.length; i++){
								if(database.chats[i].chat == prms[1]){
									fsf = i
								}
							}
							if(fsf != null) {
								var datef = new Date();
								datef.setMonth(datef.getMonth() + 1)
								var dddatef = datef.getMonth()+"/"+datef.getDate()+"/"+datef.getFullYear()
								var days = 0
								if(database.chats[fsf].vip_date) {
									days = daydiff(parseDate(dddatef), parseDate(database.chats[fsf].vip_date))
								}
								var date = new Date();
								date.setMonth(date.getMonth() + 1)
								var derrd = parseInt(prms[2])
								if(days > 0) {
									derrd = days + parseInt(prms[2])
								}
								else {
									derrd = parseInt(prms[2])
								}
								date.setDate(date.getDate() + derrd)
								var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
								database.chats[fsf].vip_date = dddate
								vkadmin.api.messages.send({chat_id: prms[1], message:"🔥 Вип статус продлён на "+prms[2]+" дней."})
								msg.jsend("Успешно добавлен ВИП-Статус в беседу #"+prms[1]+" на "+prms[2]+" дней ("+dddate+")")
							}
							upd_db()
						}
					}
				})
			}
		},
	},
/*	{
		regexp:/^\/подарок$/i,
		f:function(params,msg,dbid) {
			var checkgift = null
			for(var i = 0; i < database.gifts.length; i++){
				if(database.gifts[i].user_id == msg.user_id){
					checkgift = i
				}
			}
			if(checkgift == null) {
				checkStaff(msg.user_id, msg.chat_id, function(fack) {
					if(fack.creator == true) {
						vkadmin.api.groups.isMember({group_id: 171193536, user_id: msg.user_id}, function(b) {
							if(b.response == 1) {
								checkcomment.api.wall.getComments({owner_id: -171193536, post_id: 26, count: 100}, function(a) {
									var comm_id = null
									for(var i = 0; i < a.response.items.length; i++) {
										if(a.response.items[i].from_id == msg.user_id) {
											comm_id = i
										}
									}
									if(comm_id == null) {
										vkadmin.api.messages.send({chat_id: msg.chat_id, message: "Вы не оставили комментарий под записью.", attachment: "wall-171193536_26"})
									}
									else {
										var fsf = null
										for(var i = 0; i < database.chats.length; i++){
											if(database.chats[i].chat == msg.chat_id){
												fsf = i
											}
										}
										if(fsf != null) {
											var datef = new Date();
											datef.setMonth(datef.getMonth() + 1)
											var dddatef = datef.getMonth()+"/"+datef.getDate()+"/"+datef.getFullYear()
											var days = 0
											if(database.chats[fsf].vip_date) {
												days = daydiff(parseDate(dddatef), parseDate(database.chats[fsf].vip_date))
											}
											var date = new Date();
											date.setMonth(date.getMonth() + 1)
											var derrd = 7
											if(days > 0) {
												derrd = days + 7
											}
											else {
												derrd = 7
											}
											date.setDate(date.getDate() + derrd)
											var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
											database.chats[fsf].vip_date = dddate
											msg.reply("Вы получили ВИП-Статус в конференцию на 7 дней.")
											database.gifts.push( { "user_id": msg.user_id } )
										}
									}
								})
							}
							else {
								msg.reply("Вы не подписались на сообщество [socialkot|Бот Кот]!!!")
							}
						})
					}
				})
			}
			else {
				msg.reply("Вы уже получали подарок.")
			}
		},
	},*/
	{
		regexp:/^\/settings/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.level > 2) {
					var is = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == msg.chat_id) {
							is = i
						}
					}
					if(msg.text.match(/^\/settings (.*)$/i)) {
						var paam = msg.text.match(/^\/settings (invite|kick_leave|linkban) (on|off)$/i)
						if(paam != null) {
							if(paam[1] == "invite") {
								if(paam[2] == "on") {
									database.chats[is].can_invite = true
									msg.reply("Теперь пользователи могут приглашать в беседу.")
								}
								else if(paam[2] == "off") {
									database.chats[is].can_invite = false
									msg.reply("Теперь пользователи не могут приглашать в беседу.")
								}
							}
							if(paam[1] == "kick_leave") {
								if(paam[2] == "on") {
									database.chats[is].kick_leave = true
									msg.reply("Теперь пользователи при выходе из беседы будут кикнуты.")
								}
								else if(paam[2] == "off") {
									database.chats[is].kick_leave = false
									msg.reply("Теперь пользователи при выходе из беседы не будут кикнуты.")
								}
							}
							if(paam[1] == "linkban") {
								if(paam[2] == "on") {
									database.chats[is].link_ban = true
									msg.reply("Теперь пользователи при отправке ссылки на беседу будут забанены.")
								}
								else if(paam[2] == "off") {
									database.chats[is].link_ban = false
									msg.reply("Теперь пользователи при отправке ссылки на беседу не будут забанены.")
								}
							}
						}
					}
					else if(msg.text.match(/^\/settings$/i)) {
						msg.reply("Настройки беседы:\n"+(database.chats[is].can_invite == false?"Участники не могут приглашать людей в беседу":"Участники могут приглашать людей в беседу")+"\nИзменить: /settings invite (on|off)\n\n"+(database.chats[is].kick_leave == false?"Участники не будут кикнуты после выхода из беседы":"Участники будут кикнуты после выхода из беседы")+"\nИзменить: /settings kick_leave (on|off)\n\n"+(database.chats[is].link_ban == true?"Участники будут забанены при отправке ссылки на беседу":"Участники не будут забанены при отправке ссылки на беседу")+"\nИзменить: /settings linkban (on|off)")
					}
				}
			})
		},
	},
	{
		regexp:/^\/photo$/i,
		f:function(params,msg,dbid){
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.admin == true) {
					if(typeof msg.attachments[0] !== "undefined") {
						if(msg.attachments[0].photo) {
							if(msg.attachments[0].photo.sizes[2].width == 500 && msg.attachments[0].photo.sizes[2].height == 500) {
								request(msg.attachments[0].photo.sizes[6].url).pipe(fs.createWriteStream("./bots/adminbot/data/photos/"+msg.chat_id+".jpg")).on("close", function(){
									moderatephoto(msg)
								})
							}
							else{
								msg.reply("⚠ Для корректного отображения фото должно быть 500 x 500 пикселей.\n😉 Установите другое фото.")
							}
						}
					}
				}
			})
		},
	},
	{
		regexp:/^\/create/i,
		f:function(params,msg,dbid) {
			if(msg.chat_id == chats.admins) {
				createChat(msg.user_id, msg)
			}
		},
	},
	{
		regexp:/^\/chatstats$/i,
		f:function(params,msg,dbid) {
			topchatusers(msg)
		},
	},
	{
		regexp:/^\/рейтинг$/i,
		f:function(params,msg,dbid) {
			topchats(msg)
		},
	},
	{
		regexp:/^\/getlink$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.spec_admin == true) {
					vkadmin.api.messages.getInviteLink({peer_id:msg.peer_id}, function(a){
						msg.reply("Ссылка на беседу: "+a.response.link)
					})
				}
			})
		},
	},
	{
		regexp:/^\/(offlink|resetlink)$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.spec_admin == true) {
					vkadmin.api.messages.getInviteLink({peer_id:msg.peer_id, reset: 1}, function(a){
						msg.reply("&#9989; Ссылка на беседу была сброшена.")
					})
				}
			})
		},
	},
	{
		regexp:/^\/pin$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					if(typeof msg.fwd_messages[0] !== "undefined") {
						vkadmin.api.messages.search({q: msg.fwd_messages[0].text, peer_id: msg.peer_id, count: 100}, function(a){
							var msgid = null
							for(var i = 0; i < a.response.items.length; i++) {
								if(a.response.items[i].from_id == msg.fwd_messages[0].from_id && a.response.items[i].text == msg.fwd_messages[0].text && a.response.items[i].date == msg.fwd_messages[0].date) {
									msgid = a.response.items[i].id
								}
							}
							if(msgid != null) {
								vkadmin.api.messages.pin({peer_id: msg.peer_id, message_id: msgid}, function(b){
									var is = null
									for(var i = 0; i < database.chats.length; i++) {
										if(database.chats[i].chat == msg.chat_id) {
											is = i
										}
									}
									database.chats[is].pin_msg = msgid
									upd_db()
								})
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/unpin$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					vkadmin.api.messages.unpin({peer_id: msg.peer_id})
					var is = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == msg.chat_id) {
							is = i
						}
					}
					database.chats[is].pin_msg = 0
					upd_db()
				}
			})
		},
	},
	{
		regexp:/^\/offchat$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var is = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == msg.chat_id) {
							is = i
						}
					}
					database.chats[is].muted = true
					msg.reply("✅ Режим тишины активирован.\n⚠ Каждый кто напишет в чат будет кикнут.\n❗ Примечание: режим тишины не действует на администраторов и модераторов.")
					upd_db()
				}
			})
		},
	},
	{
		regexp:/^\/onchat$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var is = null
					for(var i = 0; i < database.chats.length; i++) {
						if(database.chats[i].chat == msg.chat_id) {
							is = i
						}
					}
					database.chats[is].muted = false
					msg.reply("✅ Режим тишины деактивирован.\n😉 Можно общаться.")
					upd_db()
				}
			})
		},
	},
	{
		regexp:/^\/admins$/i,
		f:function(params,msg,dbid) {
			var names = database.users.filter(a=> a.moder == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var usernames = vkadmin.apiSync.users.get({user_ids:names.join(","), fields:"first_name"}).response
			var f = database.users.filter(a=> a.creator == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var creator = "Создатель: \n" + f.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			var af = database.users.filter(a=> a.spec_admin == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var spec = "Спец. администраторы: \n" + af.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			var afa = database.users.filter(a=> a.admin == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var admin = "Администраторы: \n" + afa.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			msg.send(creator+"\n\n"+spec+"\n\n"+admin)
		},
	},
	{
		regexp:/^\/moders$/i,
		f:function(params,msg,dbid) {
			var afa = database.users.filter(a=> a.moder == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var moddesn = vkadmin.apiSync.users.get({user_ids:afa.join(","), fields:"first_name"}).response
			var moder = "Модераторы: \n" + afa.map(a=> i++ +". " + moddesn.filter(e=> e.id == a)[0].first_name + " " + moddesn.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			msg.send(moder)
		},
	},
	{
		regexp:/^\/blist$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var afa = database.users.filter(a=> a.banned == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
					var asfa = []
					for(var i = 0; i < database.users.length; i++){
						if(database.users[i].banned == true && database.users[i].chat_id == msg.chat_id && database.users[i].user_id < 0) {
							var fafs = database.users[i].user_id
							fafs =-fafs
							asfa.push(fafs)
						}
					}
					var i = 1
					var moddesn = vkadmin.apiSync.users.get({user_ids:afa.join(","), fields:"first_name"}).response
					var grp = vkadmin.apiSync.groups.getById({group_ids:asfa.join(",")}).response
					if(typeof afa[0] !== "undefined") {
						var moder = "Черный список беседы: \n" + afa.map(a=> i++ +". " + moddesn.filter(e=> e.id == a)[0].first_name + " " + moddesn.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n") + "\n" + asfa.map(a=> i++ +". Сообщество «" + grp.filter(e=> e.id == a)[0].name + "» - vk.com/club" + a).join("\n")
						msg.send(moder)
					}
					else {
						msg.send("⚠ Черный список пуст.")
					}
				}
			})
		},
	},
	{
		regexp:/^\/report (.*)$/i,
		f:function(params,msg,dbid){
			var f = database.users.filter(a=> a.user_id == msg.user_id && a.chat_id == msg.chat_id).map(a=> a.moder)
			if(f[0] == true) {
				var idd = null
				for(var i = 0; i < reports.check.length; i++){
					if(reports.check[i].cid == msg.chat_id){
						idd = i
					}
				}
				if(idd == null){
					if(!blockurls(params[1])){
						reports.check.push( { "cid": msg.chat_id, "msgid": msg.id } )
						vkadmin.api.messages.send({chat_id: chats.supports, message: "Новый вопрос.\nЧтобы ответить введите /answer "+msg.chat_id+" (Ответ)", forward_messages: msg.id})
						msg.reply("Ваше сообщение отправлено.")
						upd_reports()
					}
				}
				else {
					msg.reply("Вы уже отправляли вопрос. Пожалуйста подождите.")
				}
			}
		},
	},
	{
		regexp:/^\/answer ([0-9]+) (.*)$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.supports) {
				checkSupport(msg, function(cb) {
					if(cb == true) {
						var idd = 999999
						for(var i = 0; i < reports.check.length; i++){
							if(reports.check[i].cid == params[1]){
								idd = i
							}
						}
						if(idd != 999999 && !blockurls(params[2])){
							vkadmin.api.messages.send({chat_id: parseInt(params[1]), message: "📖 Ответ на ваш вопрос: \n⠀⠀"+params[2], forward_messages: reports.check[idd].msgid})
							reports.check.splice(idd, 1)
							msg.jsend("Ответ отправлен")
							upd_reports()
						}
						else {
							msg.jsend("На этот вопрос уже ответили")
						}
					}
				})
			}
		},
	},
	{
		regexp:/\/acceptphoto ([0-9]+)$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						acceptphoto(parseInt(params[1]), msg)
					}
				})
			}
		},
	},
	{
		regexp:/^\/help$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.level == 4 || f.level == 5) {
					msg.reply("✅ Команды:\n\n/title - Установить новое название конференции\n/photo - Установить новый аватар конференции\n/offchat - Активировать режим тишины\n/onchat - Деактивировать режим тишины\n/kick - Исключить пользователя из конференции\n/ban - Заблокировать пользователя в конференции\n/unban - Разблокировать пользователя в конференции\n/role specadmin - Выдать права спец. администратора в конференции\n/role admin - Выдать права администратора в конференции\n/role moder - Выдать права модератора в конференции\n/role clear - Снять права у пользователя в конференции\n/pin - Закрепить сообщение в конференции\n/unpin - Открепить сообщение в конференции\n/getlink - Создать ссылку на вступление в конференцию\n/offlink - Удалить ссылку на вступление в конференцию\n/cid - Узнать ID конференции\n/warn - Выдать предупреждение пользователю\n/unwarn - Снять предупреждения пользователю\n/clean - Очистить чат конференции\n/checkwarns - Посмотреть предупреждения пользователя\n/blist - Черный список конференции\n/mute - Выдать блокировку чата пользователю\n/unmute - Снять блокировку чата пользователю\n/онлайн зови - Позвать пользователей в сети\n/правила установить - Установить правила в беседе\n/settings - Настройки конференции")
				}
				else if(f.level == 3) {
					msg.reply("✅ Команды:\n\n/title - Установить новое название конференции\n/photo - Установить новый аватар конференции\n/offchat - Активировать режим тишины\n/onchat - Деактивировать режим тишины\n/kick - Исключить пользователя из конференции\n/ban - Заблокировать пользователя в конференции\n/unban - Разблокировать пользователя в конференции\n/role admin - Выдать права администратора в конференции\n/role moder - Выдать права модератора в конференции\n/role clear - Снять права у пользователя в конференции\n/pin - Закрепить сообщение в конференции\n/unpin - Открепить сообщение в конференции\n/getlink - Создать ссылку на вступление в конференцию\n/offlink - Удалить ссылку на вступление в конференцию\n/cid - Узнать ID конференции\n/warn - Выдать предупреждение пользователю\n/unwarn - Снять предупреждения пользователю\n/clean - Очистить чат конференции\n/checkwarns - Посмотреть предупреждения пользователя\n/blist - Черный список конференции\n/mute - Выдать блокировку чата пользователю\n/unmute - Снять блокировку чата пользователю\n/онлайн зови - Позвать пользователей в сети\n/правила установить - Установить правила в беседе\n/settings - Настройки конференции")
				}
				else if(f.level == 2) {
					msg.reply("✅ Команды:\n\n/title - Установить новое название конференции\n/photo - Установить новый аватар конференции\n/offchat - Активировать режим тишины\n/onchat - Деактивировать режим тишины\n/kick - Исключить пользователя из конференции\n/ban - Заблокировать пользователя в конференции\n/unban - Разблокировать пользователя в конференции\n/role moder - Выдать права модератора в конференции\n/role clear - Снять права у пользователя в конференции\n/pin - Закрепить сообщение в конференции\n/unpin - Открепить сообщение в конференции\n/cid - Узнать ID конференции\n/warn - Выдать предупреждение пользователю\n/unwarn - Снять предупреждения пользователю\n/clean - Очистить чат конференции\n/checkwarns - Посмотреть предупреждения пользователя\n/blist - Черный список конференции\n/mute - Выдать блокировку чата пользователю\n/unmute - Снять блокировку чата пользователю\n/онлайн зови - Позвать пользователей в сети\n/правила установить - Установить правила в беседе")
				}
				else if(f.level == 1) {
					msg.reply("✅ Команды:\n\n/kick - Исключить пользователя из конференции\n/mute - Выдать блокировку чата пользователю\n/unmute - Снять блокировку чата пользователю\n/онлайн зови - Позвать пользователей в сети")
				}
			})
		},
	},
	{
		regexp:/^\/мур$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.reply("😼")
			}
		},
	},
	{
		regexp:/^\/гав$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.reply("🐶")
			}
		},
	},
	{
		regexp:/^\/ко$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.reply("&#128020;")
			}
		},
	},
	{
		regexp:/^\/онлайн/i,
		f:function(params,msg,dbid) {
			if(msg.text == "/онлайн") {
				vkadmin.api.messages.getChat({fields: "counters, online", chat_id: msg.chat_id}, function(a){
					var users = []
					a.response.users.map(function(a){
						if(a.id != botid){
							if(a.online == 1) {
								users.push( { "id": a.id, "name": a.first_name + " " + a.last_name } )
							}
						}
					})
					msg.send("📖 Список пользователей в сети " + users.map(x=> "\n" + x.name + " - vk.com/id" + x.id).join(""))
				})
			}
			else if(msg.text == "/онлайн зови") {
				checkStaff(msg.user_id, msg.chat_id, function(f) {
					if(f.moder == true) {
						vkadmin.api.messages.getChat({fields: "counters, online", chat_id: msg.chat_id}, function(a){
							var users = []
							a.response.users.map(function(a){
								if(a.id != botid){
									if(a.online == 1) {
										users.push( { "id": a.id, "name": a.first_name + " " + a.last_name } )
									}
								}
							})
							msg.send(users.map(x=> "@id" + x.id).join(", "))
						})
					}
				})
			}
		},
	},
	{
		regexp:/^\/правила/i,
		f:function(params,msg,dbid) {
			if(msg.text == "/правила") {
				if(database.chats[dbid].rules_msg) {
					vkadmin.api.messages.send({peer_id: msg.peer_id, forward_messages: database.chats[dbid].rules_msg})
				}
				else {
					msg.send("Правил нету.")
				}
			}
			else if(msg.text == "/правила установить") {
				checkStaff(msg.user_id, msg.chat_id, function(f) {
					if(f.admin == true) {
						if(typeof msg.fwd_messages[0] !== "undefined") {
							vkadmin.api.messages.search({q: msg.fwd_messages[0].text, peer_id: msg.peer_id, count: 100}, function(a){
								var msgid = null
								for(var i = 0; i < a.response.items.length; i++) {
									if(a.response.items[i].from_id == msg.fwd_messages[0].from_id && a.response.items[i].text == msg.fwd_messages[0].text && a.response.items[i].date == msg.fwd_messages[0].date) {
										msgid = a.response.items[i].id
									}
								}
								if(msgid != null) {
									database.chats[dbid].rules_msg = msgid
									msg.send("Правила установлены")
									upd_db()
								}
							})
						}
					}
				})
			}
		},
	},
	{
		regexp:/^\/menu$/i,
		f:function(params,msg,dbid) {
			msg.reply("Ⓜ Меню бота:\n\n⏩/правила - Правила конференции\n⏩/admins - Список администрации\n⏩/moders - Список модераторов\n⏩/ко, /мур, /гав - Отклик бота\n⏩/reference - Получить справку о боте\n⏩/wlist - Список предупреждений\n⏩/chatstats - Статистика конференции\n⏩/онлайн - Список пользователей в сети\n⏩/рейтинг - Топ 10 активных конференций\n⏩/vip help - Список команд для вип-чатов\n💌/report - Задать вопрос отделу поддержки")
		},
	},
	{
		regexp:/^\/vip help$/i,
		f:function(params,msg,dbid) {
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					msg.reply("&#9989; Команды для ВИП бесед: \n\n/demote - Исключить всех пользователей из беседы\n/rkick - Исключить пользователя из беседы и того кого он пригласил\n/msgkick - Исключить пользователей написавшие меньше чем определённое кол-во сообщений\n/неактив - Просмотр неактивных пользователей\n/неактив кикнуть - Исключить неактивных пользователей")
				}
			}
		},
	},
	{
		regexp:/^\/vip days$/i,
		f:function(params,msg,dbid) {
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					msg.reply("Вип статус истекает через "+days+" дней.")
				}
				else {
					msg.reply("В этой конференции отсутствует ВИП-Статус")
				}
			}
		},
	},
	{
		regexp:/^\/reference$/i,
		f:function(params,msg,dbid) {
			msg.reply("&#128260; Справка:\n\n➡ Список команд для администраторов или модераторов (/help)\n➡ Список команд для обычных пользователей (/menu)\n➡ Нашли баг? Баг трекер: https://vk.cc/8uclxv\n➡ Есть идеи что добавить в бота? Отпишите сюда: https://vk.cc/8ucldI")
		},
	},
	{
		regexp:/\/denyphoto ([0-9]+)$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						denyphoto(parseInt(params[1]), msg)
					}
				})
			}
		},
	},
	{
		regexp:/^\[club171260710\|.*] Обновить клавиатуру/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						var osse = JSON.stringify(moderkeys, null, "  ")
						modkeys.api.messages.send({peer_id: 2000000002, message: "Клавиатура обновлена", keyboard: osse})
					}
				})
			}
		},
	},
	{
		regexp:/^(\[club171260710\|.*] Панель модератора|\/mpanel)$/i,
		f:function(params,msg,dbid){ 
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						var is = null
						for(var i = 0; i < database.moderators.length; i++) {
							if(database.moderators[i].user_id == msg.user_id) {
								is = i
							}
						}
						var cols = database.moderators[is].accept + database.moderators[is].deny
						msg.jsend("Панель модератора "+msg.user_info.first_name+" "+msg.user_info.last_name+"\n\nУровень модератора: "+database.moderators[is].level+"\nПроверенных заявок: "+cols+"\nИз них одобренных: "+database.moderators[is].accept+"\nОтклонённых: "+database.moderators[is].deny+"\n\nУдалено бесед: "+database.moderators[is].deleted+"\nЗаблокированных заявок: "+database.moderators[is].reqban+"\n\nДоступные команды:\n/accepttitle (ID Беседы) - Одобрить заявку\n/denytitle (ID Беседы) - Отклонить заявку\n/reqban (ID Беседы) - Заблокировать возможность отправки заявок\n/mpanel - Статистика и помощь по командам\n/mpanel delete (ID Беседы) (Причина) - Отправить заявку на удаление конференции")
					}
				})
			}
		},
	},
/*	{
		regexp:/^\/mpanel delete ([0-9]+) (.*)$/i,
		f:function(params,msg,dbid) {
			checkModer(msg, function(cb) {
				if(cb.moder == true) {
					if(!blockurls(params[2])) {
						modkeys.api.messages.send({peer_id: 2000000006, message: "[id"+msg.user_id+"|"+msg.user_info.first_name+" "+msg.user_info.last_name+"] подал заявку на удаление конференции #"+params[1]+" Причина: "+params[2]})
					}
				}
			})
		},
	},*/
	{
		regexp:/\/accepttitle ([0-9]+)$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						accepttitle(parseInt(params[1]), msg)
					}
				})
			}
		},
	},
	{
		regexp:/\/denytitle ([0-9]+)$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id == chats.moders) {
				checkModer(msg, function(cb) {
					if(cb.moder == true) {
						denytitle(parseInt(params[1]), msg)
					}
				})
			}
		},
	},
	{
		regexp:/^\/title (.*)$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.level > 1) {
					if(!blockurls(params[1])) {
						var is = null
						for(var i = 0; i < database.chats.length; i++) {
							if(database.chats[i].chat == msg.chat_id) {
								is = i
							}
						}
						if(is != null) {
							if(database.chats[is].new_title == null) {
								database.chats[is].new_title = params[1]
								edittitle(msg, params[1])
							}
							else {
								msg.reply("🔄 Вы уже отправляли заявку, ждите ее одобрения, либо отказа.")
							}
						}
					}
				}
			})
		},
	},
	{
		regexp:/^\/wlist$/i,
		f:function(params,msg,dbid) {
			var is = null
			for(var i = 0; i < database.users.length; i++) {
				if(database.users[i].user_id == msg.user_id && database.users[i].chat_id == msg.chat_id) {
					is = i
				}
			}
			if(is != null) {
				if(typeof database.users[is].warns[0] === "undefined") {
					msg.reply("❌ У вас нет предупреждений.")
				}
				else {
					var fa = 1 
					var lolik = "📒 Список предупреждений:\n" + database.users[is].warns.map(a=> fa++ + "" + ". vk.com/id" + a.id_admin + "").join("\n")
					msg.reply(lolik)
				}
			}
			else {
				msg.reply("❌ У вас нет предупреждений.")
			}
		},
	},
	{
		regexp:/^\/ban/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/ban (.*)$/i)){
						var getuser = msg.text.replace(/^\/ban /i, "")
						getUserID(getuser, function(id) {
							if(id == botid || id == group_ans)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									var isa = null
									for(var i = 0; i < database.users.length; i++) {
										if(database.users[i].user_id == id && database.users[i].chat_id == msg.chat_id) {
											isa = i
										}
									}
									if(isa != null) {
										if(database.users[isa].banned == true) {
											if(id > 0) {
												msg.reply("[id"+id+"|Пользователь] уже заблокирован.")
											}
											else if(id < 0) {
												id =-id
												msg.reply("[club"+id+"|Сообщество] уже заблокировано.")
											}
										}
										else {
											banUserInChat(id, msg.chat_id, msg)
										}
									}
									else {
										banUserInChat(id, msg.chat_id, msg)
									}
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/ban$/i)){
						var id = msg.fwd_messages[0].from_id
						if(msg.fwd_messages[0].from_id == botid || msg.fwd_messages[0].from_id == group_ans)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								var isa = null
								for(var i = 0; i < database.users.length; i++) {
									if(database.users[i].user_id == msg.fwd_messages[0].from_id && database.users[i].chat_id == msg.chat_id) {
										isa = i
									}
								}
								if(isa != null) {
									if(database.users[isa].banned == true) {
										if(id > 0) {
											msg.reply("[id"+msg.fwd_messages[0].from_id+"|Пользователь] уже заблокирован.")
										}
										else if(id < 0) {
											msg.fwd_messages[0].from_id =-msg.fwd_messages[0].from_id
											msg.reply("[club"+msg.fwd_messages[0].from_id+"|Сообщество] уже заблокировано.")
										}
									}
									else {
										banUserInChat(msg.fwd_messages[0].from_id, msg.chat_id, msg)
									}
								}
								else {
									banUserInChat(msg.fwd_messages[0].from_id, msg.chat_id, msg)
								}
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/tempban/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.level == 5) {
					if(msg.text.match(/^\/tempban ([0-9]+) (мин|час|месяц|год) (.*)/i)){
						var prma = msg.text.match(/^\/tempban ([0-9]+) (мин|час|день|месяц|год) (.*)$/i)
					//	var getuser = msg.text.replace(/^\/tempban /i, "")
						getUserID(prma[3], function(id) {
							if(id == botid || id == group_ans)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									getUnbanDate(prma[1], prma[2], function(unbandate) {
										var isa = null
										for(var i = 0; i < database.users.length; i++) {
											if(database.users[i].user_id == id && database.users[i].chat_id == msg.chat_id) {
												isa = i
											}
										}
										if(isa != null) {
											if(database.users[isa].banned == true) {
												if(id > 0) {
													msg.reply("[id"+id+"|Пользователь] уже заблокирован.")
												}
												else if(id < 0) {
													id =-id
													msg.reply("[club"+id+"|Сообщество] уже заблокировано.")
												}
											}
											else {
												tempbanUserInChat(id, msg.chat_id, msg, unbandate)
											}
										}
										else {
											tempbanUserInChat(id, msg.chat_id, msg, unbandate)
										}
									})
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
				/*	else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/tempban ([0-9]+) (мин|час|месяц|год)$/i)){
						var id = msg.fwd_messages[0].from_id
						if(msg.fwd_messages[0].from_id == botid || msg.fwd_messages[0].from_id == group_ans)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								var isa = null
								for(var i = 0; i < database.users.length; i++) {
									if(database.users[i].user_id == msg.fwd_messages[0].from_id && database.users[i].chat_id == msg.chat_id) {
										isa = i
									}
								}
								if(isa != null) {
									if(database.users[isa].banned == true) {
										if(id > 0) {
											msg.reply("[id"+msg.fwd_messages[0].from_id+"|Пользователь] уже заблокирован.")
										}
										else if(id < 0) {
											msg.fwd_messages[0].from_id =-msg.fwd_messages[0].from_id
											msg.reply("[club"+msg.fwd_messages[0].from_id+"|Сообщество] уже заблокировано.")
										}
									}
									else {
										tempbanUserInChat(msg.fwd_messages[0].from_id, msg.chat_id, msg)
									}
								}
								else {
									tempbanUserInChat(msg.fwd_messages[0].from_id, msg.chat_id, msg)
								}
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}*/
				}
			})
		},
	},
	{
		regexp:/^\/unban/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/unban (.*)$/i)){
						var getuser = msg.text.replace(/^\/unban /i, "")
						getUserID(getuser, function(id) {
							if(id == botid || id == group_ans)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									var isa = null
									for(var i = 0; i < database.users.length; i++) {
										if(database.users[i].user_id == id && database.users[i].chat_id == msg.chat_id) {
											isa = i
										}
									}
									if(isa != null) {
										if(database.users[isa].banned == false) {
											if(id > 0) {
												msg.reply("[id"+id+"|Пользователь] не заблокирован.")
											}
											else if(id < 0) {
												id =-id
												msg.reply("[club"+id+"|Сообщество] не заблокировано.")
											}
										}
										else {
											unbanUserInChat(id, msg.chat_id, msg)
										}
									}
									else {
										if(id > 0) {
											msg.reply("[id"+id+"|Пользователь] не заблокирован.")
										}
										else if(id < 0) {
											id =-id
											msg.reply("[club"+id+"|Сообщество] не заблокировано.")
										}
									}
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/unban$/i)){
						if(msg.fwd_messages[0].from_id == botid || msg.fwd_messages[0].from_id == group_ans)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								var id = msg.fwd_messages[0].from_id
								var isa = null
								for(var i = 0; i < database.users.length; i++) {
									if(database.users[i].user_id == msg.fwd_messages[0].from_id && database.users[i].chat_id == msg.chat_id) {
										isa = i
									}
								}
								if(isa != null) {
									if(database.users[isa].banned == false) {
										if(id > 0) {
											msg.reply("[id"+id+"|Пользователь] не заблокирован.")
										}
										else if(id < 0) {
											id =-id
											msg.reply("[club"+id+"|Сообщество] не заблокировано.")
										}
									}
									else {
										unbanUserInChat(id, msg.chat_id, msg)
									}
								}
								else {
									if(id > 0) {
										msg.reply("[id"+id+"|Пользователь] не заблокирован.")
									}
									else if(id < 0) {
										id =-id
										msg.reply("[club"+id+"|Сообщество] не заблокировано.")
									}
								}
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/sendtest/i,
		f:function(params,msg,dbid) {
			if(msg.user_id == 489356469) {
				msg.jsend("@playadope (САНЯ ЛУЧШИЙ)")
			}
		},
	},
	{
		regexp:/^\/lang (.*)/i,
		f:function(params,msg,dbid) {
			if(msg.user_id == 489356469) {
				if(params[1] == "en") {
					database.chats[dbid].lang = params[1]
					msg.jsend("Language changed to English.")
				}
				else if(params[1] == "ru") {
					database.chats[dbid].lang = params[1]
					msg.jsend("Язык изменён на русский.")
				}
			}
		},
	},
	{
		regexp:/^\/kick/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.moder == true) {
					if(msg.text.match(/^\/kick (.*)$/i)){
						var getuser = msg.text.replace(/^\/kick /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									vkadmin.api.messages.removeChatUser({member_id: id, chat_id: msg.chat_id}, function(a) {
										if(!a.error) {
											if(id > 0) {
											//	var gh = lang[database.chats[dbid].lang].kick_user_msg.replace(/%user_id%/, id)
												msg.reply("[id"+id+"|Пользователь] исключён из беседы.")
											}
											else if(id < 0) {
												id =-id
												msg.reply("[club"+id+"|Сообщество] исключено из беседы.")
											}
										}
										rChatUser(id, msg.chat_id)
									})
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/kick$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								vkadmin.api.messages.removeChatUser({member_id: msg.fwd_messages[0].from_id, chat_id: msg.chat_id}, function(a) {
									if(!a.error) {
										if(msg.fwd_messages[0].from_id > 0) {
											msg.reply("[id"+msg.fwd_messages[0].from_id+"|Пользователь] исключён из беседы.")
										}
										else if(msg.fwd_messages[0].from_id < 0) {
											msg.fwd_messages[0].from_id =-msg.fwd_messages[0].from_id
											msg.reply("[club"+msg.fwd_messages[0].from_id+"|Сообщество] исключено из беседы.")
										}
									}
									rChatUser(msg.fwd_messages[0].from_id, msg.chat_id)
								})
							}
							else {
								msg.jsend("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/unwarn/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/unwarn (.*)$/i)){
						var getuser = msg.text.replace(/^\/unwarn /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									unWarnUserChat(id, msg.chat_id, msg)
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/unwarn$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								unWarnUserChat(msg.fwd_messages[0].from_id, msg.chat_id, msg)
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/warn/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/warn (.*)$/i)){
						var getuser = msg.text.replace(/^\/warn /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									warnChatUser(id, msg.chat_id, msg)
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/warn$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								warnChatUser(msg.fwd_messages[0].from_id, msg.chat_id, msg)
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/leave$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(fa) {
				if(fa.level == 5) {
					vkadmin.api.messages.removeChatUser({member_id: msg.user_id, chat_id: msg.chat_id})
				}
			})
		},
	},
	{
		regexp:/^\/unmute/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.moder == true) {
					if(msg.text.match(/^\/unmute (.*)$/i)){
						var getuser = msg.text.replace(/^\/unmute /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									unmuteChatUser(id, msg.chat_id, msg)
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/unmute$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								unmuteChatUser(msg.fwd_messages[0].from_id, msg.chat_id, msg)
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/mute/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.moder == true) {
					if(msg.text.match(/^\/mute (.*)$/i)){
						var getuser = msg.text.replace(/^\/mute /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(clb) {
								if(calb.level > clb.level) {
									muteChatUser(id, msg.chat_id, msg)
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/mute$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
							if(calb.level > clb.level) {
								muteChatUser(msg.fwd_messages[0].from_id, msg.chat_id, msg)
							}
							else {
								msg.reply("❌ Отказ в доступе!")
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/msgkick ([0-9]+)$/i,
		f:function(params,msg,dbid) {
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					if(params[1] < 151 && params[1] > 0) {
						checkStaff(msg.user_id, msg.chat_id, function(fc) {
							if(fc.spec_admin == true) {
								msgkickchat(msg.chat_id, params[1])
							}
						})
					}
				}
				else {
					msg.reply("В этой конференции отсутствует ВИП-Статус")
				}
			}
			else {
				msg.reply("В этой конференции отсутствует ВИП-Статус")
			}
		},
	},
	{
		regexp:/^\/demote$/i,
		f:function(params,msg,dbid) {
			if(msg.user_id == 426462303)return;
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					checkStaff(msg.user_id, msg.chat_id, function(fc) {
						if(fc.creator == true) {
							msg.reply("⛔ [WARNING] ⛔\n⚡ Вы активировали процедуру очистки пользователей..")
							vkadmin.api.messages.getChat({chat_id: msg.chat_id, fields: "counters"}, function(a) {
								a.response.users.map(function(users){
									if(users.id != botid && users.id != msg.user_id){
										if(users.type == "profile"){
											vkadmin.api.messages.removeChatUser({member_id: users.id, chat_id: msg.chat_id})
										}
										else if(users.type == "group"){
											var kickusr = parseInt("-"+users.id)
											if(kickusr != group_ans) {
												vkadmin.api.messages.removeChatUser({member_id: kickusr, chat_id: msg.chat_id})
											}
										}
									}
								})
							})
						}
					})
				}
				else {
					msg.reply("В этой конференции отсутствует ВИП-Статус")
				}
			}
			else {
				msg.reply("В этой конференции отсутствует ВИП-Статус")
			}
		},
	},
	{
		regexp:/^\/неактив/i,
		f:function(params,msg,dbid) {
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					if(msg.text.match(/^\/неактив$/i)) {
						checkStaff(msg.user_id, msg.chat_id, function(calb) {
							if(calb.moder == true) {
								checkAktiv(msg.chat_id, function(cb) {
									msg.reply(cb)
								})
							}
						})
					}
					else if(msg.text.match(/^\/неактив кикнуть$/i)) {
						checkStaff(msg.user_id, msg.chat_id, function(calb) {
							if(calb.spec_admin == true) {
								kickNeaktiv(msg.chat_id,msg)
							}
						})
					}
				}
				else {
					msg.reply("В этой конференции отсутствует ВИП-Статус")
				}
			}
			else {
				msg.reply("В этой конференции отсутствует ВИП-Статус")
			}
		},
	},
	{
		regexp:/^\/rkick/i,
		f:function(params,msg,dbid) {
			if(database.chats[dbid].vip_date) {
				var date = new Date();
				date.setMonth(date.getMonth() + 1)
				var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
				var days = daydiff(parseDate(dddate), parseDate(database.chats[dbid].vip_date))
				if(days > 0) {
					checkStaff(msg.user_id, msg.chat_id, function(calb) {
						if(calb.spec_admin == true) {
							if(msg.text.match(/^\/rkick (.*)$/i)){
								var getuser = msg.text.replace(/^\/rkick /i, "")
								getUserID(getuser, function(id) {
									if(id == botid)return;
									checkStaff(id, msg.chat_id, function(clb) {
										if(calb.level > clb.level) {
											rKickChatUser(id, msg)
										}
										else {
											msg.reply("❌ Отказ в доступе!")
										}
									})
								})
							}
							else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/rkick$/i)){
								if(msg.fwd_messages[0].from_id == botid)return;
								checkStaff(msg.fwd_messages[0].from_id, msg.chat_id, function(clb) {
									if(calb.level > clb.level) {
										rKickChatUser(msg.fwd_messages[0].from_id, msg)
									}
									else {
										msg.reply("❌ Отказ в доступе!")
									}
								})
							}
						}
					})
				}
				else {
					msg.reply("В этой конференции отсутствует ВИП-Статус")
				}
			}
			else {
				msg.reply("В этой конференции отсутствует ВИП-Статус")
			}
		},
	},
	{
		regexp:/^\/checkwarns/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/checkwarns (.*)$/i)){
						var getuser = msg.text.replace(/^\/checkwarns /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkWarnsUser(id, msg.chat_id, msg)
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined" && msg.text.match(/^\/checkwarns$/i)){
						if(msg.fwd_messages[0].from_id == botid)return;
						checkWarnsUser(msg.fwd_messages[0].from_id, msg.chat_id, msg)
					}
				}
			})
		},
	},
	{
		regexp:/^\/role (moder|admin|specadmin|clear|creator)/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(calb) {
				if(calb.admin == true) {
					if(msg.text.match(/^\/role (moder|admin|specadmin|clear|creator) (.*)$/i)){
						var getuser = msg.text.replace(/^\/role (moder|admin|specadmin|clear|creator) /i, "")
						getUserID(getuser, function(id) {
							if(id == botid)return;
							checkStaff(id, msg.chat_id, function(cbl) {
								if(params[1] == "moder") {
									if(calb.level > cbl.level) {
										setRole(id, msg.chat_id, "moder")
										msg.reply("[id"+id+"|Пользователь] назначен модератором беседы.")
									}
									else {
										msg.reply("❌ Отказ в доступе!")
									}
								}
								else if(params[1] == "admin") {
									if(calb.spec_admin == true) {
										if(calb.level > cbl.level) {
											setRole(id, msg.chat_id, "admin")
											msg.reply("[id"+id+"|Пользователь] назначен администратором беседы.")
										}
										else {
											msg.reply("❌ Отказ в доступе!")
										}
									}
								}
								else if(params[1] == "specadmin") {
									if(calb.creator == true) {
										if(calb.level > cbl.level) {
											setRole(id, msg.chat_id, "specadmin")
											msg.reply("[id"+id+"|Пользователь] назначен спец.администратором беседы.")
										}
										else {
											msg.reply("❌ Отказ в доступе!")
										}
									}
								}
								else if(params[1] == "creator") {
									if(msg.user_id == 489356469) {
										setRole(id, msg.chat_id, "creator")
										msg.reply("[id"+id+"|Пользователь] назначен создателем беседы.")
									}
								}
								else if(params[1] == "clear") {
									if(calb.level > cbl.level) {
										setRole(id, msg.chat_id, "clear")
										msg.reply("С [id"+id+"|пользователя] сняты права.")
									}
									else {
										msg.reply("❌ Отказ в доступе!")
									}
								}
							})
						})
					}
					else if(typeof msg.fwd_messages[0] !== "undefined"){
						if(msg.fwd_messages[0].from_id == botid)return;
						var id = msg.fwd_messages[0].from_id
						checkStaff(id, msg.chat_id, function(cbl) {
							if(params[1] == "moder") {
								if(calb.level > cbl.level) {
									setRole(id, msg.chat_id, "moder")
									msg.reply("[id"+id+"|Пользователь] назначен модератором беседы.")
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							}
							else if(params[1] == "admin") {
								if(calb.spec_admin == true) {
									if(calb.level > cbl.level) {
										setRole(id, msg.chat_id, "admin")
										msg.reply("[id"+id+"|Пользователь] назначен администратором беседы.")
									}
									else {
										msg.reply("❌ Отказ в доступе!")
									}
								}
							}
							else if(params[1] == "specadmin") {
								if(calb.creator == true) {
									if(calb.level > cbl.level) {
										setRole(id, msg.chat_id, "specadmin")
										msg.reply("[id"+id+"|Пользователь] назначен спец.администратором беседы.")
									}
									else {
										msg.reply("❌ Отказ в доступе!")
									}
								}
							}
							else if(params[1] == "creator") {
								if(msg.user_id == 489356469) {
									setRole(id, msg.chat_id, "creator")
									msg.reply("[id"+id+"|Пользователь] назначен создателем беседы.")
								}
							}
							else if(params[1] == "clear") {
								if(calb.level > cbl.level) {
									setRole(id, msg.chat_id, "clear")
									msg.reply("С [id"+id+"|пользователя] сняты права.")
								}
								else {
									msg.reply("❌ Отказ в доступе!")
								}
							}
						})
					}
				}
			})
		},
	},
	{
		regexp:/^\/clean$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.level > 1) {
					var isa = " <br>"
					for(var i = 0; i < 200; i++) {
						isa = isa+" <br>"
					}
					msg.send(isa+"Чат очищен [id"+msg.user_id+"|администратором].")
				}
			})
		},
	},
	{
		regexp:/^\/cid$/i,
		f:function(params,msg,dbid) {
			checkStaff(msg.user_id, msg.chat_id, function(f) {
				if(f.level > 1) {
					msg.reply("&#9989; ID беседы: "+msg.chat_id)
				}
			})
		},
	},
	{
		regexp:/^\/backup/i,
		f:function(params,msg,dbid) {
			if(msg.user_id == 489356469) {
				fs.writeFileSync("./bots/adminbot/backup/database.json", JSON.stringify(database, null, "\t"))
				fs.writeFileSync("./bots/gamebot_1/backup/database.json", JSON.stringify(database, null, "\t"))
				msg.jsend("Backup Database created")
				functions.logTxt("[Backup] Created backup")
			}
		},
	},
]

function logTxt(str) {
	var fileContent = fs.readFileSync("./bots/adminbot/log.txt", "utf8")
	var logtime = new Date()
	logtime.setMonth(logtime.getMonth() + 1)
	var date = logtime.getDate()
	if(date < 10) {
		date = "0"+logtime.getDate()
	}
	var month = logtime.getMonth()
	if(month < 10) {
		month = "0"+logtime.getMonth()
	}
	var hours = logtime.getHours()
	if(hours < 10) {
		hours = "0"+logtime.getHours()
	}
	var mins = logtime.getMinutes()
	if(mins < 10) {
		mins = "0"+logtime.getMinutes()
	}
	var sec = logtime.getSeconds()
	if(sec < 10) {
		sec = "0"+logtime.getSeconds()
	}
	var lt = date+"."+month+"."+logtime.getFullYear()+" "+hours+":"+mins+":"+sec
	fs.writeFile("./bots/adminbot/log.txt", fileContent+"\n["+lt+"] | "+str)
}

function checkWarnsUser(user, chat, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		if(typeof database.users[is].warns[0] === "undefined") {
			if(user > 0) {
				msg.reply("❌ У [id"+user+"|пользователя] нет предупреждений.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("❌ У [club"+user+"|сообщества] нет предупреждений.")
			}
		}
		else {
			var fa = 1
			var lolik = database.users[is].warns.map(a=> fa++ + "" + ". vk.com/id" + a.id_admin + "").join("\n")
			if(user > 0) {
				msg.reply("📒 Список предупреждений [id"+user+"|пользователя]:\n"+lolik)
			}
			else if(user < 0) {
				user =-user
				msg.reply("📒 Список предупреждений [club"+user+"|сообщества]:\n"+lolik)
			}
		}
	}
	else {
		if(user > 0) {
			msg.reply("❌ У [id"+user+"|пользователя] нет предупреждений.")
		}
		else if(user < 0) {
			user =-user
			msg.reply("❌ У [club"+user+"|сообщества] нет предупреждений.")
		}
	}
}

function unWarnUserChat(user, chat, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		if(typeof database.users[is].warns[0] === "undefined") {
			if(user > 0) {
				msg.reply("❌ У [id"+user+"|пользователя] нет предупреждений.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("❌ У [club"+user+"|сообщества] нет предупреждений.")
			}
		}
		else {
			database.users[is].warns = []
			if(user > 0) {
				msg.reply("[id"+user+"|Пользователю] сняты предупреждения.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("[club"+user+"|Сообществу] сняты предупреждения.")
			}
		}
	}
	else {
		if(user > 0) {
			msg.reply("❌ У [id"+user+"|пользователя] нет предупреждений.")
		}
		else if(user < 0) {
			user =-user
			msg.reply("❌ У [club"+user+"|сообщества] нет предупреждений.")
		}
	}
	upd_db()
}

function rKickChatUser(user, msg) {
	vkadmin.api.messages.removeChatUser({user_id: user, chat_id: msg.chat_id})
	vkadmin.api.messages.getChat({chat_id: msg.chat_id, fields: "counters"}, function(a){
		if(!a.error){
			for(var i = 0; i < a.response.users.length; i++){
				var fsfs = a.response.users.length - 1
				if(a.response.users[i] != null){
					if(a.response.users[i].invited_by == user){
						vkadmin.api.messages.removeChatUser({member_id: a.response.users[i].id, chat_id: msg.chat_id})
					}
				}
			}
		}
	})
}

function rChatUser(user, chat) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].in_chat = false
	}
	var cc = "chat"+chat
	var b = null
	if(typeof database.top.users[cc] !== "undefined") {
		for(var i = 0; i < database.top.users[cc].length; i++) {
			if(database.top.users[cc][i].user_id == user) {
				b = i
			}
		}
		if(b != null) {
			database.top.users[cc][b].in_chat = false
		}
	}
	upd_db()
}

function muteChatUser(user, chat, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		if(database.users[is].muted == false || !database.users[is].muted) {
			database.users[is].muted = true
			if(user > 0) {
				msg.reply("[id"+user+"|Пользователю] выдан бан чата на 10 минут.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("[club"+user+"|Сообществу] выдан бан чата на 10 минут.")
			}
			setTimeout(function () {
				database.users[is].muted = false
			}, 600000)
		}
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 0, "warns": [], "muted": true })
		if(user > 0) {
			msg.reply("[id"+user+"|Пользователю] выдан бан чата на 10 минут.")
		}
		else if(user < 0) {
			user =-user
			msg.reply("[club"+user+"|Сообществу] выдан бан чата на 10 минут.")
		}
		var is = null
		for(var i = 0; i < database.users.length; i++) {
			if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
				is = i
			}
		}
		setTimeout(function () {
			database.users[is].muted = false
		}, 600000)
	}
	upd_db()
}

function unmuteChatUser(user, chat, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		if(database.users[is].muted == true) {
			database.users[is].muted = false
			if(user > 0) {
				msg.reply("C [id"+user+"|пользователя] снят бан чата.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("С [club"+user+"|сообщества] снят бан чата.")
			}
		}
	}
	upd_db()
}

function warnChatUser(user, chat, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		database.users[is].warns.push({ "id_admin": msg.user_id })
		if(database.users[is].warns.length == 3) {
			banUserInChat(user, chat, msg)
			database.users[is].warns = []
		}
		else {
			if(user > 0) {
				msg.reply("[id"+user+"|Пользователю] выдано предупреждение ("+database.users[is].warns.length+"/3)")
			}
			else if(user < 0) {
				user =-user
				msg.reply("[club"+user+"|Сообществу] выдано предупреждение ("+database.users[is].warns.length+"/3)")
			}
		}
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 0, "warns": [ { "id_admin": msg.user_id } ] })
		if(user > 0) {
			msg.reply("[id"+user+"|Пользователю] выдано предупреждение (1/3)")
		}
		else if(user < 0) {
			user =-user
			msg.reply("[club"+user+"|Сообществу] выдано предупреждение (1/3)")
		}
	}
	upd_db()
}

function getUnbanDate(param1, param2, callback) {
	var date = "none"
	var fdate = new Date()
	if(param2 == "мин") {
		fdate.setMinutes(fdate.getMinutes() + parseInt(param1))
	}
	else if(param2 == "час") {
		fdate.setHours(fdate.getHours() + parseInt(param1))
	}
	else if(param2 == "день") {
		fdate.setDate(fdate.getDate() + parseInt(param1))
	}
	else if(param2 == "месяц") {
		fdate.setMonth(fdate.getMonth() + parseInt(param1))
	}
	else if(param2 == "год") {
		fdate.setFullYear(fdate.getFullYear() + parseInt(param1))
	}
	callback(fdate)
}

function warnMat(user, msg) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == msg.chat_id) {
			is = i
		}
	}
	if(is != null) {
		database.users[is].warns.push({ "id_admin": botid })
		if(database.users[is].warns.length == 3) {
			banUserInChat(user, chat, msg)
			database.users[is].warns = []
		}
		else {
			if(user > 0) {
				msg.reply("[id"+user+"|Пользователь] получил предупреждение ("+database.users[is].warns.length+"/3) за мат.")
			}
			else if(user < 0) {
				user =-user
				msg.reply("[club"+user+"|Сообщество] получило предупреждение ("+database.users[is].warns.length+"/3) за мат.")
			}
		}
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 0, "warns": [ { "id_admin": botid } ] })
		if(user > 0) {
			msg.reply("[id"+user+"|Пользователь] получил предупреждение (1/3) за мат.")
		}
		else if(user < 0) {
			user =-user
			msg.reply("[club"+user+"|Сообщество] получило предупреждение (1/3) за мат.")
		}
	}
	upd_db()
}

function checkAktiv(chat, callback) {
	var hth = "chat"+chat
	var neaktiv = []
	var msg = "null"
	vkadmin.api.messages.getChat({chat_id: chat, fields: "counters"}, function(a){
		for(var i = 0; i < a.response.users.length; i++){
			if(a.response.users[i].id != botid) {
				if(a.response.users[i].type == "profile") {
					checkStaff(a.response.users[i].id, chat, function(ff) {
						if(ff.level == 0) {
							checkDays(a.response.users[i].id, hth, function(callback) {
								if(callback == true) {
									neaktiv.push(a.response.users[i].id)
								}
							})
						}
					})
				}
			}
		}
		if(neaktiv.length > 0) {
			var usernames = vkadmin.apiSync.users.get({user_ids:neaktiv.join(","), fields:"first_name"}).response
			msg = "Неактивные: \n" + neaktiv.map(a=> usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
		}
		else {
			msg = "Неактивных нету."
		}
		callback(msg)
	})
}

function kickNeaktiv(chat,msg) {
	var hth = "chat"+chat
	var neaktiv = []
	var msgg = "null"
	vkadmin.api.messages.getChat({chat_id: chat, fields: "counters"}, function(a){
		for(var i = 0; i < a.response.users.length; i++){
			if(a.response.users[i].id != botid) {
				checkDays(a.response.users[i].id, hth, function(callback) {
					if(callback == true) {
						neaktiv.push(a.response.users[i].id)
					}
				})
			}
		}
		for(var i = 0; i < neaktiv.length; i++){
			checkStaff(neaktiv[i], chat, function(b) {
				var gg = neaktiv.length - 1
				if(i == gg) {
					if(b.level == 0) {
						rChatUser(neaktiv[i], chat)
						vkadmin.api.messages.removeChatUser({member_id: neaktiv[i], chat_id: chat}, function(a) {
							msg.reply("Все неактивные пользователи кикнуты")
						})
					}
					else {
						msg.reply("Все неактивные пользователи кикнуты")
					}
				}
				else {
					if(b.level == 0) {
						rChatUser(neaktiv[i], chat)
						vkadmin.api.messages.removeChatUser({member_id: neaktiv[i], chat_id: chat})
					}
				}
			})
		}
		
	})
}

function checkDays(user, hth, callback) {
	var iddf = null
	for(var i = 0; i < database.top.users[hth].length; i++){
		if(database.top.users[hth][i].user_id == user){
			iddf = i
		}
	}
	var cbneak = null
	if(iddf != null) {
		var date = new Date();
		date.setMonth(date.getMonth() + 1)
		var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
		var days = daydiff(parseDate(database.top.users[hth][iddf].date), parseDate(dddate))
		if(days >= 5) {
			cbneak = true
		}
		else {
			cbneak = false
		}
	}
	else {
		cbneak = true
	}
	callback(cbneak)
}

function banUserInChat(user, chat, msg) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].banned = true
		database.users[isa].in_chat = false
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": true, "bot_warns": 0, "warns": [] })
	}
	var cc = "chat"+chat
	var b = null
	for(var i = 0; i < database.top.users[cc].length; i++) {
		if(database.top.users[cc][i].user_id == user) {
			b = i
		}
	}
	if(b != null) {
		database.top.users[cc][b].in_chat = false
	}
	vkadmin.api.messages.removeChatUser({member_id: user, chat_id: msg.chat_id}, function(a) {
		rChatUser(user, msg.chat_id)
		if(user > 0) {
			msg.reply("[id"+user+"|Пользователь] заблокирован.")
		}
		else if(user < 0) {
			user =-user
			msg.reply("[club"+user+"|Сообщество] заблокировано.")
		}
	})
	upd_db()
}

function tempbanUserInChat(user, chat, msg, unbandate) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].banned = true
		database.users[isa].in_chat = false
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": true, "bot_warns": 0, "warns": [] })
	}
	var cc = "chat"+chat
	var b = null
	for(var i = 0; i < database.top.users[cc].length; i++) {
		if(database.top.users[cc][i].user_id == user) {
			b = i
		}
	}
	if(b != null) {
		database.top.users[cc][b].in_chat = false
	}
	vkadmin.api.messages.removeChatUser({member_id: user, chat_id: msg.chat_id}, function(a) {
		rChatUser(user, msg.chat_id)
		if(user > 0) {
			msg.reply("[id"+user+"|Пользователь] заблокирован до "+unbandate)
		}
		else if(user < 0) {
			user =-user
			msg.reply("[club"+user+"|Сообщество] заблокировано до "+unbandate)
		}
	})
	database.tempbans.push( { "user_id": user, "chat_id": chat, "unbandate": unbandate } )
	upd_db()
}

function fabanUserInChat(user, chat) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].banned = true
		database.users[isa].in_chat = true
	}
	else {
		database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": true, "bot_warns": 0, "warns": [] })
	}
	var cc = "chat"+chat
	var b = null
	for(var i = 0; i < database.top.users[cc].length; i++) {
		if(database.top.users[cc][i].user_id == user) {
			b = i
		}
	}
	if(b != null) {
		database.top.users[cc][b].in_chat = false
	}
	upd_db()
}

function unbanUserInChat(user, chat, msg) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].banned = false
	}
	var is = null
	for(var i = 0; i < database.tempbans.length; i++){
		if(database.tempbans[i].user_id == user && database.tempbans[i].chat_id == chat) {
			is = i
		}
	}
	if(is != null) {
		database.tempbans.splice(is, 1)
	}
	if(user > 0) {
		msg.reply("[id"+user+"|Пользователь] разблокирован.")
	}
	else if(user < 0) {
		user =-user
		msg.reply("[club"+user+"|Сообщество] разблокировано.")
	}
	upd_db()
}

function aChatUser(user, chat) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].in_chat = true
	}
	var cc = "chat"+chat
	var b = null
	if(typeof database.top.users[cc] !== "undefined") {
		for(var i = 0; i < database.top.users[cc].length; i++) {
			if(database.top.users[cc][i].user_id == user) {
				b = i
			}
		}
		if(b != null) {
			database.top.users[cc][b].in_chat = true
		}
	}
	upd_db()
}

function accepttitle(chtid, msg) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chtid) {
			is = i
		}
	}
	if(is != null) {
		if(database.chats[is].new_title != null) {
			var mid = null
			for(var i = 0; i < database.moderators.length; i++) {
				if(database.moderators[i].user_id == msg.user_id) {
					mid = i
				}
			}
			database.moderators[mid].accept += 1
			functions.logTxt("[Moderators] accepttitle < chat_id: "+ chtid +", title: "+ database.chats[is].new_title +" > moder_id: "+msg.user_id)
			database.chats[is].title = database.chats[is].new_title
			database.chats[is].new_title = null
			upd_db()
			vkadmin.api.messages.editChat({chat_id: chtid, title: database.chats[is].title}, function(a){
				vkadmin.api.messages.send({chat_id: chtid, message:"💮 Модератор одобрил Вашу заявку на смену названия конференции № "+chtid})
			})
			var idd = null
			for(var i = 0; i < moderkeys.buttons.length; i++){
				if(typeof moderkeys.buttons[i][0] !== "undefined") {
					if(moderkeys.buttons[i][0].action.label == "/accepttitle "+chtid){
						idd = i
					}
				}
			}
			if(idd != null) {
				moderkeys.buttons.splice(idd, 1)
			}
			var osse = JSON.stringify(moderkeys, null, "  ")
			modkeys.api.messages.send({peer_id: 2000000002, message: "⚡ Заявка одобрена!", keyboard: osse})
		}
		else {
			msg.jsend("🔄 Заявка уже проверена, либо ещё не создана.")
		}
	}
}

function denytitle(chtid, msg) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chtid) {
			is = i
		}
	}
	if(is != null) {
		if(database.chats[is].new_title != null) {
			var mid = null
			for(var i = 0; i < database.moderators.length; i++) {
				if(database.moderators[i].user_id == msg.user_id) {
					mid = i
				}
			}
			database.moderators[mid].deny += 1
			functions.logTxt("[Moderators] denytitle < chat_id: "+ chtid +", title: "+ database.chats[is].new_title +" > moder_id: "+msg.user_id)
			database.chats[is].new_title = null
			upd_db()
			vkadmin.api.messages.send({chat_id: chtid, message:"💮 Модератор отклонил Вашу заявку на смену названия конференции № "+chtid})
			var idd = null
			for(var i = 0; i < moderkeys.buttons.length; i++){
				if(typeof moderkeys.buttons[i][0] !== "undefined") {
					if(moderkeys.buttons[i][0].action.label == "/accepttitle "+chtid){
						idd = i
					}
				}
			}
			if(idd != null) {
				moderkeys.buttons.splice(idd, 1)
			}
			var osse = JSON.stringify(moderkeys, null, "  ")
			modkeys.api.messages.send({peer_id: 2000000002, message: "⚡ Заявка отклонена!", keyboard: osse})
		}
		else {
			msg.jsend("🔄 Заявка уже проверена, либо ещё не создана.")
		}
	}
}

function botWarn(user, chat) {
	checkStaff(user, chat, function(f) {
		if(f.level == 0) {
			var s = null
			for(var i = 0; i < database.users.length; i++) {
				if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
					s = i
				}
			}
			if(s == null) {
				database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 1, "warns": [] })
			}
			else {
				database.users[s].bot_warns += 1
				if(database.users[s].bot_warns == 5) {
					database.users[s].bot_warns = 0
					vkadmin.api.messages.removeChatUser({member_id: user, chat_id: chat}, function(a) {
						rChatUser(user, chat)
					})
				}
			}
			upd_db()
		}
	})
}

function acceptphoto(chtid, msg) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chtid) {
			is = i
		}
	}
	if(is != null) {
		if(database.chats[is].photo_new != null) {
			if(database.chats[is].photo_new == true) {
				var mid = null
				for(var i = 0; i < database.moderators.length; i++) {
					if(database.moderators[i].user_id == msg.user_id) {
						mid = i
					}
				}
				database.moderators[mid].accept += 1
				functions.logTxt("[Moderators] acceptphoto < chat_id: "+ chtid +" > moder_id: "+msg.user_id)
				database.chats[is].photo_new = false
				upd_db()
				msg.setChatPhotoModer("./bots/adminbot/data/photos/" + chtid + ".jpg", chtid)
				var idd = null
				for(var i = 0; i < moderkeys.buttons.length; i++){
					if(moderkeys.buttons[i][0].action.label == "/acceptphoto "+chtid){
						idd = i
					}
				}
				if(idd != null) {
					moderkeys.buttons.splice(idd, 1)
				}
				var osse = JSON.stringify(moderkeys, null, "  ")
				modkeys.api.messages.send({peer_id: 2000000002, message: "⚡ Заявка одобрена!", keyboard: osse})
			}
		}
		else {
			msg.jsend("🔄 Заявка уже проверена, либо ещё не создана.")
		}
	}
}

function denyphoto(chtid, msg) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chtid) {
			is = i
		}
	}
	if(is != null) {
		if(database.chats[is].photo_new != null) {
			if(database.chats[is].photo_new == true) {
				var mid = null
				for(var i = 0; i < database.moderators.length; i++) {
					if(database.moderators[i].user_id == msg.user_id) {
						mid = i
					}
				}
				database.moderators[mid].deny += 1
				functions.logTxt("[Moderators] denyphoto < chat_id: "+ chtid +" > moder_id: "+msg.user_id)
				database.chats[is].photo_new = false
				upd_db()
				vkadmin.api.messages.send({chat_id: chtid, message:"💮 Модератор отклонил Вашу заявку на смену фотографии конференции № "+chtid})
				var idd = null
				for(var i = 0; i < moderkeys.buttons.length; i++){
					if(moderkeys.buttons[i][0].action.label == "/acceptphoto "+chtid){
						idd = i
					}
				}
				if(idd != null) {
					moderkeys.buttons.splice(idd, 1)
				}
				var osse = JSON.stringify(moderkeys, null, "  ")
				modkeys.api.messages.send({peer_id: 2000000002, message: "⚡ Заявка отклонена!", keyboard: osse})
			}
		}
		else {
			msg.jsend("🔄 Заявка уже проверена, либо ещё не создана.")
		}
	}
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function createChat(user, msg) {
	vkadmin.api.messages.createChat({user_ids: msg.user_id, title: "New Chat"}, function(a){
		var date = new Date();
		date.setMonth(date.getMonth() + 1)
		var dddate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear()
		var hth = "chat"+a.response
		database.top.users[hth] = [ {"user_id": msg.user_id, "in_chat": true, "count": 1, "date": dddate} ]
		database.chats.push({ "chat": a.response, "title": "New Chat", "new_title": null, "pin_msg": 0, "muted": false, "can_invite": false, "kick_leave": true, "photo": null, "photo_new": false, "creator": user })
		database.top.chats.push({ "chat_id": a.response, "count": 0, "banned": false, "creator": user, "title": "New Chat", "count_sim": 0, "commands": 0, "stickers": 0, "photos": 0, "fwd_messages": 0, "matsmsg": 0 })
		database.users.push({ "user_id": user, "chat_id": a.response, "in_chat": true, "creator": true, "spec_admin": true, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
		msg.reply("💬 Уважаемый, "+msg.user_info.first_name+" !\n\n❇ Ваша конференция создана, и готова к работе!\n\n❤ С любовью, [socialkot|бот кот]")
		vkadmin.api.messages.send({chat_id: a.response, message: "🔰 Ваша конференция успешно создана!\n\n🔯 /help - Управление конференцией\n🔯 /menu - Меню конференции\n\nС уважением, разработчик @playadope (Ριαγα Ωόρξ) 😘"})
		upd_db()
	})
}

function edittitle(msg, title) {
	if(!blockurls(title)){
		msg.reply("⏳ Заявка на установку названия беседы отправлена! Ожидайте ответа модератора.")
		var ccept = "/accepttitle "+msg.chat_id
		var dddn = "/denytitle "+msg.chat_id
		var bantitle = "/reqban "+msg.chat_id
		var iddfa = null
		for(var i = 0; i < moderkeys.buttons.length; i++){
			if(typeof moderkeys.buttons[i][0] !== "undefined") {
				if(moderkeys.buttons[i][0].action.label == "/accepttitle "+msg.chat_id){
					iddfa = i
				}
			}
		}
		if(iddfa != null) {
			moderkeys.buttons.splice(iddfa, 1)
		}
		moderkeys.buttons.push([{ "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": ccept}, "color": "positive"}, { "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": bantitle}, "color": "primary"}, { "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": dddn}, "color": "negative"}])
		var gg = ("[!] Новое название беседы\nЧтобы одобрить введите /accepttitle "+msg.chat_id+"\nЧтобы отклонить введите /denytitle "+msg.chat_id)
		var osse = JSON.stringify(moderkeys, null, "  ")
		modkeys.api.messages.send({peer_id: 2000000002, message: "😑", keyboard: osse}, function(a) {
			vkadmin.api.messages.send({chat_id: chats.moders, message: gg, forward_messages: msg.id})
		})
	}
}

function moderatephoto(msg) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == msg.chat_id) {
			is = i
		}
	}
	if(is != null) {
		if(database.chats[is].photo_new == false) {
			var ccept = "/acceptphoto "+msg.chat_id
			var dddn = "/denyphoto "+msg.chat_id
			var bantitle = "/reqban "+msg.chat_id
			var iddfa = null
			for(var i = 0; i < moderkeys.buttons.length; i++){
				if(typeof moderkeys.buttons[i][0] !== "undefined") {
					if(moderkeys.buttons[i][0].action.label == "/acceptphoto "+msg.chat_id){
						iddfa = i
					}
				}
			}
			if(iddfa != null) {
				moderkeys.buttons.splice(iddfa, 1)
			}
			database.chats[is].photo_new = true
			var gg = ("[!] Новая фотография беседы\nЧтобы одобрить введите /acceptphoto "+msg.chat_id+"\nЧтобы отклонить введите /denyphoto "+msg.chat_id)
			moderkeys.buttons.push([{ "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": ccept}, "color": "positive"}, { "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": bantitle}, "color": "primary"}, { "action": { "type": "text",  "payload": "{\"button\": \"1\"}", "label": dddn}, "color": "negative"}])
			var osse = JSON.stringify(moderkeys, null, "  ")
			modkeys.api.messages.send({peer_id: 2000000002, message: "😑", keyboard: osse}, function(a) {
				vkadmin.api.messages.send({chat_id: chats.moders, message: gg, forward_messages: msg.id})
			})
			msg.reply("✅ Ваша заявка на установку аватара была отправлена модераторам.\nОни проверят ее в ближайшее время.")
			upd_db()
		}
		else {
			msg.reply("🔄 Вы уже отправляли заявку, ждите ее одобрения, либо отказа.")
		}
	}
}

function msgkickchat(chat, msgcols) {
	var hth = "chat"+chat
	var anykick = []
	vkadmin.api.messages.getChat({chat_id: chat, fields: "counters"}, function(a){
		for(var i = 0; i < a.response.users.length; i++){
			checkwrite(a.response.users[i].id, hth, function(callback) {
				if(callback == null) {
					anykick.push(a.response.users[i].id)
				}
			})
		}
		for(var i = 0; i < database.top.users[hth].length; i++){
			if(database.top.users[hth][i].count < msgcols && database.top.users[hth][i].in_chat == true){
				anykick.push(database.top.users[hth][i].user_id)
			}
		}
		anykick.map(function(users){
			if(users != botid && users != group_ans){
				checkStaff(users, chat, function(callback){
					if(callback.level == 0) {
						rChatUser(users, chat)
						vkadmin.api.messages.removeChatUser({member_id: users, chat_id: chat})
					}
				})
			}
		})
	})
}

function checkwrite(user, hth, callback) {
	var iddf = null
	for(var i = 0; i < database.top.users[hth].length; i++){
		if(database.top.users[hth][i].user_id == user){
			iddf = i
		}
	}
	callback(iddf)
}

function setRole(user, chat, params) {
	var is = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			is = i
		}
	}
	if(params == "moder") {
		if(is != null) {
			database.users[is].moder = true
			database.users[is].admin = false
			database.users[is].spec_admin = false
			database.users[is].creator = false
		}
		else {
			vkadmin.api.messages.getChat({chat_id:chat}, function(a){
				var users = a.response.users
				if(users.indexOf(user) !== -1){
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": false, "spec_admin": false, "admin": false, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
				else {
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
			})
		}
	}
	else if(params == "admin") {
		if(is != null) {
			database.users[is].moder = true
			database.users[is].admin = true
			database.users[is].spec_admin = false
			database.users[is].creator = false
		}
		else {
			vkadmin.api.messages.getChat({chat_id:chat}, function(a){
				var users = a.response.users
				if(users.indexOf(user) !== -1){
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": false, "spec_admin": false, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
				else {
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
			})
		}
	}
	else if(params == "specadmin") {
		if(is != null) {
			database.users[is].moder = true
			database.users[is].admin = true
			database.users[is].spec_admin = true
			database.users[is].creator = false
		}
		else {
			vkadmin.api.messages.getChat({chat_id:chat}, function(a){
				var users = a.response.users
				if(users.indexOf(user) !== -1){
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": false, "spec_admin": true, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
				else {
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": true, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
			})
		}
	}
	else if(params == "creator") {
		if(is != null) {
			database.users[is].moder = true
			database.users[is].admin = true
			database.users[is].spec_admin = true
			database.users[is].creator = true
		}
		else {
			vkadmin.api.messages.getChat({chat_id:chat}, function(a){
				var users = a.response.users
				if(users.indexOf(user) !== -1){
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": true, "spec_admin": true, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
				else {
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": true, "spec_admin": true, "admin": true, "moder": true, "banned": false, "bot_warns": 0, "warns": [] })
				}
			})
		}
	}
	else if(params == "clear") {
		if(is != null) {
			database.users[is].moder = false
			database.users[is].admin = false
			database.users[is].spec_admin = false
			database.users[is].creator = false
		}
		else {
			vkadmin.api.messages.getChat({chat_id:chat}, function(a){
				var users = a.response.users
				if(users.indexOf(user) !== -1){
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": true, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 0, "warns": [] })
				}
				else {
					database.users.push({ "user_id": user, "chat_id": chat, "in_chat": false, "creator": false, "spec_admin": false, "admin": false, "moder": false, "banned": false, "bot_warns": 0, "warns": [] })
				}
			})
		}
	}
	upd_db()
}

function botBan(user) {
	vkadmin.api.groups.ban({group_id: 171193536, owner_id: user, reason: 0})
	vkadmin.api.account.ban({owner_id: user})
	vkmanager.api.account.ban({owner_id: user})
	database.banned.push( { "user_id": user } )
}

function botUnBan(user) {
	var fsf = null
	for(var i = 0; i < database.banned.length; i++){
		if(database.banned[i].user_id == user){
			fsf = i
		}
	}
	if(fsf != null) {
		vkadmin.api.groups.unban({group_id: 171193536, owner_id: user})
		vkadmin.api.account.unban({owner_id: user})
		vkmanager.api.account.unban({owner_id: user})
		database.banned.splice(fsf, 1)
	}
}

function upd_db() {
	fs.writeFileSync("./bots/adminbot/data/database.json", JSON.stringify(database, null, "\t"))
	return 1
}

function upd_reports() {
	fs.writeFileSync("./bots/adminbot/data/reports.json", JSON.stringify(reports, null, "\t"))
	return 1
}

function getUserID(userl, callback) {
	const regexplink = /^(https:\/\/|)vk\.com\/(.*)/
	const regexpid = /^\[id(\d+)\|(.*)\]/
	const regexpclub = /^\[club(\d+)\|(.*)\]/
	var link = userl.match(regexplink)
	var id = userl.match(regexpid)
	var club = userl.match(regexpclub)
	var cbid = null
	if(link != null) {
		vkadmin.api.utils.resolveScreenName({screen_name: link[2]}, function(a){
			if(a.response.type == "group"){
				a.response.object_id = parseInt("-"+a.response.object_id)
				cbid = a.response.object_id
			}
			else if(a.response.type == "user"){
				cbid = a.response.object_id
			}
			callback(cbid)
		})
	}
	else if(id != null) {
		cbid = parseInt(id[1])
	}
	else if(club != null) {
		cbid = parseInt(parseInt("-"+club[1]))
	}
	if(typeof callback !== "undefined") {
		if(cbid != null) {
			callback(cbid)
		}
	}
}

function resetTitle(chat) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chat) {
			is = i
		}
	}
	vkadmin.api.messages.editChat({title: database.chats[is].title, chat_id: chat})
}

function checkBanBot(user, callback) {
	var is = null
	for(var i = 0; i < database.banned.length; i++) {
		if(database.banned[i].user_id == user) {
			is = i
		}
	}
	var cka = false
	if(is != null) {
		cka = true
	}
	callback(cka)
}

function checkModer(msg, callback) {
	var kak = []
	var is = null
	for(var i = 0; i < database.moderators.length; i++) {
		if(database.moderators[i].user_id == msg.user_id) {
			is = i
		}
	}
	if(is != null) {
		kak.moder = true
		kak.level = database.moderators[is].level
	}
	else if(is == null) {
		kak.moder = false
		kak.level = 0
	}
	callback(kak)
}

function checkSupport(msg, callback) {
	var is = null
	for(var i = 0; i < database.supports.length; i++) {
		if(database.supports[i].user_id == msg.user_id) {
			is = i
		}
	}
	var cka = false
	if(is != null) {
		cka = true
	}
	callback(cka)
}

function checkAdmin(msg, callback) {
	var is = null
	for(var i = 0; i < database.admins.length; i++) {
		if(database.admins[i].user_id == msg.user_id) {
			is = i
		}
	}
	var cka = false
	if(is != null) {
		cka = true
	}
	callback(cka)
}

function resetPhoto(chat) {
	var is = null
	for(var i = 0; i < database.chats.length; i++) {
		if(database.chats[i].chat == chat) {
			is = i
		}
	}
	if(database.chats[is].photo != null) {
		vkadmin.api.messages.setChatPhoto({file: database.chats[is].photo})
	}
	else {
		vkadmin.api.photos.getChatUploadServer({chat_id:chat}, function(r){ 
			vkadmin.sreq.post(r.response.upload_url, {photo: fs.createReadStream("./bots/adminbot/data/photos/no_avatar.jpg")}, function(u){ 
				vkadmin.api.messages.setChatPhoto({file:u.response})
			})
		})
	}
}

function checkStaff(user, chat, callback) {
	var cba = {}
	if(user == 489356469 || user == group_ans) {
		cba.creator = true
		cba.spec_admin = true
		cba.admin = true
		cba.moder = true
		cba.level = 5
	}
	else {
		var is = null
		for(var i = 0; i < database.users.length; i++) {
			if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
				is = i
			}
		}
		if(is != null) {
			cba.creator = database.users[is].creator
			cba.spec_admin = database.users[is].spec_admin
			cba.admin = database.users[is].admin
			cba.moder = database.users[is].moder
		}
		else if(is == null) {
			cba.creator = false
			cba.spec_admin = false
			cba.admin = false
			cba.moder = false
			cba.level = 0
		}
		if(cba.creator == true) {
			cba.level = 4
		}
		else if(cba.spec_admin == true) {
			cba.level = 3
		}
		else if(cba.admin == true) {
			cba.level = 2
		}
		else if(cba.moder == true) {
			cba.level = 1
		}
		else {
			cba.level = 0
		}
	}
	callback(cba)
}

function topchats(msg) {
	var tops = []
	for(var i = 0; i < database.top.chats.length; i++){
		if(database.top.chats[i].banned == false) {
			tops.push({cid: database.top.chats[i].chat_id, count: database.top.chats[i].count, title: database.top.chats[i].title, creator: database.top.chats[i].creator})
		}
	}
	tops.sort(function(a, b){
		if(b.count > a.count) return 1
		if(b.count < a.count) return -1
		return 0
	})
	var yo = []
	var gg = 0
	for(var g = 0; g < 10; g++){
		if(tops.length > g){
			gg++
			yo.push({cid: tops[g].cid, count: tops[g].count, title: tops[g].title, creator: tops[g].creator, num: gg})
		}
	}
	var i = 1 
	var p = 1
	var l = 0
	var lolik = "Список самых активных чатов:\n" + yo.map(a=> i++ +". " + (a.num ==1?" 🥇 ":"") + (a.num ==2?" 🥈 ":"") + (a.num ==3?" 🥉 ":"") + "«" + a.title + "» " + "- vk.com/id" + a.creator).join("\n")
	msg.send(lolik)
}
function topchatusers(msg) {
	var cht = "chat"+msg.chat_id
	var tops = []
	var ids = []
	if(typeof database.top.users[cht] !== "undefined") {
		for(var i = 0; i < database.top.users[cht].length; i++){
			if(database.top.users[cht][i].user_id > 0) {
				tops.push({id: database.top.users[cht][i].user_id, count: database.top.users[cht][i].count})
			}
		}
		for(var i = 0; i < database.top.users[cht].length; i++) {
			if(database.top.users[cht][i].user_id > 0) {
				ids.push(database.top.users[cht][i].user_id)
			}
		}
		tops.sort(function(a, b){
			if(b.count > a.count) return 1
			if(b.count < a.count) return -1
			return 0
		})
		var yo = []
		for(var g = 0; g < 10; g++){
			if(tops.length > g){
				yo.push({id: tops[g].id, count: tops[g].count})
			}
		}
		var i = 1 
		var p = 1
		var l = 0
		var chta = null
		for(var ia = 0; ia < database.top.chats.length; ia++){
			if(database.top.chats[ia].chat_id == msg.chat_id){
				chta = ia
			}
		}
		if(chta != null) {
			var usernames = vkadmin.apiSync.users.get({user_ids:ids.join(","), fields:"first_name"}).response
			var lolik = "\nСамые активные пользователи: \n" + yo.map(a=> i++ +". " + usernames.filter(e=> e.id == a.id)[0].first_name + " " + usernames.filter(e=> e.id == a.id)[0].last_name + " (vk.com/id" + a.id + ") - " + a.count + " сообщений. ").join("\n")
			msg.send("📧 Сообщений: " + database.top.chats[chta].count + "\n🔣 Символов: " + database.top.chats[chta].count_sim + "\n📩 Пересланных: " + database.top.chats[chta].fwd_messages + "\n📷 Фото: " + database.top.chats[chta].photos + "\n❗ Команд: " + database.top.chats[chta].commands + "\n💩 Стикеров: " + database.top.chats[chta].stickers + "\n👺 Сообщений с матом: " + database.top.chats[chta].matsmsg + lolik)
		}
	}
}

function topmoderators(msg) {
	if(msg.chat_id == 109) {
		var tops = []
		for(var i = 0; i < top.moders.length; i++){
		   tops.push({id: top.moders[i].id, count: top.moders[i].count, name: top.moders[i].name})
		}
		tops.sort(function(a, b){
			if(b.count > a.count) return 1
			if(b.count < a.count) return -1
			return 0
		})
		var yo = []
		for(var g = 0; g < 10; g++){
			if(tops.length > g){
				yo.push({id: tops[g].id, count: tops[g].count, name: tops[g].name})
			}
		}
		var i = 1 
		var p = 1
		var l = 0
		var lolik = "Топ 10 модераторов: \n" + yo.map(a=> i++ +")"+ " [id" + a.id +"|"+a.name+ "] - " + a.count + " проверенных заявок. ").join("\n")
		msg.jsend(lolik)
	}
}

function timeStamp() {
	var date = new Date()
	var hours   = date.getHours()
	var minutes = date.getMinutes()
	var seconds = date.getSeconds()
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = hours+':'+minutes+':'+seconds;
	return time;
}

function vk_log(msg){
	console.log('['+timeStamp()+']['+msg.title+']['+msg.user_info.first_name+" "+msg.user_info.last_name+"]: "+msg.text);
}

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
	return String.fromCharCode(dec);
  });
};

function blockurls(str){
	if(typeof(str) == "string"){
		if(decodeHtmlEntity(str).replace(/(\\)?(\_)?(\[)?(\])?(\^)?(`)?/ig, "").match(/[A-z]?[А-я]?/ig).join('').match(/v+k+w+a+y+|м+л+ц+ф+н+|вкв(е|у|а|о|э|я|и|ю)+?й|v+k+w+([A-z]?[А-я]?)+(y|у)+|vkbot|vto|olike|turboliker|social|млцфн|vto\.pe|мещюзу|likes\.fm|rusbux|vklove|ad-social|fastfreelikes|синий\кит|#f57|#морекитов|#хочувигру|#тихийдом|#f58|тихий\дом|явигре|синий\kит|cиний\кит|ciнiй\кiт|кит\синий|синий\кiт|я\в\игре|likenaavu|vkrutilka|bosslike|likest|like-up|olike|vkmix|vktarget|vkstorm|vliker|toplikers|yoolike|gloz|vkduty|like4u|speedliker|online-vkontakte|zismo|relike|alfalaik|smmcraft|addmefast|&#118;&#107;&#119;&#97;&#121;(&#46;&#99;&#111;&#109;)?|%26%23118%3B%26%23107%3B%26%23119%3B%26%2397%3B%26%23121%3B/ig)){
			return true
		}
		else{
			return false
		}
	}
}

vkadmin.api.groups.getMembers({group_id: 171193536, count: 0}, function(a){
	if(a.response.count < 100) {
		vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/100] &#128522;✌", group_id: 171193536})
	}
	else if(a.response.count >= 100) {
		vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/1000] &#128522;✌", group_id: 171193536})
	}
	else if(a.response.count >= 1000) {
		vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/10000] &#128522;✌", group_id: 171193536})
	}
})

setInterval(function () {
	vkadmin.api.groups.getMembers({group_id: 171193536, count: 0}, function(a){
		if(a.response.count < 100) {
			vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/100] &#128522;✌", group_id: 171193536})
		}
		else if(a.response.count >= 100) {
			vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/1000] &#128522;✌", group_id: 171193536})
		}
		else if(a.response.count >= 1000) {
			vkadmin.api.status.set({text: "&#128187; Subscribers: ["+a.response.count+"/10000] &#128522;✌", group_id: 171193536})
		}
	})
}, 120000)


vkadmin.api.groups.getMembers({group_id: 172727871, count: 0}, function(a){
	if(a.response.count < 100) {
		vkadmin.api.status.set({text: "💬 Подписчиков: ["+a.response.count+"/100] 😃🤘", group_id: 172727871})
	}
	else if(a.response.count >= 100) {
		vkadmin.api.status.set({text: "💬 Подписчиков: ["+a.response.count+"/1000] 😃🤘", group_id: 172727871})
	}
})

setInterval(function () {
	vkadmin.api.groups.getMembers({group_id: 172727871, count: 0}, function(a){
		if(a.response.count < 100) {
			vkadmin.api.status.set({text: "💬 Подписчиков: ["+a.response.count+"/100] 😃🤘", group_id: 172727871})
		}
		else if(a.response.count >= 100) {
			vkadmin.api.status.set({text: "💬 Подписчиков: ["+a.response.count+"/1000] 😃🤘", group_id: 172727871})
		}
	})
}, 200000)

setInterval(function () {
	for(var i = 0; i < database.tempbans.length; i++){
		checkTempban(database.tempbans[i].user_id, database.tempbans[i].chat_id, database.tempbans[i].unbandate)
	}
}, 30000)

function checkTempban(user, chat, unbandate) {
	timediff(new Date(), unbandate, function(result) {
		if(result.milliseconds < 1) {
			tempUnban(user, chat)
			var is = null
			for(var i = 0; i < database.tempbans.length; i++){
				if(database.tempbans[i].user_id == user && database.tempbans[i].chat_id == chat) {
					is = i
				}
			}
			if(is != null) {
				database.tempbans.splice(is, 1)
			}
			upd_db()
		}
	})
}

function tempUnban(user, chat) {
	var isa = null
	for(var i = 0; i < database.users.length; i++) {
		if(database.users[i].user_id == user && database.users[i].chat_id == chat) {
			isa = i
		}
	}
	if(isa != null) {
		database.users[isa].banned = false
	}
	vkadmin.api.friends.areFriends({user_ids: user}, function(a){
		if(a.response[0].friend_status == 3){
			vkadmin.api.messages.addChatUser({chat_id: chat, user_id: user})
		}
	})
	upd_db()
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

String.prototype.toStatus = function () {
	var sec_num = parseInt(this, 10);
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);
	var days = Math.floor(hours / 24, -1)
	
	if (hours   < 10) {hours   = "0"+hours;}
	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) {seconds = "0"+seconds;}
	var time = (days < 10?"0":"")+days+":"+(hours < 10?"0":"")+(hours-(24*days))+':'+minutes+':'+seconds;
	return time;
}

var time = process.uptime()
var uptime = (time + "").toStatus()
var ping = getRandomInt(5,15)
vkadmin.api.status.set({text:"@SocialKot | ("+uptime+") | 🅿 Ping: "+ping+" ms"})

setInterval(function () {
	var time = process.uptime()
	var uptime = (time + "").toStatus()
	var ping = getRandomInt(5,15)
	vkadmin.api.status.set({text:"@SocialKot | ("+uptime+") | 🅿 Ping: "+ping+" ms"})
}, 120000)

setTimeout(function () {
	vkadmin.api.messages.send({chat_id: chats.admins, message: "[!] Автосохранение базы данных через 1 минуту"})
}, 3540000)

setInterval(function () {
	fs.writeFileSync("./bots/adminbot/backup/auto_database.json", JSON.stringify(database, null, "\t"))
	fs.writeFileSync("./bots/gamebot_1/backup/auto_database.json", JSON.stringify(database, null, "\t"))
	functions.logTxt("[Backup] Auto backup created")
	vkadmin.api.messages.send({chat_id: chats.admins, message: "[!] Автосохранение базы данных [!]"})
	setTimeout(function () {
		vkadmin.api.messages.send({chat_id: chats.admins, message: "[!] Автосохранение базы данных через 1 минуту"})
	}, 3540000)
}, 3600000)

vkadmin.api.account.setOnline({})
vkmanager.api.account.setOnline({})

setInterval(function(){
	vkadmin.api.account.setOnline({})
	vkmanager.api.account.setOnline({})
}, 240000)

setInterval(function () {
	vkadmin.api.friends.getRequests({}, function (a) {if (a.response.items.length > 0) {vkadmin.api.friends.add({user_id:a.response.items[0]})}})
	vkadmin.api.friends.getRequests({out:1}, function (a) {if (a.response.items.length > 0) {vkadmin.api.friends.delete({user_id:a.response.items[0]})}})
		
	vkmanager.api.friends.getRequests({}, function (a) {if (a.response.items.length > 0) {vkmanager.api.friends.add({user_id:a.response.items[0]})}})
	vkmanager.api.friends.getRequests({out:1}, function (a) {if (a.response.items.length > 0) {vkmanager.api.friends.delete({user_id:a.response.items[0]})}})
}, 5000)

if(database.cancreatechat == 1) {
	vkmanager.api.status.set({text:"@SocialKot | &#128276; Создание бесед доступно!"})
}
else {
	vkmanager.api.status.set({text:"@SocialKot | &#128277; В данный момент нельзя создать беседу!"})
}



//var dcomment = playa_module("2e11eb145f1a6487e1fe39c59bb8b818a42497871bd2f306ca0c9818c61d7c94bd736b54ebaf2e5c40d4d")
var checkcomment = playa_module("eda7488c093afc9e070038cb9bad521a6bc1d7a55c9563ec1211d518a28cea88c2a6807d490735396b42d")
/*if(!database.deletedcomments) {
	database.deletedcomments = 0
	upd_db()
}
setInterval(function() {
	checkcomment.api.wall.getComments({owner_id: 489356469, post_id: 146, count: 100, extended: 1, fields: "members_count"}, function(a) {
		var groups_info = []
		delete a.response.groups.map(function(group){groups_info[group.id] = group;});
		a.response.items.map(function(comm){
			if(comm.from_id > 0) {
				if(comm.from_id != 489356469) {
					dcomment.api.wall.deleteComment({owner_id: 489356469, comment_id: comm.id})
					database.deletedcomments += 1
					upd_db()
				}
			}
			else if(comm.from_id < 0) {
				comm.from_id = -comm.from_id
				if(groups_info[comm.from_id].members_count < 1000) {
					dcomment.api.wall.deleteComment({owner_id: 489356469, comment_id: comm.id})
					database.deletedcomments += 1
					upd_db()
				}
			}
		})
	})
}, 5000)*/





var otziv1 = playa_module("fcc0ec71dc747b7db3989242a5278482449be631c5d6ca2dac78c73c53a27eb1816f4a84d97ae75777074")
var otziv2 = playa_module("bd6c0d8b0ee097157487a53c06d24b210b7b5f90f46319779ec1b70c0233f5c8a06485a34a53bfbb7fbf0")
var otziv3 = playa_module("e668a4af37de2f1e7c8d07535b7469196db2a530fb45bd06f2562e0a4ba03433bb3edc618d54164010bc9")

otziv1.addListener.messages(function (msg) {
	if(!msg.chat_id) {
		if(msg.text) {
			modkeys.api.messages.send({peer_id: 2000000006, message: "Сообщение Андрею Долматову (796*****691): "+msg.text})
		}
	}
}, {interval:1000})

otziv3.addListener.messages(function (msg) {
	if(!msg.chat_id) {
		if(msg.text) {
			modkeys.api.messages.send({peer_id: 2000000006, message: "Сообщение Вадиму Соколову (798*****027): "+msg.text})
		}
	}
}, {interval:1000})

setInterval(function () {
	var date = new Date()
	if((date.getHours() == 13 || date.getHours() == 14 || date.getHours() == 19 || date.getHours() == 20 || date.getHours() == 21 || date.getHours() == 22 || date.getHours() == 9 || date.getHours() == 10)) {
		otziv1.api.account.setOnline({})
	}
}, 240000)

setInterval(function () {
	var date = new Date()
	if((date.getHours() == 10 || date.getHours() == 11 || date.getHours() == 15 || date.getHours() == 16 || date.getHours() == 21 || date.getHours() == 22 || date.getHours() == 23 || date.getHours() == 0)) {
		otziv2.api.account.setOnline({})
	}
}, 240000)

setInterval(function () {
	var date = new Date()
	if((date.getHours() == 8 || date.getHours() == 9 || date.getHours() == 10 || date.getHours() == 11 || date.getHours() == 12 || date.getHours() == 20 || date.getHours() == 21 || date.getHours() == 22 || date.getHours() == 23)) {
		otziv3.api.account.setOnline({})
	}
}, 240000)





var gamebot_1 = playa_module("68ff37c011ef88f15d68791364703cd2b0b26003891259f8679960688245d79724d357a958e0de55ca916");
var dbgames = require("./bots/gamebot_1/data/database.json")
var help = require("./bots/gamebot_1/data/help.json")

var keys = {
	"one_time": false,
	"buttons": [
		[{ "action": { 
		"type": "text",  
		"payload": "{\"button\": \"1\"}", 
		"label": "Профиль"}, 
		"color": "primary"}],
		[{ "action": { 
		"type": "text",  
		"payload": "{\"button\": \"1\"}", 
		"label": "Помощь"}, 
		"color": "negative"}]
	]
}

gamebot_1.addGroup.LongPoll(function (msg) {
	msg.fsend = function(text) {
		var osse = JSON.stringify(keys, null, "  ")
		gamebot_1.api.messages.send({peer_id: msg.peer_id, message: text, keyboard: osse})
	}
	msg.text = msg.text.replace(/\[club171193536\|.*] /, "")
	var nick = ""
	var fff = dbgames.accs.filter(a=> a.user_id == msg.from_id).map(a=> a.id)
	if(typeof fff[0] !== "undefined") {
		if(dbgames.accs[fff].giper == 1) {
			nick = "[id"+msg.from_id+"|"+dbgames.accs[fff].name+"]"
		}
		else {
			nick = dbgames.accs[fff].name
		}
		var s = null
		var matched = null
		for(var i = 0; i < cmdsgrp.length; i++) {
			if(msg.text.match(cmdsgrp[i].regexp)) {
				matched = msg.text.match(cmdsgrp[i].regexp)
				s = i
			}
		}
		if(s != null) {
			cmdsgrp[s].f(matched,msg,nick,fff)
		}
	}
	else {
		createAcc(msg.from_id, function(cb) {
			if(cb == "OK") {
				var fff = dbgames.accs.filter(a=> a.user_id == msg.from_id).map(a=> a.id)
				if(dbgames.accs[fff].giper == 1) {
					nick = "[id"+msg.from_id+"|"+dbgames.accs[fff].name+"]"
				}
				else {
					nick = dbgames.accs[fff].name
				}
				var s = null
				var matched = null
				for(var i = 0; i < cmdsgrp.length; i++) {
					if(msg.text.match(cmdsgrp[i].regexp)) {
						matched = msg.text.match(cmdsgrp[i].regexp)
						s = i
					}
				}
				if(s != null) {
					cmdsgrp[s].f(matched,msg[0],nick,fff)
				}
			}
		})
	}
}, {interval:500,group_id:171193536})

cmdsgrp = [
	{
		regexp:/^профиль$/i,
		f:function(params,msg,name,dbid) {
			var i = dbgames.accs.filter(a=> a.user_id == msg.from_id).map(a=> a.id)
			msg.fsend(name+", твой профиль:\n♻ Твой игровой ID: "+dbgames.accs[i].id+"\n💵 Твой баланс наличными: "+dbgames.accs[i].money+"$\n💳 Твой баланс в банке: "+dbgames.accs[i].bank+"$\n🛠 Работа: "+gamenames.jobs[dbgames.accs[i].job].name+"\n\n🔑 Имущество:\n⠀🚗 Машина: "+gamenames.cars[dbgames.accs[i].other.car].name+"\n⠀🏠 Дом: "+gamenames.house[dbgames.accs[i].other.house].name+"\n⠀🌇 Квартира: "+gamenames.kvart[dbgames.accs[i].other.kvart].name+"\n⠀🔋 Ферма: "+gamenames.farms[dbgames.accs[i].farm].name+"\n⠀📱 Телефон: "+gamenames.phones[dbgames.accs[i].other.phone].name+"\n⠀🏢 Бизнес: "+gamenames.cars[dbgames.accs[i].other.biz].name+"\n\n👑Личные данные:\n⠀⚡Твоя должность: "+dbgames.accs[i].staff+"\n⠀⏳Дата регистрации "+dbgames.accs[i].regdate)
		},
	},
	{
		regexp:/^казино (.*)$/i,
		f:function(params,msg,name,dbid) {
			getMoney(params[1], function(cb) {
				if(cb < 1) {
					msg.fsend(name+", минимальная ставка 1$")
				}
				else {
					if(dbgames.accs[dbid].money >= cb) {
						var random1 = getRandomInt(1,4)
						if(random1 == 1) {
							var random2 = getRandomInt(1, 60)
							if(random2 == 33) {
								var bablo = cb * 50
								dbgames.accs[dbid].money += bablo
								msg.fsend(name+", Удача!\n 🎲 Вам выпало: х50.\n💳 Вы выиграли: "+bablo+"$\n💰 Ваш баланс: "+dbgames.accs[dbid].money+"$")
							}
							else if(random2 == 14 || random2 == 4 || random2 == 56 || random2 == 8) {
								var bablo = cb * 5
								dbgames.accs[dbid].money += bablo
								msg.fsend(name+", Удача!\n 🎲 Вам выпало: х5.\n💳 Вы выиграли: "+bablo+"$\n💰 Ваш баланс: "+dbgames.accs[dbid].money+"$")
							}
							else {
								var bablo = cb * 2
								dbgames.accs[dbid].money += bablo
								msg.fsend(name+", Удача!\n 🎲 Вам выпало: x2.\n💳 Вы выиграли: "+bablo+"$\n💰 Ваш баланс: "+dbgames.accs[dbid].money+"$")
							}
						}
						else if(random1 == 3) {
							msg.fsend(name+", Ваши деньги остаются при вас!\n 🎲 Вам выпало: x1.\n💰 Ваш баланс: "+dbgames.accs[dbid].money+"$")
						}
						else {
							dbgames.accs[dbid].money -= cb
							msg.fsend(name+", Провал!\n 🎲 Вам выпало: х0.\n💳 Вы проиграли: "+cb+"$\n💰 Ваш баланс: "+dbgames.accs[dbid].money+"$")
						}
						upd_dbgames()
					}
					else if(dbgames.accs[dbid].money < cb) {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
			})
		},
	},
	{
		regexp:/^передать ([0-9]+) (.*)$/i,
		f:function(params,msg,name,dbid) {
			getMoney(params[2], function(cb) {
				if(cb < 100) {
					msg.fsend(name+", переводить можно от 100$")
				}
				else {
					if(dbgames.accs[dbid].money >= cb) {
						if(dbid != params[1]) {
							if(dbgames.accs[params[1]]) {
								dbgames.accs[dbid].money -= cb
								dbgames.accs[parseInt(params[1])].money += cb
								msg.fsend(name+", вы передали игроку " + dbgames.accs[parseInt(params[1])].name + " " + cb + "$")
								upd_dbgames()
							}
						}
					}
					else if(dbgames.accs[dbid].money < cb) {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
			})
		},
	},
	{
		regexp:/^банк$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", 💳 Твой баланс в банке: "+dbgames.accs[dbid].bank+"$")
		},
	},
	{
		regexp:/^банк (снять|положить) (.*)$/i,
		f:function(params,msg,name,dbid) {
			getMoney(params[2], function(cb) {
				if(params[1] == "снять") {
					if(cb > 0) {
						if(dbgames.accs[dbid].bank >= cb) {
							dbgames.accs[dbid].bank -= cb
							dbgames.accs[dbid].money += cb
							msg.fsend(name+", вы сняли " + cb + "$\n💳 Остаток на счёте: "+ dbgames.accs[dbid].bank + "$")
							upd_dbgames()
						}
						else if(dbgames.accs[dbid].bank < cb) {
							msg.fsend(name+", у вас недостатачно денег на банковском счету")
						}
					}
				}
				else if(params[1] == "положить") {
					if(cb > 0) {
						if(dbgames.accs[dbid].money >= cb) {
							dbgames.accs[dbid].money -= cb
							dbgames.accs[dbid].bank += cb
							msg.fsend(name+", вы положили " + cb + "$ на банковский счет")
							upd_dbgames()
						}
						else if(dbgames.accs[dbid].money < cb) {
							msg.fsend(name+", у вас недостатачно денег")
						}
					}
				}
			})
		},
	},
	{
		regexp:/^магазин$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", разделы магазина:\n🚗 Машины\n🏠 Дома\n🌇 Квартиры\n🔋 Фермы\n📱 Телефоны\n🏢 Бизнесы\n\n🔎 Для покупки используйте &#34;[категория] [номер]&#34;.\n⠀ ⠀ Например: &#34;Машины 5&#34;")
		},
	},
	{
		regexp:/^машины$/i,
		f:function(params,msg,name,dbid) {
			var i = 1
			msg.fsend(name+", машины: "+gamenames.cars.map(a=> (a.price > 0?"\n"+(dbgames.accs[dbid].other.car == i?"🔹 ":"🔸 ") + i++ + ". " + a.name + " - Цена: "+ a.price +"$":"")).join(""))
		},
	},
	{
		regexp:/^машины ([0-9]+)$/i,
		f:function(params,msg,name,dbid) {
			if(gamenames.cars[params[1]]) {
				if(dbgames.accs[dbid].other.car == 0) {
					if(dbgames.accs[dbid].money >= gamenames.cars[params[1]].price) {
						dbgames.accs[dbid].money -= gamenames.cars[params[1]].price
						dbgames.accs[dbid].other.car = parseInt(params[1])
						msg.fsend(name+", вы купили &#34;"+gamenames.cars[params[1]].name+"&#34; за "+gamenames.cars[params[1]].price+"$")
						upd_dbgames()
					}
					else {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
				else {
					msg.fsend(name+", у вас уже есть машина")
				}
			}
		},
	},
	{
		regexp:/^дома$/i,
		f:function(params,msg,name,dbid) {
			var i = 1
			msg.fsend(name+", дома: "+gamenames.house.map(a=> (a.price > 0?"\n"+(dbgames.accs[dbid].other.house == i?"🔹 ":"🔸 ") + i++ + ". " + a.name + " - Цена: "+ a.price +"$":"")).join(""))
		},
	},
	{
		regexp:/^дома ([0-9]+)$/i,
		f:function(params,msg,name,dbid) {
			if(gamenames.house[params[1]]) {
				if(dbgames.accs[dbid].other.house == 0) {
					if(dbgames.accs[dbid].money >= gamenames.house[params[1]].price) {
						dbgames.accs[dbid].money -= gamenames.house[params[1]].price
						dbgames.accs[dbid].other.house = parseInt(params[1])
						msg.fsend(name+", вы купили &#34;"+gamenames.house[params[1]].name+"&#34; за "+gamenames.house[params[1]].price+"$")
						upd_dbgames()
					}
					else {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
				else {
					msg.fsend(name+", у вас уже есть дом")
				}
			}
		},
	},
	{
		regexp:/^квартиры$/i,
		f:function(params,msg,name,dbid) {
			var i = 1
			msg.fsend(name+", квартиры: "+gamenames.kvart.map(a=> (a.price > 0?"\n"+(dbgames.accs[dbid].other.kvart == i?"🔹 ":"🔸 ") + i++ + ". " + a.name + " - Цена: "+ a.price +"$":"")).join(""))
		},
	},
	{
		regexp:/^квартиры ([0-9]+)$/i,
		f:function(params,msg,name,dbid) {
			if(gamenames.kvart[params[1]]) {
				if(dbgames.accs[dbid].other.kvart == 0) {
					if(dbgames.accs[dbid].money >= gamenames.kvart[params[1]].price) {
						dbgames.accs[dbid].money -= gamenames.kvart[params[1]].price
						dbgames.accs[dbid].other.kvart = parseInt(params[1])
						msg.fsend(name+", вы купили &#34;"+gamenames.kvart[params[1]].name+"&#34; за "+gamenames.kvart[params[1]].price+"$")
						upd_dbgames()
					}
					else {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
				else {
					msg.fsend(name+", у вас уже есть квартира")
				}
			}
		},
	},
	{
		regexp:/^фермы$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", пока недоступно")
		//	var i = 1
		//	msg.fsend(name+", фермы: "+gamenames.farms.map(a=> (a.price > 0?"\n"+(dbgames.accs[dbid].farm == i?"🔹 ":"🔸 ") + i++ + ". " + a.name + " - Цена: "+ a.price +"$":"")).join(""))
		},
	},
	{
		regexp:/^телефоны$/i,
		f:function(params,msg,name,dbid) {
			var i = 1
			msg.fsend(name+", телефоны: "+gamenames.phones.map(a=> (a.price > 0?"\n"+(dbgames.accs[dbid].other.phone == i?"🔹 ":"🔸 ") + i++ + ". " + a.name + " - Цена: "+ a.price +"$":"")).join(""))
		},
	},
	{
		regexp:/^телефоны ([0-9]+)$/i,
		f:function(params,msg,name,dbid) {
			if(gamenames.phones[params[1]]) {
				if(dbgames.accs[dbid].other.phone == 0) {
					if(dbgames.accs[dbid].money >= gamenames.phones[params[1]].price) {
						dbgames.accs[dbid].money -= gamenames.phones[params[1]].price
						dbgames.accs[dbid].other.phone = parseInt(params[1])
						msg.fsend(name+", вы купили &#34;"+gamenames.phones[params[1]].name+"&#34; за "+gamenames.phones[params[1]].price+"$")
						upd_dbgames()
					}
					else {
						msg.fsend(name+", у вас недостатачно денег")
					}
				}
				else {
					msg.fsend(name+", у вас уже есть телефон")
				}
			}
		},
	},
	{
		regexp:/^бизнесы$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", пока недоступно")
		},
	},
	{
		regexp:/^баланс$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", баланс:\n💵 Твой баланс наличными: "+dbgames.accs[dbid].money+"$\n💳 Твой баланс в банке: "+dbgames.accs[dbid].bank+"$")
		},
	},
	{
		regexp:/^помощь$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(name+", команды: \n❓ Помощь [команда] - описание команды\n\n📒 Профиль\n💲 Баланс\n💰 Банк [положить сумма/снять сумма]\n🤝 Передать [id] [сумма]\n🛍 Магазин\n💸 Продать [предмет]")
		},
	},
	{
		regexp:/^помощь (.*)$/i,
		f:function(params,msg,name,dbid) {
			msg.fsend(help[params[1].toLowerCase()])
		},
	},
	{
		regexp:/^продать (.*)$/i,
		f:function(params,msg,name,dbid) {
			if(params[1] == "машину") {
				if(dbgames.accs[dbid].other.car > 0) {
					dbgames.accs[dbid].money += gamenames.cars[dbgames.accs[dbid].other.car].price * 0.85
					msg.fsend(name+", вы продали машину за "+gamenames.cars[dbgames.accs[dbid].other.car].price * 0.85+"$")
					dbgames.accs[dbid].other.car = 0
					upd_dbgames()
				}
				else {
					msg.fsend(name+", у вас нету машины")
				}
			}
			else if(params[1] == "дом") {
				if(dbgames.accs[dbid].other.house > 0) {
					dbgames.accs[dbid].money += gamenames.house[dbgames.accs[dbid].other.house].price * 0.85
					msg.fsend(name+", вы продали дом за "+gamenames.house[dbgames.accs[dbid].other.house].price * 0.85+"$")
					dbgames.accs[dbid].other.house = 0
					upd_dbgames()
				}
				else {
					msg.fsend(name+", у вас нету дома")
				}
			}
			else if(params[1] == "квартиру") {
				if(dbgames.accs[dbid].other.kvart > 0) {
					dbgames.accs[dbid].money += gamenames.kvart[dbgames.accs[dbid].other.kvart].price * 0.85
					msg.fsend(name+", вы продали квартиру за "+gamenames.kvart[dbgames.accs[dbid].other.kvart].price * 0.85+"$")
					dbgames.accs[dbid].other.kvart = 0
					upd_dbgames()
				}
				else {
					msg.fsend(name+", у вас нету квартиры")
				}
			}
			else if(params[1] == "телефон") {
				if(dbgames.accs[dbid].other.phone > 0) {
					dbgames.accs[dbid].money += gamenames.phones[dbgames.accs[dbid].other.phone].price * 0.85
					msg.fsend(name+", вы продали телефон за "+gamenames.phones[dbgames.accs[dbid].other.phone].price * 0.85+"$")
					dbgames.accs[dbid].other.phone = 0
					upd_dbgames()
				}
				else {
					msg.fsend(name+", у вас нету телефона")
				}
			}
		},
	},
/*	{
		regexp:/^test$/i,
		f:function(params,msg,name,dbid) {
			timediff(dbgames.accs[dbid].timers.bonus, new Date(), function(time) {
				if(time.milliseconds >= 86400000) {
					console.log(time.milliseconds)
					var kek = new Date()
					console.log(kek.customFormat( "#DD#.#MM#.#YYYY#, #hh#:#mm#:#ss#" ))
				}
				else {
					console.log("NO")
				}
			})
		},
	},
	{
		regexp:/^nametest/i,
		f:function(params,msg,name,dbid) {
			checkcomment.api.users.get({user_id: msg.from_id}, function(a) {
				msg.fsend(a.response[0].first_name)
			})
		},
	},*/
]

function createAcc(user, callback) {
	checkcomment.api.users.get({user_id: user}, function(a) {
		var kek = new Date()
		dbgames.accs.push({ "id": dbgames.accs.length, "user_id": user, "name": a.response[0].first_name, "money": 5000, "bank": 0, "bitcoins": 0, "job": 0, "giper": 0, "biz": 0, "farm": 0, "farm_count": 0, "staff": "Пользователь", "marry": "none", "other": { "car": 0, "yaxt": 0, "plane": 0, "helicopter": 0, "house": 0, "kvart": 0, "phone": 0, "biz": 0 }, "timers": { "bonus": "2017-10-28T18:30:56.973Z" }, "regdate": kek.customFormat( "#DD#.#MM#.#YYYY#, #hhhh#:#mm#:#ss#" ) })
		upd_dbgames()
		callback("OK")
	})
}

Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}

function upd_dbgames() {
	fs.writeFileSync("./bots/gamebot_1/data/database.json", JSON.stringify(dbgames, null, "\t"))
	return 1
}

function getMoney(param, callback) {
	var money = parseInt(param.replace(/к/gi, "000"))
	callback(money)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var gamenames = { 
	"jobs": [
		{
			"name": "Нету (Ты нигде не работаешь)"
		},
		{
			"name": "Ты бог и тебе работать не нужно"
		}
	],
	"cars": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Самокат",
			"price": 500
		},
		{
			"name": "Велосипед",
			"price": 2500
		},
		{
			"name": "Гироскутер",
			"price": 5000
		},
		{
			"name": "Сегвей",
			"price": 7500
		},
		{
			"name": "Мопед",
			"price": 25000
		},
		{
			"name": "Мотоцикл",
			"price": 50000
		},
		{
			"name": "ВАЗ 2109",
			"price": 75000
		},
		{
			"name": "Квадроцикл",
			"price": 80000
		},
		{
			"name": "Багги",
			"price": 135000
		},
		{
			"name": "Вездеход",
			"price": 200000
		},
		{
			"name": "Лада Xray",
			"price": 350000
		},
		{
			"name": "Audi Q7",
			"price": 750000
		},
		{
			"name": "BMW X6",
			"price": 1000000
		},
		{
			"name": "Toyota FT-HS",
			"price": 1750000
		},
		{
			"name": "BMW Z4 M",
			"price": 2500000
		},
		{
			"name": "Subaru WRX STI",
			"price": 2750000
		},
		{
			"name": "Lamborghini Veneno",
			"price": 3000000
		},
		{
			"name": "Tesla Roadster",
			"price": 4500000
		},
		{
			"name": "Yamaha YZF R6",
			"price": 5000000
		},
		{
			"name": "Bugatti Chiron",
			"price": 6500000
		},
		{
			"name": "Thrust SSC",
			"price": 35000000
		},
		{
			"name": "Ferrari LaFerrari",
			"price": 39000000
		},
		{
			"name": "Koenigsegg Regera",
			"price": 50000000
		},
		{
			"name": "Tesla Semi",
			"price": 75000000
		},
		{
			"name": "Venom GT",
			"price": 125000000
		},
		{
			"name": "Rolls-Royce",
			"price": 200000000
		},
		{
			"name": "Tesla Model S",
			"price": 800000000
		}
	],
	"yaxts": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Ванна",
			"price": 10000
		},
		{
			"name": "Nauticat 331",
			"price": 10000000
		},
		{
			"name": "Nordhavn 56 MS",
			"price": 15000000
		},
		{
			"name": "Princess 60",
			"price": 25000000
		},
		{
			"name": "Azimut 70",
			"price": 35000000
		},
		{
			"name": "Dominator 40M",
			"price": 50000000
		},
		{
			"name": "Moonen 124",
			"price": 60000000
		},
		{
			"name": "Wider 150",
			"price": 65000000
		},
		{
			"name": "Palmer Johnson 42M SuperSport",
			"price": 80000000
		},
		{
			"name": "Wider 165",
			"price": 85000000
		},
		{
			"name": "Eclipse",
			"price": 150000000
		},
		{
			"name": "Dubai",
			"price": 300000000
		},
		{
			"name": "Streets of Monaco",
			"price": 750000000
		}
	],
	"planes": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Параплан",
			"price": 100000
		},
		{
			"name": "АН-2",
			"price": 350000
		},
		{
			"name": "Cessna-172E",
			"price": 700000
		},
		{
			"name": "Supermarine Spitfire",
			"price": 1000000
		},
		{
			"name": "BRM NG-5",
			"price": 1400000
		},
		{
			"name": "Cessna T210",
			"price": 2600000
		},
		{
			"name": "Beechcraft 1900D",
			"price": 5500000
		},
		{
			"name": "Cessna 550",
			"price": 8000000
		},
		{
			"name": "Hawker 4000",
			"price": 22400000
		},
		{
			"name": "Learjet 31",
			"price": 45000000
		},
		{
			"name": "Airbus A318",
			"price": 85000000
		},
		{
			"name": "F-35A",
			"price": 160000000
		},
		{
			"name": "Boeing 747-430 Custom",
			"price": 225000000
		},
		{
			"name": "C-17A Globemaster III",
			"price": 350000000
		},
		{
			"name": "F-22 Raptor",
			"price": 400000000
		},
		{
			"name": "Airbus 380 Custom",
			"price": 600000000
		},
		{
			"name": "B-2 Spirit Stealth Bomber",
			"price": 1359000000
		}
	],
	"helics": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Шарик с пропеллером",
			"price": 2
		},
		{
			"name": "RotorWay Exec 162F",
			"price": 300000
		},
		{
			"name": "Robinson R44",
			"price": 450000
		},
		{
			"name": "Hiller UH-12C",
			"price": 1300000
		},
		{
			"name": "AW119 Koala",
			"price": 2500000
		},
		{
			"name": "MBB BK 117",
			"price": 4000000
		},
		{
			"name": "Eurocopter EC130",
			"price": 7500000
		},
		{
			"name": "Leonardo AW109 Power",
			"price": 10000000
		},
		{
			"name": "Sikorsky S-76",
			"price": 15000000
		},
		{
			"name": "Bell 429WLG",
			"price": 19000000
		},
		{
			"name": "NHI NH90",
			"price": 35000000
		},
		{
			"name": "Kazan Mi-35M",
			"price": 60000000
		},
		{
			"name": "Bell V-22 Osprey",
			"price": 135000000
		}
	],
	"house": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Коробка из-под холодильника",
			"price": 250
		},
		{
			"name": "Подвал",
			"price": 3000
		},
		{
			"name": "Палатка",
			"price": 3500
		},
		{
			"name": "Домик на дереве",
			"price": 5000
		},
		{
			"name": "Полуразрушенный дом",
			"price": 10000
		},
		{
			"name": "Дом в лесу",
			"price": 25000
		},
		{
			"name": "Деревянный дом",
			"price": 37500
		},
		{
			"name": "Кирпичный дом",
			"price": 80000
		},
		{
			"name": "Дача",
			"price": 125000
		},
		{
			"name": "Коттедж",
			"price": 450000
		},
		{
			"name": "Особняк",
			"price": 1250000
		},
		{
			"name": "Дом на Рублёвке",
			"price": 5000000
		},
		{
			"name": "Личный небоскрёб",
			"price": 7000000
		},
		{
			"name": "Остров с особняком",
			"price": 12500000
		},
		{
			"name": "Белый дом",
			"price": 20000000
		}
	],
	"kvart": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Чердак",
			"price": 15000
		},
		{
			"name": "Квартира в общежитии",
			"price": 55000
		},
		{
			"name": "Однокомнатная квартира",
			"price": 175000
		},
		{
			"name": "Двухкомнатная квартира",
			"price": 260000
		},
		{
			"name": "Четырехкомнатная квартира",
			"price": 500000
		},
		{
			"name": "Квартира в центре Москвы",
			"price": 1600000
		},
		{
			"name": "Двухуровневая квартира",
			"price": 4000000
		},
		{
			"name": "Квартира с Евроремонтом",
			"price": 6000000
		}
	],
	"farms": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "6U Nvidia",
			"price": 20500000
		},
		{
			"name": "AntminerS9",
			"price": 100000000
		},
		{
			"name": "FM2018-BT200",
			"price": 900000000
		}
	],
	"phones": [
		{
			"name": "Нету",
			"price": 0
		},
		{
			"name": "Nokia 108",
			"price": 250
		},
		{
			"name": "Nokia 3310 (2017)",
			"price": 500
		},
		{
			"name": "ASUS ZenFone 4",
			"price": 2000
		},
		{
			"name": "BQ Aquaris X",
			"price": 10000
		},
		{
			"name": "Sony Xperia XA",
			"price": 15000
		},
		{
			"name": "Samsung Galaxy S8",
			"price": 30000
		},
		{
			"name": "Xiaomi Mi Mix",
			"price": 50000
		},
		{
			"name": "Torex FS1",
			"price": 75000
		},
		{
			"name": "iPhone X",
			"price": 100000
		},
		{
			"name": "Мегафон С1",
			"price": 250000
		},
		{
			"name": "iPhone XS Max",
			"price": 300000
		}
	]
}