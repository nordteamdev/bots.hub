const {VK, Keyboard} = require('vk-io');
const vk = new VK();
const {updates} = vk;
const fs = require("fs");
const users = require("./users.json");
const uid = require("./uid.json");


 

vk.setOptions({
    token: 'токен', apiMode: 'parallel', pollingGroupId: 2});

vk.updates.use(async (message, next) => {
	if(/\[clubID\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[clubID\|(.*)\]/ig, '').trim();
  
    if (message.is("message") && message.isOutbox)
    return;	
 
    message.user = message.senderId;
    message.text = message.payload.text;  

    if (!message.text) return;
 
    if(!uid[message.user]){
	 	users.number += 1;
		let numm = users.number;
		uid[message.user] = {
			id: numm
		}

 		let id = user_id(message.user); 
 		 
	 	vk.api.users.get({ user_id: message.senderId}).then((res) => {
		var e = res[0];
		users.accs[numm] = {
            ban: false,
            parthner: false,
            online: false,
            male: "Test",
            sex: e.sex,
            ids: message.senderId,
            ida: user_id(message.user),
            parta: false 
		}
		message.send(`${e.sex}`)

	})
}
	let id = user_id(message.user);

    
    vk.updates.hear(/^eval\s([^]+)/i, (message) => {  
		if (message.senderId == 1 ) {
			return message.send(`${eval(message.$match[1])}`);
		}
	});

    try {
        await next();
    } catch (err) { console.error(err) }
});


vk.updates.hear(/^(?:Поиск собеседника)$/i,  (message) => {
if(users.accs[user_id(message.user)].parthner != false) return message.send(`✖ У Вас уже есть собеседник\n❓ Чтобы покинуть чат, напишите: <<Покинуть>>`,
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Покинуть" 
}, 
"color": "negative" 
}],
] 
})
})	
message.send(`⌛ Идет поиск собеседника..`)
users.accs[user_id(message.user)].online = 1
		for(i=0;i<200000;i++){
			if(users.accs[i]){
			if(users.accs[i].ids != users.accs[user_id(message.user)].ids && users.accs[i].parthner == false && users.accs[i].online == 1){		
			    users.accs[i].online = 2
			    users.accs[i].parthner = message.senderId
			    users.accs[user_id(message.user)].parthner = users.accs[i].ids
			    users.accs[user_id(message.user)].online = 2
			    users.accs[i].parta = user_id(message.user)
			    users.accs[user_id(message.user)].parta = users.accs[i].ida  
				vk.api.call("messages.send", { peer_id: users.accs[i].ids, random_id: 0, message: `🔔 С Вами завели чат, общайтесь\n❓ Чтобы покинуть его, напишите: <<Покинуть>>`,
				keyboard: JSON.stringify( 
					{ 
						"one_time": false, 
						"buttons": [ 
						[{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Покинуть` 
							}, 
							"color": "negative"
						}]
						] 
					})
					}) 
				return message.send(`🔔 Собеседник найден, общайтесь\n❓ Чтобы покинуть чат, напишите: <<Покинуть>>`,
					{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Покинуть" 
}, 
"color": "negative" 
}],
] 
})
})
			
		}
		}
		}
	});

vk.updates.hear(/^(?:Покинффффффуть)$/i,  (message) => {
return message.send(`${message.sex}`)	
})
vk.updates.hear(/^(?:Покинуть)$/i,  (message) => {
if(users.accs[user_id(message.user)].parthner == false) return message.send(`😸 Для начала найдите собеседника\n❓ Чтобы завести диалог, нажмите на кнопку ниже`,
	{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Поиск собеседника" 
}, 
"color": "positive" 
}],
] 
})
})

vk.api.call("messages.send", { peer_id: users.accs[user_id(message.user)].parthner, random_id: 0, message: `😥 Собеседник покинул диалог\n❓ Напишите: <<Поиск>>, чтобы найти нового собеседника`,
keyboard: JSON.stringify( 
					{ 
						"one_time": false, 
						"buttons": [ 
						[{ 
							"action": { 
								"type": "text", 
								"payload": "{\"button\": \"1\"}", 
								"label": `Поиск собеседника` 
							}, 
							"color": "positive"
						}]
						] 
					})
					}) 
let user = users.accs[user_id(message.user)]
users.accs[user.parta].online = 0
users.accs[user.parta].parthner = false
users.accs[user.parta].parta = false
user.parthner = false
user.parta = false
user.online = 0


return message.send(`❎ Вы успешно покинули диалог\n❓ Чтобы завести новый диалог, нажмите на кнопку ниже`,
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Поиск собеседника" 
}, 
"color": "positive" 
}],
] 
})
})
});	

vk.updates.hear(/^([^]+)/i, (message) => { 
if(users.accs[user_id(message.user)].parthner == false) return message.send(`😸 Для начала найдите собеседника\n❓ Чтобы завести диалог, нажмите на кнопку ниже`, 
{ 
keyboard:JSON.stringify( 
{ 
"one_time": false, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\": \"2\"}", 
"label": "Поиск собеседника" 
}, 
"color": "positive" 
}],
] 
})
})
vk.api.call("messages.send", { peer_id: users.accs[users.accs[user_id(message.user)].parta].ids , random_id: 0, message: `${message.$match[0]}` })
}); 

async function run() {
    await vk.updates.startPolling();
    console.log('Chat - on');
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

	 
	 setInterval(() =>{ 
    for(i=1;i<200000;i++){ 
        if(users.accs[i]){ 
        if(users.accs[i].online == 1){
        users.accs[i].online = 0
        vk.api.call("messages.send", { peer_id: users.accs[i].ids , random_id: 0, message: `❌Собеседник не найден.` })

 } 
 } 
} 
  }, 1); 	 

setInterval(function(){
	fs.writeFileSync("./users.json", JSON.stringify(users, null, "\t")) 
	fs.writeFileSync("./uid.json", JSON.stringify(uid, null, "\t"))  
}, 3500);
