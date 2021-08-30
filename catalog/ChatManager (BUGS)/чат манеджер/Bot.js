const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs"); 
const acc = require("./base/acc.json");
const tokens = require("./base/tokens.json");  //===================SLIT BY BOTSSOFT

setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t"))  
	fs.writeFileSync("./base/tokens.json", JSON.stringify(tokens, null, "\t"))    
}, 1500);

//////////////////////////////////////////////////////////////////////////////////////////////

vk.setOptions({
	token: tokens.token,
	apiMode: 'parallel',
	pollingGroupId: tokens.id
}); 

vk.updates.use(async (message, next) => {  
	if (message.is("message") && message.isOutbox) {return;}

	// Передаем инфу о юзере в message, для удобства
	message.user = message.senderId; message.text = message.payload.text;  
	if (!message.text) return;

	// Проверка существует ли пользователь в базе, если нет - создаем
	new_acc(message.user);
	
	if(acc.users[message.user].ban == true) {return;} // Проверка на заблокированный аккаунт.

	try { await next(); } catch (err) { console.error(err) }
});


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
					 	
vk.updates.hear(/^(?:помощь)/i, (message) => { 
	let user = acc.users[message.user];

	return message.send(`
		🔸 Помощь - функции бота.
		🔸 бот - проверка работоспособности.
		🔸 kick [ID] - кикнуть юзера из беседы.
		🔸 addmoder [ID] - назначить юзера модератором.
		🔸 removemoder [ID] - забрать модератора у юзера.
		🔸 warn [ID] - выдать предупреждение.
		(После 3-х предупреждений - дается бан)
		🔸 unwarn [ID] - снять все предупреждения.

		🔸 Онлайн - онлайн беседы.
		🔸 Состав - все модераторы/админы
		- - - - 
		[ID] - Это ссылка юзера ВКонтакте.
		Писать без скобок.
	`);
});

vk.updates.hear(/^(?:бот)/i, (message) => { 
	return message.send(`&#129302;`);
});

vk.updates.hear(/^(?:kick)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[message.user];
	if(user.admin_level < 1) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_acc(res.object_id);
		if(acc.users[res.object_id].admin_level == 2) return message.reply('⚠ ➾ Отказ'); 
		vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
		.catch((error) => {return message.send(`Error.`);
		});  
		return  
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		new_acc(message.$match[3]);
		if(acc.users[message.$match[3]].admin_level == 2) return message.reply('⚠ ➾ Отказ'); 
		vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.$match[3] }).
		catch((error) => {return message.send(`Error.`);}); 
		return  				
	} 
});

vk.updates.hear(/^(?:addmoder)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[message.user];
	if(user.admin_level < 2) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_acc(res.object_id);
		if(acc.users[res.object_id].admin_level == 2) return;
		acc.users[res.object_id].admin_level = 1;
		return message.send(`⚠ ➾ Вы назначили vk.com/id${res.object_id} модератором.`);
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		new_acc(message.$match[3]);
		if(acc.users[message.$match[3]].admin_level == 2) return;
		acc.users[message.$match[3]].admin_level = 1;
		return message.send(`⚠ ➾ Вы назначили vk.com/id${message.$match[3]} модератором.`);
	} 
});
 
vk.updates.hear(/^(?:removemoder)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[message.user];
	if(user.admin_level < 2) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_acc(res.object_id);
		if(acc.users[res.object_id].admin_level == 2) return; 
		acc.users[res.object_id].admin_level = 0;
		return message.send(`⚠ ➾ Вы забрали у vk.com/id${res.object_id} модератора.`);
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		new_acc(message.$match[3]);
		if(acc.users[message.$match[3]].admin_level == 2) return;
		acc.users[message.$match[3]].admin_level = 0;
		return message.send(`⚠ ➾ Вы забрали у vk.com/id${message.$match[3]} модератора.`);
	} 
});

vk.updates.hear(/^(?:warn)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[message.user];
	if(user.admin_level < 2) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_acc(res.object_id);
		if(acc.users[res.object_id].admin_level == 2) return; 
		acc.users[res.object_id].warn += 1;
		if(acc.users[res.object_id].ban == true) return message.send(`⚠ ➾ Пользователь уже заблокирован.`);
		if(acc.users[res.object_id].warn >= 3){
			acc.users[res.object_id].warn = 0;
			acc.users[res.object_id].ban = true;
			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id })
			.catch((error) => {return message.send(`Error.`);
			});
			return message.send(`⚠ ➾ Пользователь vk.com/id${res.object_id} заблокирован.`);
		}else{
			return message.send(`⚠ ➾ Вы выдали предупреждение vk.com/id${res.object_id}.\n⚠ ➾ После 3-х предупреждений - выдается бан.`);
		}

		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		new_acc(message.$match[3]);
		acc.users[message.$match[3]].warn += 1;
		if(acc.users[message.$match[3]].ban == true) return message.send(`⚠ ➾ Пользователь уже заблокирован.`);

		if(acc.users[message.$match[3]].warn >= 3){
			acc.users[message.$match[3]].warn = 0;
			acc.users[message.$match[3]].ban = true;
			vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.$match[3] })
			.catch((error) => {return message.send(`Error.`);
			});
			return message.send(`⚠ ➾ Пользователь vk.com/id${message.$match[3]} заблокирован.`);
		}else{
			return message.send(`⚠ ➾ Вы выдали предупреждение vk.com/id${message.$match[3]}.\n⚠ ➾ После 3-х предупреждений - выдается бан.`);
		}
	} 
});

vk.updates.hear(/^(?:unwarn)(\s?https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 
	let user = acc.users[message.user];
	if(user.admin_level < 2) return;

	if(message.$match[4]) { 
		var domain = message.$match[4].split(" "); 
		vk.api.call("utils.resolveScreenName", { 
		screen_name: message.$match[4] 
	}).then((res) => { 
		new_acc(res.object_id);
		if(acc.users[res.object_id].admin_level == 2) return; 
		acc.users[res.object_id].warn = 0;
		return message.reply(`⚠ ➾ Вы сняли все варны у vk.com/id${res.object_id}`); 
		})  
	}else{
		if(!message.$match[3]) return message.reply("⚠ ➾ ID не указан, либо указан неверно."); 
		new_acc(message.$match[3]);
		acc.users[message.$match[3]].warn = 0;
		return message.reply(`⚠ ➾ Вы сняли все варны у vk.com/id${message.$match[3]}`);
	} 
});

vk.updates.hear(/^(?:состав)/i, (message) => { 
	let text = '';
	for(i in acc.users){
		if(acc.users[i].admin_level >= 1){
			text += `vk.com/id${i} - moderator/admin`
		}
	}
	return message.send(text);
});
 
vk.updates.hear(/^(?:онлайн)/i, (message) => { 

	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId, 
		fields: "online"
	}).then(function(res){
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `🔸 [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}]\n`
			}
		} 
		text += '⚠ Привлекаю ваше внимание!'
		return message.send(text)
    })

	function check(status){
    	if(status == 1) return "online"
    	if(status == 0) return "offline"
	}
}); 

async function run() {
	await vk.updates.startPolling();
	console.log('Bot started');  
}

run().catch(console.error);

vk.updates.hear(/^(?:!актив)/i, (message) => { 
function new_acc(id){
	if(!acc.users[id]){
		acc.users[id] = {
			admin_level: 0,
			ban: false,
			warn: 0
		}
	}
}