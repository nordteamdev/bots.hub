const {VK} = require('vk-io'); 
const { createCanvas, loadImage} = require('canvas')
const {Keyboard} = require('vk-io');
const vk = new VK(); 
const {updates, api, snippets} = vk; 
const fs = require('fs');
const chalk = require('chalk');
const chats = require('./chats.json')
const chattest = require('./chattest.json')
const basa = new Array(chats);
const moment = require('moment');
const request = require('request-promise')
const managerid = 189830975;

/*=========================================================================================*/

vk.setOptions({ 
token: "А ВОТ ИДИ НАХУЙ ТУТ НЕТУ ТОКЕНА", 
apiMode: "parallel", 
pollingGroupId: 189830975
});

/*=========================================================================================*/

setInterval(function(){ 
        fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t")) 
}, 10000); // обновление базы данных
setInterval(function(){ 
        fs.writeFileSync("./chattest.json", JSON.stringify(chattest, null, "\t")) 
}, 10000); // обновление базы данных


/*=========================================================================================*/
const utils = { 
sp: (int) => { 
int = int.toString(); 
return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(',').split('').reverse().join(''); 
}, 
rn: (int, fixed) => { 
if (int === null) return null; 
if (int === 0) return '0'; 
fixed = (!fixed || fixed < 0) ? 0 : fixed; 
let b = (int).toPrecision(2).split('e'), 
k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), 
c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed), 
d = c < 0 ? c : Math.abs(c), 
e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k]; 

e = e.replace(/e/g, ''); 
e = e.replace(/\+/g, ''); 
e = e.replace(/Infinity/g, 'ДОХЕРА'); 

return e; 
}, 
gi: (int) => { 
int = int.toString(); 

let text = ``; 
for (let i = 0; i < int.length; i++) 
{ 
text += `${int[i]}⃣`; 
} 

return text; 
}, 
decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] }, 
random: (x, y) => { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}, 
pick: (array) => { 
return array[utils.random(array.length - 1)]; 
} 
}

function getRandomInRange(min, max) { 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}; //Функция выбора рандомного числа

var now = new Date();
function addZero(num) { return ('0' + num).slice(-2); }

function nols(num) {
    if(num < 10) return('0' + num)
    if(num > 9) return(num)
}

function find(array, value) { 
for (var i = 0; i < array.length; i++) { 
if (array[i] == value) return i; 
} 
return -1; 
};

setInterval(() => {
let chats = require('./chats.json');
require('fs').writeFileSync('./chats.json', JSON.stringify(chats, null, '\t'));
}, 10000);

setInterval(() => {
let chattest = require('./chattest.json');
require('fs').writeFileSync('./chattest.json', JSON.stringify(chattest, null, '\t'));
}, 10000);


fs.readFile('example_log.txt', function (err, logData) {});
updates.use(async (context, next) => {
    if (context.is("message") && context.isOutbox || context.is('message') && context.senderType == "group") return;
    if (context.text) {
        // Элементарный лог, @id -- айди пользователя, #id -- айди чата (если сообщение из чата)
        console.log(chalk.yellow(`@id${context.senderId} ${ context.isChat ? "#" + context.chatId : "" }, text: ${ context.text.slice(0, 360) }`));
    }


    if (!chats[context.chatId]) {
        
        let months = new Date().getMonth()
        let days = new Date().getDate()
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        let second = new Date().getSeconds()

        chats[context.chatId] = {
            reg: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
            ownerid: 0,
            rules: 0,
            maxwarns: 3,
            jointext: 0,
            botname: "бот",
            users: {}
        }
}
   if (!chats[context.chatId].users[context.senderId]) {
    const [user_info] = await vk.api.users.get({ user_id: context.senderId });
    chats[context.chatId].users[context.senderId] = {
            rank: 0,
            warns: 0,
            autokick: 0,
            vkid: context.senderId,
            banned: 0,
            name: `${user_info.first_name}`,
            muted: 0
        }
}
    if(chats[context.chatId].users[context.senderId].muted > 0) {
    const [user_info] = await vk.api.users.get({ user_ids: context.senderId}); 
    let b = user_info.id
context.send(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) написал сообщение при муте и исключается из беседы.`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: b}); 
    }
    if(chats[context.chatId].users[context.senderId].autokick > 0) {
    const [user_info] = await vk.api.users.get({ user_ids: context.senderId}); 
    let b = user_info.id
context.send(`Этот участник находится в автокике.
("Бот автокик- ${context.senderId}" для снятия)`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: b}); 
    }
context.user = chats[context.chtId];
    ctx = context;
try {

        await next();
 } catch (err) { console.error(chalk.red(err))
                error = `${error} \n \n ${err}`}
    require('fs').writeFileSync('./chats.json', JSON.stringify(chats, null, '\t'));
});



/*=========================================================================================*/

vk.updates.use(async (message, next) => {
    if (message.isOutbox) {
        return;
    }
    // комментарий оставь
    await next(); 
});
/*======================================Команды бота=======================================*/

vk.updates.on(['chat_invite_user'], async (context) => {
console.log(context.payload)
let proverka = `${context.payload.action.member_id}`
let g = -managerid
console.log(g)
if(proverka.includes(g)) {
return context.send(`Я не являюсь администратором данной беседы, из-за чего не могу работать в чате. 
После того как всё сделаете, обновите чат командой:
"бот обновить"`)
}
if(chats[context.chatId].jointext !== 0) {
    const [user_info] = await vk.api.users.get({ user_ids: proverka}); 
    let b = user_info.id
    context.send(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}), ${chats[context.chatId].jointext}`)
}

})

