message.user = users.find(x=> x.id === message.senderId); 
if(message.referralSource && message.referralValue) { 
if(message.referralSource && message.referralValue == message.senderId) return message.send(`⚠ Вы не можете активировать своё приглашение.`); 
if(message.user.ref) return message.send(`⚠ Вы уже активировали приглашение.`); 

var ui = Number(message.referralSource); 
var user = await users.find(x=> x.id === ui); 
if(!user) return message.send(`⚠ Игрок не найден.`); 

user.fer += 1; 
vk.api.call("messages.send", { user_id: user.id, random_id: Math.random() * 99999, message: `✅ Ваш @id${message.senderId} (друг) активировал вашу реферальную ссылку, Вам было начисленно 100.000$` }); 
user.balance += 100000; 

message.send(`✅ Вы успешно активировали приглашение [id${user.vk}|друга], Вам было начисленно 150.000$ `); 
message.user.balance += 150000; 
message.user.ref = message.referralSource; 
} 

cmd.hear(/^(?:рефка|реф|реферал)$/i, async (message, bot) => { 
let ref = `https://vk.me/public184781908?ref=${message.senderId}&ref_source=${message.senderId}`; 
let refka = await vk.api.call('utils.getShortLink', { url: ref }); 

return message.send(`💻 Ваша реферальная ссылка - ${refka.short_url}\n🍒 Уже активировали: ${message.user.fer}`); 
});