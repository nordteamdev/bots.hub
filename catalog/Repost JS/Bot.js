const {VK, Keyboard} = require('vk-io');
const fs = require("fs"); 


const rep = require("./base/rep.json");  
setInterval(function(){
	fs.writeFileSync("./base/rep.json", JSON.stringify(rep, null, "\t"))    
}, 1500);

const vk = new VK();
const str = new VK();
const {updates} = vk;

vk.setOptions({
	token: '', // токен ГРУППЫ
	apiMode: 'parallel', 
	pollingGroupId: 1 // ИД группы (цифровой) - заменить цифру 1
}); 


vk.updates.use(async (message, next) => {  
	////////////////////////
	if (message.is("message") && message.isOutbox) {return} 
	message.user = message.senderId; message.text = message.payload.text;  if (!message.text) return; 
	////////////////////////
	try { await next(); } catch (err) { console.error(err) }
});


// Ввод ид'a' поста для проверки

vk.updates.hear(/^(?:пост)\s?([0-9]+)?/i, (message) => { 
	if(!message.$match[1]) return message.send('Введите ИД поста')
	if(rep[message.$match[1]]) return message.send('Вы уже запускали раздачу для этого поста')

	rep[message.$match[1]] = {
		users: {},
		stats: false
	}

	setTimeout(() => {
		rep[message.$match[1]].stats = true;
	}, 600000); // Таймер. Через 10 минут статус станет true и раздача закончится.

	return message.send(`Вы запустили раздачу за репост на 10 минут`);
})

setInterval(function(){
	for(i in rep){
		if(rep[i] && rep[i].stats == true){

			token_str = '' // ТОКЕН СТРАНИЦЫ ТВОЕЙ
			str.setOptions({token: token_str, call: "execute" }); 
			str.updates.startPolling();

			str.api.call('wall.getReposts', {  owner_id: '-157161445', post_id: Number(i), count: 300 }).then(res => { 
				id = [];
				for(i in res.profiles){
					id.push(res.profiles[i].id)
				}
				
				for(z in id){
					acc.users[z].balance += 1000; // Выдача суммы на нужный ID
				}
				
				console.log(id)
				delete rep[i] // Удаление поста из базы
			})  
		}
	}    
}, 60000);

//////////////////////////////////////////////////////////////////////////////////////////////

async function run() {
	await vk.updates.startPolling();
    console.log('Bot actived');  
}

run().catch(console.error);

 