vk.updates.on(['chat_invite_user_by_link'], async (context) => {
console.log(context.payload)
let proverka = `${context.payload.action.member_id}`
let g = -managerid
console.log(g)
if(proverka.includes(g)) {
return context.send(`Я не являюсь администратором данной беседы, из-за чего не могу работать в чате. 
После того как всё сделаете, обновите чат командой:
"бот обновить"`)
}
if(chats[context.chatId].jointext !== 0) {
    const [user_info] = await vk.api.users.get({ user_ids: proverka}); 
    let b = user_info.id
    context.send(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}), ${chats[context.chatId].jointext}`)
}

})


updates.hear(/([^]+) выбери ([^]+) или ([^]+)/i, async (context) => {
    let random = rand([1,2,3,4,5])
    let one = context.$match[2]
    let two = context.$match[3]
    let smiles = rand([`🍏`,`🌚`,`🌿`,`🍃`,`✨`,`💭`,`💬`,`⚕`,`💨`,`🐤`,`🍀`,`🐼`,`🥚`,`🎯`])
    if(random == 1) return context.send(` ` + one + ` лучше чем ` + two + ` ` + smiles + ` `);
    if(random == 2) return context.send(` я выбираю ` + two + ` ` + smiles + ` `)
    if(random == 3) return context.send(` ` + two + ` звучит круче ` + smiles + ` `)
    if(random == 4) return context.send(` ` + two + ` лучше чем ` + one + ` ` + smiles + ` `)
    if(random == 5) return context.send(` я выбираю ` + one + ` ` + smiles + ` `)
});

updates.hear(/([^]+) инфо ([^]+)/i, async (context) => {
    let phrases = rand(['Вероятно, это', 'Это примерно ', 'Вероятность составляет '])
    let b = getRandomInRange(1, 100)
	const canvas = createCanvas(1000, 1000);
	const ctx = canvas.getContext('2d');
	
	ctx.font = '50px Helvitica';
	ctx.textAlign = 'center';
	ctx.fillText(`${phrases} ${b}%`, 500, 500);
	
	fs.writeFileSync('out.png', canvas.toBuffer());
	return context.sendPhoto(canvas.toBuffer());

});

updates.hear(/^(?:гиф|gif)\s(.*)$/i, async (message, bot) => {

	vk.api.call('docs.search', {q: message.$match[1] + '.gif', count: 10}) 
	.then(response => { 
		let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(','); 
		return message.send(`по вашему запросу [${message.$match[1]}], я нашлел следующие GIF Материалы:`, {attachment: items}) 
	}) 
});

updates.hear(/^(?:clear|очистить чат)/i, (message) => { 

 	message.send("&#4448;\n".repeat(200) + `😍❤ | Я очистил чат от лишних сообщений! | 😍❤`);
 	message.send({sticker_id:11246})
 });

updates.hear(/^(?:Стикер)\s?([0-9]+)?/i,  message => {
	if(!message.$match[1]) return message.send(`Укажите ID Стикера`);  
	message.send({
		sticker_id: message.$match[1]}).catch((error) => {return message.send(`😢 к сожалению, мой Владелец не купил мне ещё пак в котором будет стикер №${message.$match[1]}`)});
});

updates.hear(/^(?:qr)\s(.*)/i, async (message) => {
	const qr = require('qr-image');
	let qr_svg = qr.image(message.$match[1], { type: 'png' });
	qr_svg.pipe(require('fs').createWriteStream('qr.png'));
	var svg_string = qr.imageSync(message.$match[1], { type: 'png' });
	message.sendPhoto(svg_string)
});

updates.hear(/([^]+) инфа ([^]+)/i, async (context) => {
    let phrases = rand(['Вероятно, это', 'Это примерно ', 'Вероятность составляет '])
    let b = getRandomInRange(1, 100)
    
	const canvas = createCanvas(1000, 1000);
	const ctx = canvas.getContext('2d');
	
	ctx.font = '50px Helvitica';
	ctx.textAlign = 'center';
	ctx.fillText(`${phrases} ${b}%`, 500, 500);
	
	fs.writeFileSync('out.png', canvas.toBuffer());
	return context.sendPhoto(canvas.toBuffer());

});

updates.hear(/([^]+) кто ([^]+)/i, async (context) => {
    let phrases = rand(['Боже ж ты мой, о', 'Вполне вероятно, ', 'Вполне вероятно, ', 'Скорее всего, ', 'Открою страшную тайну,', 'Ай молодца,'])
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId, fields: "users"}); 
    b = rand(b.items)
    g = b.member_id

    const [user_info] = await vk.api.users.get({ user_ids: g}); 
	
	const canvas = createCanvas(1000, 1000);
	const ctx = canvas.getContext('2d');
	
	ctx.font = '50px Helvitica';
	ctx.textAlign = 'center';
	ctx.fillText(` ${phrases}${context.$match[2]} — \n ${user_info.first_name} ${user_info.last_name}`, 500, 500);
	
	fs.writeFileSync('out.png', canvas.toBuffer());
	return context.sendPhoto(canvas.toBuffer());

});


updates.hear(/([^]+) удалить правила/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
chats[context.chatId].rules = 0
return context.send(`Правила очищены.`)

try{ 
} catch (e){ 
} 
})

updates.hear(/([^]+) удалить приветствие/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
chats[context.chatId].jointext = 0
return context.send(`Приветствие очищено.`)

try{ 
} catch (e){ 
} 
})

updates.hear(/([^]+) новое приветствие ([^]+)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
chats[context.chatId].jointext = context.$match[2]
return context.send(`Новое приветствие установлено.`)

try{ 
} catch (e){ 
} 

})

updates.hear(/([^]+) новые правила ([^]+)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
chats[context.chatId].rules = context.$match[1]
return context.send(`Новые правила установлены.`)

try{ 
} catch (e){ 
} 
})

updates.hear(/([^]+) приветствие/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
if(chats[context.chatId].jointext == 0) return context.send(`Приветствие отсутствует.
Для создания приветствия команда <<Бот новоые приветствие (ваше приветствие новых участников)>>.`)
return context.send(`Текст приветствия: ${chats[context.chatId].jointext}`)
})


updates.hear(/([^]+) правила/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
if(chats[context.chatId].rules == 0) return context.send(`Правила отсутствуют.
Для создания правил команда "бот новые правила {ваши правила}".`)
return context.send(`Текст правил: ${chats[context.chatId].rules}`)
})
updates.hear(/([^]+) установить пред ([0-9]+)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
chats[context.chatId].users[user_info.id].maxwarns = Number(context.$match[2])
context.send(`Максимальное количество предупреждений установлено ${context.$match[2]}.`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: user_info.id}); 

} catch (e){ 
} 
})


updates.hear(/([^]+) (.*) ник (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}

chats[context.chatId].users[user_info.id].name = context.$match[3]
return context.send(`Пользователю *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) установлен новый ник`)


} catch (e){ 
} 
})

updates.hear(/([^]+) снять пред (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].warns < 1) return context.send(`У участника *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) отсутствуют предупреждения.`)
chats[context.chatId].users[user_info.id].warns = 0
return context.send(`Все предупреждения *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) сняты.`)


} catch (e){ 
} 
})


updates.hear(/([^]+) пред (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
chats[context.chatId].users[user_info.id].warns += Number(1)
if(chats[context.chatId].users[user_info.id].warns == chats[context.chatId].maxwarns) {
    context.send(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) получил максимальное предупреждение (${chats[context.chatId].maxwarns}/${chats[context.chatId].maxwarns}) и исключается из беседы.`)
    vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: user_info.id}); 
}
return context.send(`Было выдано предупреждение (${chats[context.chatId].users[user_info.id].warns}/${chats[context.chatId].maxwarns}) *id${user_info.id} (${user_info.first_name} ${user_info.last_name}).`)


} catch (e){ 
} 
})

