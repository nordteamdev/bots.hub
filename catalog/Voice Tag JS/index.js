//================================ 
const { VK } = require('vk-io');
const req = require('request');
const asr = require('./client');
//================================ 
const vk = new VK({
	token: "token_group"
})
const { updates, snippets } = vk;
//================================ 

updates.on("message", async (context, next)=>{
if(context.attachments.length > 0){
if(typeof context.attachments[0].url !== 'undefined' && context.attachments[0].url !== null && context.attachments.length > 0){ 
var audio = await req.get(context.attachments[0].url); 
var api = await vk.api.users.get({user_id: context.senderId, fields: "sex"});
try { 
var text = await asr(audio); 
} 
catch (e) { 
return;
} 
if (typeof text !== 'undefined' && text !== null && text.length > 1) {
var name = `@id${context.user} (${api[0].first_name} ${api[0].last_name})`; 
var time = context.attachments[0].duration; 
var url = context.attachments[0].url; 
var pol = api[0].sex; 
if (pol == 1) { 
return context.reply(`🙎‍♀ ${name} 

🔶 Сказала: ${text} 
🔶 ${time} секунд`); 
} 
if (pol == 2) { 
return context.reply(`🙎‍♂ ${name} 

🔷 Сказал: ${text} 
🔷 ${time} секунд`); 
} 
}else return context.send(`⛔ Не удалось распознать голосовое сообщение`);
}
}
try{
await next();
}catch(e){
throw e;
}
});

//================================ 
vk.updates.start().catch(console.error)
.then(() => {
	console.log(`[BODRED] Bot active.`)
});
//================================ 