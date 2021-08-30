var playa_module = require("playadope.js")
	fs = require("fs")
var	chatmanager = playa_module("6c440e7ebf664bcaddf76cb3e6a7912947af54882e27d1e1eca84ed47591a4391ecc5d63ecca00d61af84")
	chatmgrbase = require("./bots/chatmgr/data/database.json")
	lang = require("./bots/chatmgr/data/lang.json")

var stopbots = 0
chatmanager.addGroup.LongPoll(function (msg) {
	if(stopbots == 1) return
	msg.send = function(text,other){
		if(typeof other !== "object") other = {}
		if(other.user_id) other.peer_id = other.user_id
		if(other.chat_id) other.peer_id = 2000000000 + other.chat_id
		if(!other.user_id && !other.chat_id) other.peer_id = msg.peer_id
		other.message = ((typeof text == "string")?text:JSON.stringify(text))
		chatmanager.api.messages.send(other)
	}
	allmessages = 0
	allmessages += 1
	if(msg.peer_id > 2000000000) {
		msg.chat_id = msg.peer_id - 2000000000
		var is = null
		for(var i = 0; i < chatmgrbase.chats.length; i++) {
			if(chatmgrbase.chats[i].chat_id == msg.chat_id) {
				is = i
			}
		}
		if(is == null) {
			chatmgrbase.chats.push( { "chat_id": msg.chat_id, "vip_status": "none", "info": { "creator": 0, "title": "none", "pin_msg": 0, "rules_msg": 0, "welcome_msg": 0, "bannedtop": false }, "stats": { "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 }, "settings": { "antileak": false, "kick_leave": false, "can_invite": false, "link_ban": false, "offchat": false, "lang": "ru" }, "events": [], "new_users": [] } )
			mgrupd_db()
			checkChat(msg)
		}
		else if(chatmgrbase.chats[is].info.creator == 0) {
			checkChat(msg)
		}
		else {
			var fa = null
			for(var i = 0; i < chatmgrbase.users.length; i++) {
				if(chatmgrbase.users[i].user_id == msg.from_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
					fa = i
				}
			}
			if(msg.action) {
				if(msg.action.type == "chat_title_update" && !msg.out) {
					chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
						if(myrole.level == 0) {
							if(chatmgrbase.chats[is].settings.doingkick == "kick") {
								var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
								chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: msg.from_id, cberr: 1}, function(gg) {
									if(fa != null) {
										chatmgrbase.users[fa].info.in_chat = false
									}
								})
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участник был кикнут"})
								})
							}
							else if(chatmgrbase.chats[is].settings.doingkick == "warn") {
								var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
								mgrwarnChatUser(msg.from_id, msg.chat_id)
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участнику выдан варн"})
								})
							}
							chatmanager.api.messages.editChat({chat_id: msg.chat_id, title: chatmgrbase.chats[is].info.title})
						}
						else if(myrole.level >= 2) {
							if(!blockurls(msg.action.text)) {
								chatmgrbase.chats[is].info.title = msg.action.text
								mgrupd_db()
							}
						}
					})
				}
				else if(msg.action.type == "chat_photo_update" || msg.action.type == "chat_photo_remove") {
					if(chatmgrbase.chats[is].settings.doingkick == "kick") {
						var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
						chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
							if(myrole.level == 0) {
								chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: msg.from_id, cberr: 1}, function(gg) {
									if(fa != null) {
										chatmgrbase.users[fa].info.in_chat = false
									}
								})
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участник был кикнут"})
								})
							}
						})
					}
					else if(chatmgrbase.chats[is].settings.doingkick == "warn") {
						var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
						chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
							if(myrole.level == 0) {
								mgrwarnChatUser(msg.from_id, msg.chat_id)
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Удаление/смена фотографии\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участнику выдан варн"})
								})
							}
						})
					}
				}
				else if(msg.action.type == "chat_pin_message" || msg.action.type == "chat_unpin_message") {
					if(chatmgrbase.chats[is].settings.doingkick == "kick") {
						var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
						chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
							if(myrole.level == 0) {
								chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: msg.from_id, cberr: 1}, function(gg) {
									if(fa != null) {
										chatmgrbase.users[fa].info.in_chat = false
									}
								})
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Открепление/закрепление сообщения\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участник был кикнут"})
								})
							}
						})
					}
					else if(chatmgrbase.chats[is].settings.doingkick == "warn") {
						var name = chatmanager.apiSync.users.get({user_ids: msg.from_id, fields: "first_name"}).response[0]
						chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
							if(myrole.level == 0) {
								mgrwarnChatUser(msg.from_id, msg.chat_id)
								chatmgrbase.chats[is].events.map(function(cc) {
									chatmanager.api.messages.send({user_id: cc, message: "🔔 Информация из беседы «" + chatmgrbase.chats[is].info.title + "»\n📝 Тип события: Открепление/закрепление сообщения\n👷 Участник беседы, который получил наказание: @id" + msg.from_id + " (" + name.first_name + " " + name.last_name + ")\n⚠ Участнику выдан варн"})
								})
							}
						})
					}
				}
				else if(msg.action.type == "chat_invite_user_by_link") {
					var iu = null
					for(var i = 0; i < chatmgrbase.users.length; i++) {
						if(chatmgrbase.users[i].user_id == msg.from_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
							iu = i
						}
					}
					if(iu == null) {
						var kek = new Date()
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": msg.from_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else {
						chatmgrbase.users[iu].info.in_chat = true
					}
				}
				else if(msg.action.type == "chat_invite_user") {
					var iu = null
					for(var i = 0; i < chatmgrbase.users.length; i++) {
						if(chatmgrbase.users[i].user_id == msg.action.member_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
							iu = i
						}
					}
					if(iu == null) {
						var kek = new Date()
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": msg.action.member_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else {
						chatmgrbase.users[iu].info.in_chat = true
					}
				}
				else if(msg.action.type == "chat_kick_user") {
					if(msg.action.member_id == msg.user_id) {
						if(chatmgrbase.chats[is].settings.kick_leave == true) {
							chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
								if(myrole.level == 0) {
									chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: msg.from_id, cberr: 1}, function(gg) {
										if(fa != null) {
											chatmgrbase.users[fa].info.in_chat = false
										}
									})
								}
							})
						}
					}
					else {
						var ku = null
						for(var i = 0; i < chatmgrbase.users.length; i++) {
							if(chatmgrbase.users[i].user_id == msg.action.member_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
								ku = i
							}
						}
						if(ku != null) {
							chatmgrbase.users[ku].info.in_chat = false
						}
					}
				}
			}
			else {
				chatmgrAddStats(msg)
				var s = null
				for(var i = 0; i < chatmgr_chat.length; i++) {
					if(msg.text.match(chatmgr_chat[i].regexp)) {
						matched = msg.text.match(chatmgr_chat[i].regexp)
						s = i
					}
				}
				if(s != null) {
					var dbid = null
					for(var i = 0; i < chatmgrbase.chats.length; i++) {
						if(chatmgrbase.chats[i].chat_id == msg.chat_id) {
							dbid = i
						}
					}
					if(dbid == null) return
					chatmgr_chat[s].f(matched,msg,dbid)
				}
			}
		}
	}
	else {
		
	}
}, {interval: 1000, group_id: 179676732 })