updates.hear(/([^]+) бан- (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].banned < 1) return context.send(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) отсутствует в бане.`)
chats[context.chatId].users[user_info.id].banned = 0
context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) разбанен.`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: user_info.id}); 


} catch (e){ 
} 
})

updates.hear(/([^]+) бан (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].banned > 0) return context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) уже находится в бане.`)
chats[context.chatId].users[user_info.id].banned = 50
context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) был заблокирован.`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: user_info.id}); 


} catch (e){ 
} 
})

updates.hear(/^(?:([^]+) преды)$/i, (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = [] // создание масива

    for (let i in chats[context.chatId].users){// перебор базы данных
        if(chats[context.chatId].users[i].warns !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].warns // создание массива 
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); //Сортировка

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - (${top[j].balance})\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - (${top[j].balance})/\n`
    }
} 
    if(text == ``) return context.send(`Список участников с предупреждениями:`)
    return context.send("Пользователи, находящиеся в бане:\n "+text+"\n\n") 
    return context.replyMessage;
})


updates.hear(/^(?:([^]+) баны)$/i, (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = [] // создание масива

    for (let i in chats[context.chatId].users){// перебор базы данных
        if(chats[context.chatId].users[i].banned !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].banned // создание массива 
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); //Сортировка

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name})\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name})/\n`
    }
} 
    if(text == ``) return context.send(`В беседе нет ни одного забаненного участника!`)
    return context.send("Пользователи, находящиеся в бане:\n "+text+"\n\n") 
    return context.replyMessage;
})


