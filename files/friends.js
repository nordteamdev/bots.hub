let info = {
    vers: 1.87,
    author: 'vk.com/id305429096'
}
function deletenull(array) {
	return array.filter(x=> x != null);
}

cmd.hear(/^(?:др запрос)\s?([0-9]+)?/i, async (message) => {
if(message.user.uid == message.args[1]) return message.send('вы указали свой ID!')
	if(!message.args[1]) return message.send('введите: Др запрос <ид>');
		if(!users.find(x=> x.uid == message.args[1])) return message.send('игрок не найден');
			users.find(x=> x.uid == message.args[1]).friend.request.push(Number(message.user.uid));
				await vk.api.messages.send({ user_id: users.find(x=> x.uid == message.args[1]).id, message: `🆕 Новая заявка в друзья:\n  👤 Игрок: @id${message.user.id} (${message.user.tag})\n  💡 Принять заявку: 'Др принять ${message.user.uid}', Отклонить: 'Др отклонить ${message.user.uid}'`, keyboard: JSON.stringify({
					"one_time": false,
					"inline": true,
					"buttons": [
				[{
					"action": {
					"type": "text",
					"payload": "{\"button\": \"1\"}",
					"label": `✅ Др Принять ${message.user.uid}`
					},
					"color": "positive"
					},
					{
					"action": {
					"type": "text",
					"payload": "{\"button\": \"2\"}",
					"label": `❌ Др отклонить ${message.user.uid}`
					},
					"color": "negative"
				}]
					]
			})});
			message.user.friend.prequest.push(Number(message.args[1]))
				return message.send(`успешно: @id${users.find(x=> x.uid == message.args[1]).id} (игроку) был отправлен запрос в друзья`);
});

cmd.hear(/^(?:др принять|✅ Др Принять)\s?([0-9]+)?/i, async (message) => {
		if(!message.args[1]) return message.send('введите: Др принять <ид>');
	if(message.user.uid == message.args[1]) return message.send('вы указали свой ID!')
let user = users.find(x=> x.uid == message.args[1])	
  if(!user) return message.send('игрок не найден')
	if(!message.user.friend.request.find(x=> x == message.args[1])) return message.send('этот игрок вам не предлагал дружбу!');
		if(message.user.friend.friends.find(x=> x == message.args[1])) return message.send('этот игрок уже у вас в друзьях!');
			message.user.friend.friends.push(user.uid)
			 user.friend.friends.push(Number(message.user.uid))
				 await vk.api.messages.send({ user_id: user.id, message: `🆕 Новое уведомление:\n  ➡ Игрок @id${message.user.id} (${message.user.tag}) принял вашу заявку в друзья`});
					delete user.friend.prequest[user.friend.prequest.indexOf(message.user.uid)]
						user.friend.prequest = deletenull(user.friend.prequest);
							delete message.user.friend.request[message.user.friend.request.indexOf(user.uid)]
								message.user.request = deletenull(message.user.friend.request);
					 				return message.send(`заявка в друзья от @id${user.id} (пользователя) принята!`);
});

cmd.hear(/^(?:др отклонить|❌ Др отклонить)\s?([0-9]+)?/i, async (message) => {
  if(!message.args[1]) return message.send('введите: Др отклонить <ид>');
if(message.user.uid == message.args[1]) return message.send('вы указали свой ID!')
 let user = users.find(x=> x.uid == message.args[1])	
  if(!user) return message.send('игрок не найден')	
	if(!message.user.friend.request.find(x=> x == message.args[1])) return message.send('этот игрок вам не предлагал дружбу!');
		delete message.user.friend.request[message.user.friend.request.indexOf(Number(message.args[1]))]
			delete user.friend.prequest[user.friend.prequest.indexOf(Number(message.user.uid))]
				message.user.friend.request = deletenull(message.user.friend.request)
			    	user.friend.prequest = deletenull(user.friend.prequest)
				await vk.api.messages.send({ user_id: user.id, message: `🆕 Новое уведомление:\n  ➡ Игрок @id${message.user.id} (${message.user.tag}) отклонил вашу заявку в друзья`});
			delete user.friend.prequest[user.friend.prequest.indexOf(message.user.uid)]
		user.friend.prequest = deletenull(user.friend.prequest);				 
	return message.send(`заявка в друзья от @id${user.id} (пользователя) отклонена!`);
});

cmd.hear(/^(?:др список)/i, async (message) => {
let uf = message.user.friend	
	let friends = ``
		let activs = ``
			let activp = ``
	message.user.friend.friends.map(x=>{
		friends += `@id${users.find(a=>a.uid == x).id} (${users.find(a=>a.uid == x).tag}) [${users.find(a=>a.uid == x).uid}],`
	});
		message.user.friend.request.map(x=>{
			activs += `@id${users.find(a=>a.uid == x).id} (${users.find(a=>a.uid == x).tag}) [${users.find(a=>a.uid == x).uid}],`
		});
			message.user.friend.prequest.map(x=>{
				activp += `@id${users.find(a=>a.uid == x).id} (${users.find(a=>a.uid == x).tag}) [${users.find(a=>a.uid == x).uid}],`
			});
	return message.send(`📒| Список:
	👤 Ваши друзья: ${!friends ? 'список пуст' : friends} 
	📥 Активные заявки в друзья: ${!activs ? 'список пуст' : activs} 
	📤 Ваши заявки в друзья: ${!activp ? 'список пуст' : activp} `);
});

cmd.hear(/^(?:др удалить)\s?([0-9]+)?/i, async (message) => {
			if(!message.args[1]) return message.send('введите: Др удалить <ид>');	
		let user = users.find(x=> x.uid == message.args[1])	
	if(!user) return message.send('игрок не найден')		
if(message.user.uid == message.args[1]) return message.send('вы указали свой ID!')	
	if(!message.user.friend.friends.find(x=>x == message.args[1])) return message.send('пользователя нету в друзьях!');
		delete message.user.friend.friends[message.user.friend.friends.indexOf(Number(message.args[1]))]
			message.user.friend.friends = deletenull(message.user.friend.friends)
				delete user.friend.friends[user.friend.friends.indexOf(Number(message.user.uid+1))]
					users.find(x=>x.uid == message.args[1]).friend.friends = deletenull(users.find(x=>x.uid == message.args[1]).friend.friends)
						return message.send(`вы удалили @id${users.find(x=>x.uid == message.args[1]).id} (пользователя) из друзей`);
							});

cmd.hear(/^(?:др помощь)/i, async (message) => {
	return message.send(`👤| Список команд:
	📤 Др запрос <ид> - отправить запрос 
	✅ Др принять <ид> - принять заявку 
	❌ Др отклонить <ид> - отклонить заявку 
	📝 Др список - список 
	🚫 Др удалить <ид> - удалить друга`) 
});