var chatmgr_chat = [
	{
		regexp:/^(\/|!|\+)проверка$/i,
		f:function(params,msg,dbid) {
			checkChat(msg)
		},
	},
	{
		regexp:/^(\/|!|\+)settings/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(st) {
				if(st.specadmin == true) {
					if(msg.text == "/settings") {
						msg.send("📝 Настройки беседы\n\nМогут ли участники приглашать людей — " + (chatmgrbase.chats[dbid].settings.can_invite == false?"нет":"да") + "\nИзменить: \"/settings invite (on|off)\"\nБудут ли кикнуты участники после выхода — " + (chatmgrbase.chats[dbid].settings.kick_leave == false?"нет":"да") + "\nИзменить: \"/settings kickleave (on|off)\"\nБудут ли участники забанены при отправке ссылки на беседу — " + (chatmgrbase.chats[dbid].settings.link_ban == false?"нет":"да") + "\nИзменить: \"/settings linkban (on|off)\"\nВключена ли бета версия защита — " + (chatmgrbase.chats[dbid].settings.antileak == false?"нет":"да") + "\nИзменить: \"/settings antileak (on|off)\"")
					}
					else if(msg.text.match(/^\/settings (.*)/i)) {
						var paam = msg.text.match(/^\/settings (invite|kickleave|linkban|antileak|doingkick) (on|off|kick|warn)$/i)
						if(paam != null) {
							if(paam[1] == "invite") {
								if(paam[2] == "on") {
									chatmgrbase.chats[dbid].settings.can_invite = true
									msg.send("Теперь участники могут приглашать людей в конференцию.")
								}
								else if(paam[2] == "off") {
									chatmgrbase.chats[dbid].settings.can_invite = false
									msg.send("Теперь участники не могут приглашать людей в конференцию.")
								}
							}
							else if(paam[1] == "kickleave") {
								if(paam[2] == "on") {
									chatmgrbase.chats[dbid].settings.kick_leave = true
									msg.send("Теперь участники будут кикнуты после выхода из беседы.")
								}
								else if(paam[2] == "off") {
									chatmgrbase.chats[dbid].settings.kick_leave = false
									msg.send("Теперь участники не будут кикнуты после выхода из беседы.")
								}
							}
							else if(paam[1] == "linkban") {
								if(paam[2] == "on") {
									chatmgrbase.chats[dbid].settings.link_ban = true
									msg.send("Теперь участники будут забанены при отправке ссылки на беседу.")
								}
								else if(paam[2] == "off") {
									chatmgrbase.chats[dbid].settings.link_ban = false
									msg.send("Теперь участники не будут забанены при отправке ссылки на беседу.")
								}
							}
							else if(paam[1] == "antileak") {
								if(paam[2] == "on") {
									chatmgrbase.chats[dbid].settings.antileak = true
									msg.send("Бета версия защиты включена.\nМы не гарантируем работоспособность данной защиты.")
								}
								else if(paam[2] == "off") {
									chatmgrbase.chats[dbid].settings.antileak = false
									msg.send("Бета версия защиты выключена.")
								}
							}
							else if(paam[1] == "doingkick") {
								if(paam[2] == "kick") {
									chatmgrbase.chats[dbid].settings.doingkick = "kick"
									msg.send("Теперь участники при смене названия, аватара будут кикнуты.")
								}
								else if(paam[2] == "warn") {
									chatmgrbase.chats[dbid].settings.doingkick = "warn"
									msg.send("Теперь участникам при смене названия, аватара будет выдан варн.")
								}
								else if(paam[2] == "off") {
									chatmgrbase.chats[dbid].settings.doingkick = false
									msg.send("Теперь участники при смене названия, аватара ничего не будет.")
								}
							}
							mgrupd_db()
						}
					}
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)kick/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.moder == true) {
					findUserInMessage(msg, function(id) {
						chatmgrCheckStaff(id, msg.chat_id, function(targetrole) {
							if(myrole.level > targetrole.level) {
								chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: id, cberr: 1}, function(a) {
									var fa = null
									for(var i = 0; i < chatmgrbase.users.length; i++) {
										if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
											fa = i
										}
									}
									if(fa != null) {
										chatmgrbase.users[fa].info.in_chat = false
										mgrupd_db()
									}
									if(!a.error) {
										if(id > 0) {
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].kick_user.replace(/%mem_id%/, id)
											msg.send(gh)
										}
										else if(id < 0) {
											id =-id
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].kick_group.replace(/%mem_id%/, id)
											msg.send(gh)
										}
									}
									else {
										var fa = null
										for(var i = 0; i < chatmgrbase.users.length; i++) {
											if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
												fa = i
											}
										}
										if(fa != null) {
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].errorkick.replace(/%error_text%/, a.error.error_msg)
											msg.send(gh)
										}
										else if(fa == null) {
											if(id > 0) {
												var gh = lang[chatmgrbase.chats[dbid].settings.lang].usernotinchat.replace(/%mem_id%/, id)
												msg.send(gh)
											}
											else if(id < 0) {
												id =-id
												var gh = lang[chatmgrbase.chats[dbid].settings.lang].groupnotinchat.replace(/%mem_id%/, id)
												msg.send(gh)
											}
										}
									}
								})
							}
						})
					})
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)ban/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.admin == true) {
					findUserInMessage(msg, function(id) {
						chatmgrCheckStaff(id, msg.chat_id, function(targetrole) {
							if(myrole.level > targetrole.level) {
								chatmanager.api.messages.removeChatUser({chat_id: msg.chat_id, member_id: id, cberr: 1}, function(a) {
									var fa = null
									for(var i = 0; i < chatmgrbase.users.length; i++) {
										if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
											fa = i
										}
									}
									if(fa != null) {
										if(chatmgrbase.users[fa].info.banned == true) return msg.send("Пользователь уже заблокирован")
										chatmgrbase.users[fa].info.in_chat = false
										chatmgrbase.users[fa].info.banned = true
										mgrupd_db()
										if(id > 0) {
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].ban_user.replace(/%mem_id%/, id)
											msg.send(gh)
										}
										else if(id < 0) {
											id =-id
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].ban_group.replace(/%mem_id%/, id)
											msg.send(gh)
										}
									}
									else {
										var kek = new Date()
										chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": id, "info": { "in_chat": false, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": true, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
										mgrupd_db()
										if(id > 0) {
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].ban_user.replace(/%mem_id%/, id)
											msg.send(gh)
										}
										else if(id < 0) {
											id =-id
											var gh = lang[chatmgrbase.chats[dbid].settings.lang].ban_group.replace(/%mem_id%/, id)
											msg.send(gh)
										}
									}
								})
							}
						})
					})
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)unban/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.admin == true) {
					findUserInMessage(msg, function(id) {
						chatmgrCheckStaff(id, msg.chat_id, function(targetrole) {
							if(myrole.level > targetrole.level) {
								var fa = null
								for(var i = 0; i < chatmgrbase.users.length; i++) {
									if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
										fa = i
									}
								}
								if(fa != null) {
									if(chatmgrbase.users[fa].info.banned == false) return msg.send("Пользователь не заблокирован")
									chatmgrbase.users[fa].info.banned = false
									mgrupd_db()
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].unban_user.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].unban_group.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
								else {
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].usernotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].groupnotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
							}
						})
					})
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)warn/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.admin == true) {
					findUserInMessage(msg, function(id) {
						chatmgrCheckStaff(id, msg.chat_id, function(targetrole) {
							if(myrole.level > targetrole.level) {
								var fa = null
								for(var i = 0; i < chatmgrbase.users.length; i++) {
									if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
										fa = i
									}
								}
								if(fa != null) {
									chatmgrbase.users[fa].info.warns.push( { "id_admin": msg.from_id } )
									mgrupd_db()
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].warn_user.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].warn_group.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
								else {
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].usernotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].groupnotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
							}
						})
					})
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)unwarn/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.admin == true) {
					findUserInMessage(msg, function(id) {
						chatmgrCheckStaff(id, msg.chat_id, function(targetrole) {
							if(myrole.level > targetrole.level) {
								var fa = null
								for(var i = 0; i < chatmgrbase.users.length; i++) {
									if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
										fa = i
									}
								}
								if(fa != null) {
									chatmgrbase.users[fa].info.warns = []
									mgrupd_db()
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].unwarn_user.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].unwarn_group.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
								else {
									if(id > 0) {
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].usernotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
									else if(id < 0) {
										id =-id
										var gh = lang[chatmgrbase.chats[dbid].settings.lang].groupnotinchat.replace(/%mem_id%/, id)
										msg.send(gh)
									}
								}
							}
						})
					})
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)clean$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(f) {
				if(f.level > 1) {
					var isa = " <br>"
					for(var i = 0; i < 200; i++) {
						isa = isa+" <br>"
					}
					msg.send(isa+"Чат очищен [id"+msg.from_id+"|администратором].")
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)cid$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(f) {
				if(f.level > 1) {
					msg.send("&#9989; ID беседы: "+msg.chat_id)
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)события$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
				if(myrole.admin == true) {
					if(chatmgrbase.chats[dbid].events.indexOf(msg.from_id) == -1) {
						chatmgrbase.chats[dbid].events.push(msg.from_id)
						mgrupd_db()
						msg.send(lang[chatmgrbase.chats[dbid].settings.lang].events_on)
					}
					else {
						chatmgrbase.chats[dbid].events.splice(chatmgrbase.chats[dbid].events.indexOf(msg.from_id), 1)
						mgrupd_db()
						msg.send(lang[chatmgrbase.chats[dbid].settings.lang].events_off)
					}
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)mystats$/i,
		f:function(params,msg,dbid) {
			var fa = null
			for(var i = 0; i < chatmgrbase.users.length; i++) {
				if(chatmgrbase.users[i].user_id == msg.from_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
					fa = i
				}
			}
			if(fa != null) {
				msg.send("Статистика пользователя @id" + msg.from_id + "\n👑 Роль: " + statsRole(msg.from_id, msg.chat_id) + "\n📅 В чате с " + chatmgrbase.users[fa].stats.joinchatdate + "\n⌚ Последнее сообщение: " + chatmgrbase.users[fa].stats.lastmsgdate.customFormat( "#DD#.#MM#.#YYYY#" ) + "\n📧 Сообщений: " + chatmgrbase.users[fa].stats.messages + "\n🔣 Символов: " + chatmgrbase.users[fa].stats.symbols + "\n📩 Пересланных: " + chatmgrbase.users[fa].stats.forwarded_messages + "\n📷 Фото: " + chatmgrbase.users[fa].stats.photos + "\n📹 Видео: " + chatmgrbase.users[fa].stats.videos + "\n🎧 Аудио: " + chatmgrbase.users[fa].stats.audios + "\n❗ Команд: " + chatmgrbase.users[fa].stats.commands + "\n💩 Стикеров: " + chatmgrbase.users[fa].stats.stikers + "\n👺 Сообщений с матом: " + chatmgrbase.users[fa].stats.mats_messages + "\n🤣 Смайлов: " + chatmgrbase.users[fa].stats.smiles + "\n📣 Постов: " + chatmgrbase.users[fa].stats.wall_posts + "\n📑 Документов: " + chatmgrbase.users[fa].stats.documents + "\n🎵 Голосовых: " + chatmgrbase.users[fa].stats.audio_messages)
			}
		},
	},
	{
		regexp:/^(\/|!|\+)stats/i,
		f:function(params,msg,dbid) {
			findUserInMessage(msg, function(id) {
				chatmgrCheckStaff(msg.from_id, msg.chat_id, function(myrole) {
					if(myrole.moder == true) {
						var fa = null
						for(var i = 0; i < chatmgrbase.users.length; i++) {
							if(chatmgrbase.users[i].user_id == id && chatmgrbase.users[i].chat_id == msg.chat_id) {
								fa = i
							}
						}
						if(fa != null) {
							var kek = new Date(chatmgrbase.users[fa].stats.lastmsgdate)
							msg.send("Статистика пользователя @id" + id + "\n👑 Роль: " + statsRole(id, msg.chat_id) + "\n📅 В чате с " + chatmgrbase.users[fa].stats.joinchatdate + "\n⌚ Последнее сообщение: " + (chatmgrbase.users[fa].stats.lastmsgdate != "none"?"" + kek.customFormat( "#DD#.#MM#.#YYYY#" ):"Неизвестно") + "\n📧 Сообщений: " + chatmgrbase.users[fa].stats.messages + "\n🔣 Символов: " + chatmgrbase.users[fa].stats.symbols + "\n📩 Пересланных: " + chatmgrbase.users[fa].stats.forwarded_messages + "\n📷 Фото: " + chatmgrbase.users[fa].stats.photos + "\n📹 Видео: " + chatmgrbase.users[fa].stats.videos + "\n🎧 Аудио: " + chatmgrbase.users[fa].stats.audios + "\n❗ Команд: " + chatmgrbase.users[fa].stats.commands + "\n💩 Стикеров: " + chatmgrbase.users[fa].stats.stikers + "\n👺 Сообщений с матом: " + chatmgrbase.users[fa].stats.mats_messages + "\n🤣 Смайлов: " + chatmgrbase.users[fa].stats.smiles + "\n📣 Постов: " + chatmgrbase.users[fa].stats.wall_posts + "\n📑 Документов: " + chatmgrbase.users[fa].stats.documents + "\n🎵 Голосовых: " + chatmgrbase.users[fa].stats.audio_messages)
						}
						else {
							var gh = lang[chatmgrbase.chats[dbid].settings.lang].usernotinchat.replace(/%mem_id%/, id)
							msg.send(gh)
						}
					}
				})
			})
		},
	},
	{
		regexp:/^(\/|!|\+)chatstats$/i,
		f:function(params,msg,dbid) {
			chatstats(msg)
		},
	},
	{
		regexp:/^(\/|!|\+)рейтинг$/i,
		f:function(params,msg,dbid) {
			ratingchats(msg)
		},
	},
	{
		regexp:/^(\/|!|\+)offchat$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var is = null
					for(var i = 0; i < chatmgrbase.chats.length; i++) {
						if(chatmgrbase.chats[i].chat_id == msg.chat_id) {
							is = i
						}
					}
					if(is == null) return
					chatmgrbase.chats[is].settings.offchat = true
					mgrupd_db()
					msg.send("✅ Режим тишины активирован.\n⚠ Каждый кто напишет в чат будет кикнут.\n❗ Примечание: режим тишины не действует на администраторов и модераторов.")
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)onchat$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var is = null
					for(var i = 0; i < chatmgrbase.chats.length; i++) {
						if(chatmgrbase.chats[i].chat_id == msg.chat_id) {
							is = i
						}
					}
					if(is == null) return
					chatmgrbase.chats[is].settings.offchat = false
					mgrupd_db()
					msg.send("✅ Режим тишины деактивирован.\n😉 Можно общаться.")
				}
			})
		},
	},
	{
		regexp:/^(\/|!|\+)admins$/i,
		f:function(params,msg,dbid) {
			var names = chatmgrbase.users.filter(a=> a.info.moder == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var usernames = chatmanager.apiSync.users.get({user_ids:names.join(","), fields:"first_name"}).response
			var f = chatmgrbase.users.filter(a=> a.info.creator == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var creator = "Создатель: \n" + f.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			var af = chatmgrbase.users.filter(a=> a.info.specadmin == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var spec = "Спец. администраторы: \n" + af.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			var afa = chatmgrbase.users.filter(a=> a.info.admin == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var admin = "Администраторы: \n" + afa.map(a=> i++ +". " + usernames.filter(e=> e.id == a)[0].first_name + " " + usernames.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			msg.send(creator+"\n\n"+spec+"\n\n"+admin)
		},
	},
	{
		regexp:/^(\/|!|\+)moders$/i,
		f:function(params,msg,dbid) {
			var afa = chatmgrbase.users.filter(a=> a.info.moder == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
			var i = 1
			var moddesn = chatmanager.apiSync.users.get({user_ids:afa.join(","), fields:"first_name"}).response
			var moder = "Модераторы: \n" + afa.map(a=> i++ +". " + moddesn.filter(e=> e.id == a)[0].first_name + " " + moddesn.filter(e=> e.id == a)[0].last_name + " - vk.com/id" + a).join("\n")
			msg.send(moder)
		},
	},
	{
		regexp:/^(\/|!|\+)blist$/i,
		f:function(params,msg,dbid) {
			chatmgrCheckStaff(msg.from_id, msg.chat_id, function(clb) {
				if(clb.admin == true) {
					var afa = chatmgrbase.users.filter(a=> a.info.banned == true && a.chat_id == msg.chat_id && a.user_id > 0).map(a=> a.user_id)
					var asfa = []
					for(var i = 0; i < chatmgrbase.users.length; i++){
						if(chatmgrbase.users[i].info.banned == true && chatmgrbase.users[i].chat_id == msg.chat_id && chatmgrbase.users[i].user_id < 0) {
							var fafs = chatmgrbase.users[i].user_id
							fafs =-fafs
							asfa.push(fafs)
						}
					}
					var i = 1
					var moddesn = chatmanager.apiSync.users.get({user_ids:afa.join(","), fields:"first_name"}).response
					var grp = chatmanager.apiSync.groups.getById({group_ids:asfa.join(",")}).response
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
		regexp:/^(\/|!|\+)правила$/i,
		f:function(params,msg,dbid) {
			if(chatmgrbase.chats[dbid].info.rules_msg != 0) {
				chatmanager.api.messages.send({peer_id: msg.peer_id, forward_messages: chatmgrbase.chats[dbid].info.rules_msg})
			}
			else {
				msg.send("Правил нету.")
			}
		},
	},
	{
		regexp:/^(\/|!|\+)wlist$/i,
		f:function(params,msg,dbid) {
			var is = null
			for(var i = 0; i < chatmgrbase.users.length; i++) {
				if(chatmgrbase.users[i].user_id == msg.from_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
					is = i
				}
			}
			if(is != null) {
				if(chatmgrbase.users[is].info.warns.length == 0) {
					msg.send("❌ У вас нет предупреждений.")
				}
				else {
					var fa = 1 
					var lolik = "📒 Список предупреждений:\n" + chatmgrbase.users[is].info.warns.map(a=> fa++ + "" + ". " + (a.id_admin != 0?"vk.com/id" + a.id_admin:"Чат-менеджер") + "").join("\n")
					msg.send(lolik)
				}
			}
			else {
				msg.send("❌ У вас нет предупреждений.")
				var kek = new Date()
				chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": msg.from_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
			}
		},
	},
	{
		regexp:/^(\/|!|\+)reference$/i,
		f:function(params,msg,dbid) {
			msg.send("&#128260; Справка:\n\n➡ Список команд для администраторов или модераторов (/help)\n➡ Список команд для обычных пользователей (/menu)\n➡ Нашли баг? Баг трекер: https://vk.cc/8uclxv\n➡ Есть идеи что добавить в бота? Отпишите сюда: https://vk.cc/8ucldI")
		},
	},
	{
		regexp:/^(\/|!|\+)menu$/i,
		f:function(params,msg,dbid) {
			msg.send("🚀 || Вот доступный список команд менеджера бесед:\n\n📋 !правила - Правила конференции\n👮 !admins - Список администрации\n👼 !moders - Список модераторов\n💬 !reference - Получить справку о боте\n🚫 !wlist - Список предупреждений\n✉ !chatstats - Статистика конференции\n📜 !CID - Узнать id чата\n🚶 !mystats - Посмотреть собственную статистику\n🥇 !рейтинг - Топ 10 активных конференций")
		},
	},
	{
		regexp:/^(\/|!|\+)help$/i,
		f:function(params,msg,dbid) {
			msg.send("📕 || Доступные команды от модератора:\n\n💡 !kick [ссылка] - Кикнуть пользователя\n❗ !warn [ссылка] - Выдать варн пользователю\n⚡ !unwarn [ссылка] - Снять варн с пользователя\n✏ !onchat - Включить чат\n✂ !offchat - Отключить чат\n📄 !stats [ссылка] - Информация о пользователе\n🔔 !События - Статистика конференции\n♻ !Clean - Кикнуть пользователя\n❌ !ban [ссылка] - Забанить пользователя\n✔ !Unban [ссылка] - Разбанить пользователя\n🔥 !setting - Настройка бота")
		},
	},
	{
		regexp:/^(\/|!|\+)мур$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.send("😼")
			}
		},
	},
	{
		regexp:/^(\/|!|\+)мяу$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.send("🐈")
			}
		},
	},
	{
		regexp:/^(\/|!|\+)гав$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.send("🐶")
			}
		},
	},
	{
		regexp:/^(\/|!|\+)ко$/i,
		f:function(params,msg,dbid){
			if(msg.chat_id > 0) {
				msg.send("&#128020;")
			}
		},
	},
	{
		regexp:/^(\/|!|\+)getlink$/i,
		f:function(params,msg,dbid) {
			if(chatmgrbase.chats[dbid].transfer) {
				chatmgrCheckStaff(msg.from_id, msg.chat_id, function(clb) {
					if(clb.specadmin == true) {
						var peer = chatmgrbase.chats[dbid].transfer.id + 2000000000
						vkadmin.api.messages.getInviteLink({peer_id: peer}, function(a){
							msg.send("Ссылка на беседу: "+a.response.link)
						})
					}
				})
			}
		},
	},
	{
		regexp:/^(\/|!|\+)(offlink|resetlink)$/i,
		f:function(params,msg,dbid) {
			if(chatmgrbase.chats[dbid].transfer) {
				chatmgrCheckStaff(msg.user_id, msg.chat_id, function(clb) {
					if(clb.specadmin == true) {
						var peer = chatmgrbase.chats[dbid].transfer.id + 2000000000
						vkadmin.api.messages.getInviteLink({peer_id: peer, reset: 1}, function(a){
							msg.send("&#9989; Ссылка на беседу была сброшена.")
						})
					}
				})
			}
		},
	},
]

function checkChat(msg) {
	var kek = new Date()
	chatmanager.api.messages.getConversationMembers({peer_id: msg.peer_id, cberr: 1}, function(a) {
		if(!a.error) {
			var users = []
			a.response.items.map(function(c) {
				users.push(c.member_id)
				function find(element) {
					if(element.user_id == c.member_id && element.chat_id == msg.chat_id) {
						return element
					}
				}
				function findchat(element) {
					if(element.chat_id == msg.chat_id) {
						return element
					}
				}
				var g = chatmgrbase.users.findIndex(find)
				var f = chatmgrbase.chats.findIndex(findchat)
				if(f < 0) return
				if(c.is_owner == true) {
					chatmgrbase.chats[f].info.creator = c.member_id
				}
				if(g < 0) {
					if(c.is_owner == true) {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": true, "specadmin": true, "admin": true, "moder": true, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else if(c.is_admin == true) {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": false, "specadmin": true, "admin": true, "moder": true, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
				}
				else {
					if(c.is_admin == true) {
						chatmgrbase.users[g].info.specadmin = true
						chatmgrbase.users[g].info.admin = true
						chatmgrbase.users[g].info.moder = true
					}
				}
			})
			chatmgrbase.users.map(function(c) {
				if(c.chat_id == msg.chat_id) {
					if(users.indexOf(c.user_id) == -1) {
						c.info.in_chat = false
					}
					else {
						c.info.in_chat = true
					}
				}
			})
			mgrupd_db()
			msg.send("Теперь я буду воспринимать эту беседу как администратор.\nВременные баны, события беседы и прочий функционал подобного типа теперь включен.\n\n⚠ Убедительная просьба — если вы снимете с меня права администратора, используйте эту команду еще раз.\n\nСписок команд: *ССЫЛКА*")
		}
		else {
			msg.send("🤔 Вы зачем-то дали мне (сообществу) право читать полную переписку, но не дали права администратора.\nВ таком состоянии я не могу работать. Или дайте мне права администратора, или исключите из беседы.\nВ противном случае я покину ее сам.")
		}
	})
}

function updChat(msg) {
	var kek = new Date()
	chatmanager.api.messages.getConversationMembers({peer_id: msg.peer_id, cberr: 1}, function(a) {
		if(!a.error) {
			var users = []
			a.response.items.map(function(c) {
				users.push(c.member_id)
				function find(element) {
					if(element.user_id == c.member_id && element.chat_id == msg.chat_id) {
						return element
					}
				}
				function findchat(element) {
					if(element.chat_id == msg.chat_id) {
						return element
					}
				}
				var g = chatmgrbase.users.findIndex(find)
				var f = chatmgrbase.chats.findIndex(findchat)
				if(f < 0) return
				if(c.is_owner == true) {
					chatmgrbase.chats[f].info.creator = c.member_id
				}
				if(g < 0) {
					if(c.is_owner == true) {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": true, "specadmin": true, "admin": true, "moder": true, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else if(c.is_admin == true) {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": false, "specadmin": true, "admin": true, "moder": true, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
					else {
						chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
					}
				}
				else {
					if(c.is_admin == true) {
						chatmgrbase.users[g].info.specadmin = true
						chatmgrbase.users[g].info.admin = true
						chatmgrbase.users[g].info.moder = true
					}
				}
			})
			chatmgrbase.users.map(function(c) {
				if(c.chat_id == msg.chat_id) {
					if(users.indexOf(c.user_id) == -1) {
						c.info.in_chat = false
					}
					else {
						c.info.in_chat = true
					}
				}
			})
			mgrupd_db()
		}
	})
}

function randomUid() {
	var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	var randomString = ""
	for (var i = 0; i < 23; i++) {
		if(i == 5 || i == 11 || i == 17) {
			randomString += "-"
		}
		else {
			var randomPoz = Math.floor(Math.random() * charSet.length)
			randomString += charSet.substring(randomPoz, randomPoz + 1)
		}
	}
	return randomString
}

function ratingchats(msg) {
	var tops = []
	for(var i = 0; i < chatmgrbase.chats.length; i++){
		if(chatmgrbase.chats[i].info.bannedtop == false) {
			tops.push({cid: chatmgrbase.chats[i].chat_id, messages: chatmgrbase.chats[i].stats.messages, title: chatmgrbase.chats[i].info.title, creator: chatmgrbase.chats[i].info.creator})
		}
	}
	tops.sort(function(a, b){
		if(b.messages > a.messages) return 1
		if(b.messages < a.messages) return -1
		return 0
	})
	var yo = []
	var gg = 0
	for(var g = 0; g < 10; g++){
		if(tops.length > g){
			gg++
			yo.push({cid: tops[g].cid, messages: tops[g].messages, title: tops[g].title, creator: tops[g].creator, num: gg})
		}
	}
	var i = 1 
	var p = 1
	var l = 0
	var lolik = "Список самых активных чатов:\n" + yo.map(a=> i++ +". " + (a.num ==1?" 🥇 ":"") + (a.num ==2?" 🥈 ":"") + (a.num ==3?" 🥉 ":"") + "«" + a.title + "» " + "- vk.com/id" + a.creator).join("\n")
	msg.send(lolik)
}

function chatstats(msg) {
	var tops = []
	var ids = []
	for(var i = 0; i < chatmgrbase.users.length; i++){
		if(chatmgrbase.users[i].chat_id == msg.chat_id && chatmgrbase.users[i].user_id > 0 && chatmgrbase.users[i].info.in_chat == true) {
			tops.push({id: chatmgrbase.users[i].user_id, messages: chatmgrbase.users[i].stats.messages})
		}
	}
	tops.sort(function(a, b){
		if(b.messages > a.messages) return 1
		if(b.messages < a.messages) return -1
		return 0
	})
	var yo = []
	for(var g = 0; g < 10; g++){
		if(tops.length > g){
			ids.push(tops[g].id)
			yo.push({id: tops[g].id, messages: tops[g].messages})
		}
	}
	var i = 1 
	var p = 1
	var l = 0
	var chta = null
	for(var ia = 0; ia < chatmgrbase.chats.length; ia++){
		if(chatmgrbase.chats[ia].chat_id == msg.chat_id){
			chta = ia
		}
	}
	if(chta != null) {
		var usernames = chatmanager.apiSync.users.get({user_ids: ids.join(","), fields: "first_name"}).response
		var lolik = "\nСамые активные пользователи: \n" + yo.map(a=> i++ +". " + usernames.filter(e=> e.id == a.id)[0].first_name + " " + usernames.filter(e=> e.id == a.id)[0].last_name + " (vk.com/id" + a.id + ") - " + a.messages + " сообщений. ").join("\n")
		msg.send("📧 Сообщений: " + chatmgrbase.chats[chta].stats.messages + "\n🔣 Символов: " + chatmgrbase.chats[chta].stats.symbols + "\n📩 Пересланных: " + chatmgrbase.chats[chta].stats.forwarded_messages + "\n📷 Фото: " + chatmgrbase.chats[chta].stats.photos + "\n📹 Видео: " + chatmgrbase.chats[chta].stats.videos + "\n🎧 Аудио: " + chatmgrbase.chats[chta].stats.audios + "\n❗ Команд: " + chatmgrbase.chats[chta].stats.commands + "\n💩 Стикеров: " + chatmgrbase.chats[chta].stats.stikers + "\n👺 Сообщений с матом: " + chatmgrbase.chats[chta].stats.mats_messages + "\n🤣 Смайлов: " + chatmgrbase.chats[chta].stats.smiles + "\n📣 Постов: " + chatmgrbase.chats[chta].stats.wall_posts + "\n📑 Документов: " + chatmgrbase.chats[chta].stats.documents + "\n🎵 Голосовых: " + chatmgrbase.chats[chta].stats.audio_messages + lolik)
	}
}

function mgrwarnChatUser(user, chat) {
	var is = null
	for(var i = 0; i < chatmgrbase.chats.length; i++) {
		if(chatmgrbase.chats[i].chat_id == chat) {
			is = i
		}
	}
	var fa = null
	for(var i = 0; i < chatmgrbase.users.length; i++) {
		if(chatmgrbase.users[i].user_id == user && chatmgrbase.users[i].chat_id == chat) {
			fa = i
		}
	}
	if(fa != null) {
		chatmgrbase.users[fa].info.warns.push( { "admin_id": 0 } )
		if(chatmgrbase.users[fa].info.warns.length == 3) {
			chatmanager.api.messages.removeChatUser({member_id: user, chat_id: chat, cberr: 1}, function(ff) {
				chatmgrbase.users[fa].info.warns = []
				chatmgrbase.users[fa].info.in_chat = false
				chatmgrbase.users[fa].info.banned = true
				mgrupd_db()
				chatmanager.api.messages.send({chat_id: chat, message: lang[chatmgrbase.chats[is].settings.lang].banwarn})
			})
		}
	}
	else {
		var kek = new Date()
		chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": c.member_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [ { "admin_id": 0 } ], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
		mgrupd_db()
	}
}

function findUserInMessage(msg, cb) {
	var id = 0
	if(msg.text.match(/(.*)vk\.com\/(.*)/)) {
		var regexplink = /(https:\/\/|)vk\.com\/(.*)/
		var link = msg.text.match(regexplink)
		chatmanager.api.utils.resolveScreenName({screen_name: link[2]}, function(a){
			if(a.response.type == "group"){
				a.response.object_id = parseInt("-"+a.response.object_id)
				id = a.response.object_id
			}
			else if(a.response.type == "user"){
				id = a.response.object_id
			}
			cb(id)
		})
	}
	else if(msg.text.match(/\[id(\d+)\|(.*)\]/)) {
		var regexpid = /\[id(\d+)\|(.*)\]/
		var id = msg.text.match(regexpid)
		id = parseInt(id[1])
		cb(id)
	}
	else if(msg.text.match(/\[club(\d+)\|(.*)\]/)) {
		var regexpclub = /\[club(\d+)\|(.*)\]/
		var club = msg.text.match(regexpclub)
		id = parseInt(parseInt("-"+club[1]))
		cb(id)
	}
	else if(msg.fwd_messages.length != 0) {
		id = msg.fwd_messages[0].from_id
		cb(id)
	}
}

function chatmgrAddStats(msg) {
	var is = null
	for(var i = 0; i < chatmgrbase.chats.length; i++) {
		if(chatmgrbase.chats[i].chat_id == msg.chat_id) {
			is = i
		}
	}
	var fa = null
	for(var i = 0; i < chatmgrbase.users.length; i++) {
		if(chatmgrbase.users[i].user_id == msg.from_id && chatmgrbase.users[i].chat_id == msg.chat_id) {
			fa = i
		}
	}
	var kek = new Date()
	if(is == null) return
	if(fa == null) {
		fa = chatmgrbase.users.length
		chatmgrbase.users.push( { "chat_id": msg.chat_id, "user_id": msg.from_id, "info": { "in_chat": true, "creator": false, "specadmin": false, "admin": false, "moder": false, "banned": false, "muted": false, "warns": [], "bot_warns": 0 }, "stats": { "joinchatdate": kek.customFormat( "#DD#.#MM#.#YYYY#" ), "lastmsgdate": "none", "messages": 0, "symbols": 0, "forwarded_messages": 0, "audio_messages": 0, "stikers": 0, "mats_messages": 0, "smiles": 0, "wall_posts": 0, "documents": 0, "photos": 0, "videos": 0, "audios": 0, "commands": 0 } } )
	}
	else {
		fa = fa
	}
	chatmgrbase.chats[is].stats.messages += 1
	chatmgrbase.users[fa].stats.messages += 1
	if(msg.text) {
		chatmgrbase.chats[is].stats.symbols += msg.text.length
		chatmgrbase.users[fa].stats.symbols += msg.text.length
		var smiles = msg.text.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g)
		if(smiles != null) {
			chatmgrbase.chats[is].stats.smiles += smiles.length
			chatmgrbase.users[fa].stats.smiles += smiles.length
		}
		if(msg.text.match(/(6ля|6лядь|6лять|b3ъeб|cock|cunt|e6aль|ebal|eblan|eбaл|eбaть|eбyч|eбать|eбёт|eблантий|fuck|fucker|fucking|xyёв|xyй|xyя|xуе|xуй|xую|zaeb|zaebal|zaebali|zaebat|архипиздрит|ахуел|ахуеть|бздение|бздеть|бздех|бздецы|бздит|бздицы|бздло|бзднуть|бздун|бздунья|бздюха|бздюшка|бздюшко|бля|блябу|блябуду|бляд|бляди|блядина|блядище|блядки|блядовать|блядство|блядун|блядуны|блядунья|блядь|блядюга|блять|вафел|вафлёр|взъебка|взьебка|взьебывать|въеб|въебался|въебенн|въебусь|въебывать|выблядок|выблядыш|выеб|выебать|выебен|выебнулся|выебон|выебываться|выпердеть|высраться|выссаться|вьебен|гавно|гавнюк|гавнючка|гамно|гандон|гнид|гнида|гниды|говенка|говенный|говешка|говназия|говнецо|говнище|говно|говноед|говнолинк|говночист|говнюк|говнюха|говнядина|говняк|говняный|говнять|гондон|доебываться|долбоеб|долбоёб|долбоящер|дота|дрисня|дрист|дристануть|дристать|дристун|дристуха|дрочелло|дрочена|дрочила|дрочилка|дрочистый|дрочить|дрочка|дрочун|е6ал|е6ут|еб твою мать|ёб твою мать|ёбaн|ебaть|ебyч|ебал|ебало|ебальник|ебан|ебанамать|ебанат|ебаная|ёбаная|ебанический|ебанный|ебанныйврот|ебаное|ебануть|ебануться|ёбаную|ебаный|ебанько|ебарь|ебат|ёбат|ебатория|ебать|ебать-копать|ебаться|ебашить|ебёна|ебет|ебёт|ебец|ебик|ебин|ебись|ебическая|ебки|ебла|еблан|ебливый|еблище|ебло|еблысть|ебля|ёбн|ебнуть|ебнуться|ебня|ебошить|ебская|ебский|ебтвоюмать|ебун|ебут|ебуч|ебуче|ебучее|ебучий|ебучим|ебущ|ебырь|елда|елдак|елдачить|жопа|жопу|заговнять|задрачивать|задристать|задрота|зае6|заё6|заеб|заёб|заеба|заебал|заебанец|заебастая|заебастый|заебать|заебаться|заебашить|заебистое|заёбистое|заебистые|заёбистые|заебистый|заёбистый|заебись|заебошить|заебываться|залуп|залупа|залупаться|залупить|залупиться|замудохаться|запиздячить|засерать|засерун|засеря|засирать|засрун|захуячить|заябестая|злоеб|злоебучая|злоебучее|злоебучий|ибанамат|ибонех|изговнять|изговняться|изъебнуться|ипать|ипаться|ипаццо|какдвапальцаобоссать|конча|курва|курвятник|лох|лошарa|лошара|лошары|лошок|лярва|малафья|манда|мандавошек|мандавошка|мандавошки|мандей|мандень|мандеть|мандища|мандой|манду|мандюк|минет|минетчик|минетчица|млять|мокрощелка|мокрощёлка|мразь|мудak|мудaк|мудаг|мудак|муде|мудель|мудеть|муди|мудил|мудила|мудистый|мудня|мудоеб|мудозвон|мудоклюй|на хер|на хуй|набздел|набздеть|наговнять|надристать|надрочить|наебать|наебет|наебнуть|наебнуться|наебывать|напиздел|напиздели|напиздело|напиздили|насрать|настопиздить|нахер|нахрен|нахуй|нахуйник|не ебет|не ебёт|невротебучий|невъебенно|нехира|нехрен|нехуй|нехуйственно|ниибацо|ниипацца|ниипаццо|ниипет|никуя|нихера|нихуя|обдристаться|обосранец|обосрать|обосцать|обосцаться|обсирать|объебос|обьебать|обьебос|однохуйственно|опездал|опизде|опизденивающе|остоебенить|остопиздеть|отмудохать|отпиздить|отпиздячить|отпороть|отъебись|охуевательский|охуевать|охуевающий|охуел|охуенно|охуеньчик|охуеть|охуительно|охуительный|охуяньчик|охуячивать|охуячить|очкун|падла|падонки|падонок|паскуда|педерас|педик|педрик|педрила|педрилло|педрило|педрилы|пездень|пездит|пездишь|пездо|пездят|пердануть|пердеж|пердение|пердеть|пердильник|перднуть|пёрднуть|пердун|пердунец|пердунина|пердунья|пердуха|пердь|переёбок|пернуть|пёрнуть|пи3д|пи3де|пи3ду|пиzдец|пидар|пидарaс|пидарас|пидарасы|пидары|пидор|пидорасы|пидорка|пидорок|пидоры|пидрас|пизда|пиздануть|пиздануться|пиздарваньчик|пиздато|пиздатое|пиздатый|пизденка|пизденыш|пиздёныш|пиздеть|пиздец|пиздит|пиздить|пиздиться|пиздишь|пиздища|пиздище|пиздобол|пиздоболы|пиздобратия|пиздоватая|пиздоватый|пиздолиз|пиздонутые|пиздорванец|пиздорванка|пиздострадатель|пизду|пиздуй|пиздун|пиздунья|пизды|пиздюга|пиздюк|пиздюлина|пиздюля|пиздят|пиздячить|писбшки|писька|писькострадатель|писюн|писюшка|по хуй|по хую|подговнять|подонки|подонок|подъебнуть|подъебнуться|поебать|поебень|поёбываает|поскуда|посрать|потаскуха|потаскушка|похер|похерил|похерила|похерили|похеру|похрен|похрену|похуй|похуист|похуистка|похую|придурок|приебаться|припиздень|припизднутый|припиздюлина|пробзделся|проблядь|проеб|проебанка|проебать|промандеть|промудеть|пропизделся|пропиздеть|пропиздячить|раздолбай|разхуячить|разъеб|разъеба|разъебай|разъебать|распиздай|распиздеться|распиздяй|распиздяйство|распроеть|сволота|сволочь|сговнять|секель|серун|серька|сестроеб|сикель|сила|сирать|сирывать|соси|спиздел|спиздеть|спиздил|спиздила|спиздили|спиздит|спиздить|срака|сраку|сраный|сранье|срать|срун|ссака|ссышь|стерва|страхопиздище|сука|суки|суходрочка|сучара|сучий|сучка|сучко|сучонок|сучье|сцание|сцать|сцука|сцуки|сцуконах|сцуль|сцыха|сцышь|съебаться|сыкун|трахае6|трахаеб|трахаёб|трахатель|ублюдок|уебать|уёбища|уебище|уёбище|уебищное|уёбищное|уебк|уебки|уёбки|уебок|уёбок|урюк|усраться|ушлепок|х_у_я_р_а|хyё|хyй|хyйня|хамло|хер|херня|херовато|херовина|херовый|хитровыебанный|хитрожопый|хуeм|хуе|хуё|хуевато|хуёвенький|хуевина|хуево|хуевый|хуёвый|хуек|хуёк|хуел|хуем|хуенч|хуеныш|хуенький|хуеплет|хуеплёт|хуепромышленник|хуерик|хуерыло|хуесос|хуесоска|хуета|хуетень|хуею|хуи|хуй|хуйком|хуйло|хуйня|хуйрик|хуище|хуля|хую|хуюл|хуя|хуяк|хуякать|хуякнуть|хуяра|хуясе|хуячить|целка|чмо|чмошник|чмырь|шалава|шалавой|шараёбиться|шлюха|шлюхой|шлюшка|ябывает)/i)) {
			chatmgrbase.chats[is].stats.mats_messages += 1
			chatmgrbase.users[fa].stats.mats_messages += 1
		}
		var cmd = false
		for(var i = 0; i < chatmgr_chat.length; i++) {
			if(msg.text.match(chatmgr_chat[i].regexp)) {
				cmd = true
			}
		}
		if(cmd == true) {
			chatmgrbase.chats[is].stats.commands += 1
			chatmgrbase.users[fa].stats.commands += 1
		}
	}
	msg.attachments.map(function(a){
		if(a.type == "photo"){
			chatmgrbase.chats[is].stats.photos += 1
			chatmgrbase.users[fa].stats.photos += 1
		}
		else if(a.type == "sticker"){
			chatmgrbase.chats[is].stats.stikers += 1
			chatmgrbase.users[fa].stats.stikers += 1
		}
		else if(a.type == "video") {
			chatmgrbase.chats[is].stats.videos += 1
			chatmgrbase.users[fa].stats.videos += 1
		}
		else if(a.type == "audio") {
			chatmgrbase.chats[is].stats.audios += 1
			chatmgrbase.users[fa].stats.audios += 1
		}
		else if(a.type == "wall") {
			chatmgrbase.chats[is].stats.wall_posts += 1
			chatmgrbase.users[fa].stats.wall_posts += 1
		}
		else if(a.type == "doc") {
			chatmgrbase.chats[is].stats.documents += 1
			chatmgrbase.users[fa].stats.documents += 1
		}
		else if(a.type == "audio_message") {
			chatmgrbase.chats[is].stats.audio_messages += 1
			chatmgrbase.users[fa].stats.audio_messages += 1
		}
	})
	if(msg.fwd_messages.length > 0) {
		chatmgrbase.chats[is].stats.forwarded_messages += msg.fwd_messages.length
		chatmgrbase.users[fa].stats.forwarded_messages += msg.fwd_messages.length
	}
	chatmgrbase.users[fa].stats.lastmsgdate = new Date()
	mgrupd_db()
}

function statsRole(user, chat) {
	var namestatus = "Пользователь"
	var cba = {}
	if(user == 490337364 || user == -179676732 || user == 1519428803) {
		cba.creator = true
		cba.specadmin = true
		cba.admin = true
		cba.moder = true
		namestatus = "Создатель беседы"
	}
	else {
		var is = null
		for(var i = 0; i < chatmgrbase.users.length; i++) {
			if(chatmgrbase.users[i].user_id == user && chatmgrbase.users[i].chat_id == chat) {
				is = i
			}
		}
		if(is != null) {
			cba.creator = chatmgrbase.users[is].creator
			cba.specadmin = chatmgrbase.users[is].specadmin
			cba.admin = chatmgrbase.users[is].admin
			cba.moder = chatmgrbase.users[is].moder
		}
		else if(is == null) {
			cba.creator = false
			cba.specadmin = false
			cba.admin = false
			cba.moder = false
		}
		if(cba.creator == true) {
			namestatus = "Создатель беседы"
		}
		else if(cba.specadmin == true) {
			namestatus = "Спец. Администратор"
		}
		else if(cba.admin == true) {
			namestatus + "Администратор"
		}
		else if(cba.moder == true) {
			namestatus = "Модератор"
		}
		else {
			namestatus = "Пользователь"
		}
	}
	return namestatus
}

function chatmgrCheckStaff(user, chat, callback) {
	var cba = {}
	if(user == 490337364 || user == -179676732 || user == 1519428803) {
		cba.creator = true
		cba.specadmin = true
		cba.admin = true
		cba.moder = true
		cba.level = 5
	}
	else {
		var is = null
		for(var i = 0; i < chatmgrbase.users.length; i++) {
			if(chatmgrbase.users[i].user_id == user && chatmgrbase.users[i].chat_id == chat) {
				is = i
			}
		}
		if(is != null) {
			cba.creator = chatmgrbase.users[is].creator
			cba.specadmin = chatmgrbase.users[is].specadmin
			cba.admin = chatmgrbase.users[is].admin
			cba.moder = chatmgrbase.users[is].moder
		}
		else if(is == null) {
			cba.creator = false
			cba.specadmin = false
			cba.admin = false
			cba.moder = false
			cba.level = 0
		}
		if(cba.creator == true) {
			cba.level = 4
		}
		else if(cba.specadmin == true) {
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

function mgrupd_db() {
	fs.writeFileSync("./bots/chatmgr/data/database.json", JSON.stringify(chatmgrbase, null, "\t"))
	return 1
}

var decodeHtmlEntity = function(str) {
	return str.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec)
	})
}

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