updates.hear(/^(?:([^]+) статусы)$/i, (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = [] // создание масива

    for (let i in chats[context.chatId].users){// перебор базы данных
        if(chats[context.chatId].users[i].rank !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].rank // создание массива 
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); //Сортировка

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - ${top[j].balance} 👑\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - ${top[j].balance} 👑 /\n`
    }
} 

    return context.send("Статусы пользователей:\n "+text+"\n\n") 
    return context.replyMessage;
})


updates.hear(/([^]+) кик (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)

 
 
}
if(text.includes('club')) {
    u = u.replace("@", "") 
    u = u.replace("club", "") 
    let cl = u.replace(/[0-9]/g, '')
    u = u.replace(cl, "") 
    console.log(u)
vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: -u}); 
 
 
}
    console.log(u)
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
let b = user_info.id

vk.api.messages.removeChatUser({ chat_id: context.chatId, user_id: b}); 
} catch (e){ 
} 
})

updates.hear(/([^]+) мут- (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].muted == 0) return context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) не находится в муте`)
chats[context.chatId].users[user_info.id].muted = 0
return context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) теперь может общаться в чате.`)


} catch (e){ 
} 
})





updates.hear(/([^]+) мут (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].muted > 0) return context.send(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) уже не может общаться в чате.`)
chats[context.chatId].users[user_info.id].muted = 50
return context.send(`Участнику *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) выдан мут. Теперь он не может общаться в чате.`)


} catch (e){ 
} 
})


updates.hear(/([^]+) (.*) статус ([0-9]+)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.send(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    u = u.replace("]", "") 
    u = u.replace("|", "") 
    let o = u.replace(/[0-9]/g, '')
    o = o.replace("id", "") 
    u = u.replace(o, "")
    u = u.replace("id", "")
    console.log(o)
    console.log(u)
 
 
}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            autokick: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(context.$match[3] > Number(9)) return context.send(`Вы не можете изменять статус на более высокий, чем у вас.`)
chats[context.chatId].users[user_info.id].rank = Number(context.$match[3])
return context.send(`Пользователю *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) выдан статус ${context.$match[3]}`)


} catch (e){ 
} 
})

updates.hear(/([^]+) обновить/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if (c.is_owner) {
    chats[context.chatId].ownerid = context.senderId
    chats[context.chatId].users[context.senderId].rank = 10
}
let g = -managerid    
let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let user = users.items.find((item) => item.member_id === g);
if (user.is_admin) return context.send(`Всем привет, я чат-бот для управления беседой! 🔱`)
return context.send(`Я не являюсь администратором данной беседы.`)

})


/*======================================Команды бота=======================================*/

async function run() {
    await vk.updates.startPolling();
    console.log(chalk.red(">_ Manager Activated"));
}
 
run().catch(console.error);
// Получаем UnixDate в секундах
function getUnix() {
    return Math.floor(Date.now() / 1000);
}

function rand(text) {
    let tts = Math.floor(text.length * Math.random())
    return text[tts]
}

function getRandomInt(min, max){return Math.round(Math.random() * (max - min)) + min}
Array.prototype.random = function(){return this[Math.floor(this.length * Math.random())];}
/*=========================================================================================*/

