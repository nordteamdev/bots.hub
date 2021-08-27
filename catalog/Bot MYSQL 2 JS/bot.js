const empty = require("./function/empty.js");
var bot = require("./db/mysql.js"); // Подключил файл с базой
const utils = require("./utils/utils.js");
const {VK, Keyboard} = require('vk-io');
const mysql = require('mysql');
const fs = require("fs");
const rq = require("prequest");
const requests = require("request");
const vk = new VK();
const commands = [];

 vk.setOptions({
                token: 'токен',
		      apiMode: 'parallel',
                pollingGroupId: 'ид_группы',
            });
  const { updates, snippets } = vk;




            vk.updates.use(async (context, next) => {
                            if (context.type === 'message' && context.isOutbox) {
                                return;
                            }
                   context.text = context.payload.text;  
	                  if(Number(context.senderId) <= 0) return;
	                  if(/\[ид_группы|(.*)\]/i.test(context.text)) context.text = context.text.replace(/\[ид_группы|(.*)\]/ig, '').trim();
                     var hhhh = getUnix();
  bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){ 
if (err) console.log(err);    

                            if (empty(rows)) {
   bot.mysql.db.query('INSERT IGNORE INTO `users` (`uid`,`name`,`balance`, `rass`, `bro`, `adm`, `date`) VALUES (?,?,15000,1,1,1,?)', [context.senderId, "Чо", hhhh])
return context.send(`Я тебя зарегал, бро))`);
return;

}

});
try {
    await next();
} catch (error) {
bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){          
if (err) console.log(err);
    if (empty(rows)) return;
    else console.error('Произошла ошибка, код ошибки:', error);
});
}
const command = commands.find(x=> x[0].test(context.text));
if(!empty(context.text)){
if(command){
context.args = context.text.match(command[0]);
if(context.isChat){
}
}
}
if(!empty(context.text)){
if(command){
await command[1](context, sent);
}
}

}); 
const cm = {
    hear: (p, f) => {
        commands.push([p, f]);
    }
}
	const sent = (text, params) => {

		return context.send(`${text}`, params);

	}

cm.hear(/^(?:профиль)$/i, async (context) => {
  bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){          
if (err) console.log(err);            
    if (!empty(rows)) {
                          const users = rows; 
context.send(`Лови профиль:
Баланс: ${users[0].balance}
Ты: ${users[0].name}
По аналогии сделаете дальше. Мне лень 🌚
`);
}
})
});
cm.hear(/^(?:дай)$/i, async (context) => {
bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){          
if (err) console.log(err);            
    if (!empty(rows)) {
plus("balance", context.senderId, 10);
context.send(`Я дал тебе 10$`);
}
});
});
cm.hear(/^(?:забери)$/i, async (context) => {
bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){          
if (err) console.log(err);            
    if (!empty(rows)) {
min("balance", context.senderId, 10);
context.send(`Я забрал у тебя 10$`);
}
});
});
cm.hear(/^(?:сетни)$/i, async (context) => {
bot.mysql.db.query('SELECT * FROM `users` WHERE `uid` ="' + context.senderId +'"', function(err, rows, fields){          
if (err) console.log(err);            
    if (!empty(rows)) {
setp("balance", context.senderId, 10);
context.send(`Я установил тебе баланс 10$`);
}
});
});
async function run() {
    await vk.updates.startPolling();
}

run().catch(console.error);
function plus(per, uid, value) {
const sql = `UPDATE users SET ${per} = ${per} + ? WHERE uid=?`;
const data = [value, uid];
bot.mysql.db.query(sql, data, function(err, results) {
    if(err) console.log(err);
});
	return;
}
function min(per, uid, value) {
const sql = `UPDATE users SET ${per} = ${per} - ? WHERE uid=?`;
const data = [value, uid];
bot.mysql.db.query(sql, data, function(err, results) {
    if(err) console.log(err);
});
	return;
}
function setp(per, uid, value) {
const sql = `UPDATE users SET ${per} = ? WHERE uid=?`;
const data = [value, uid];
bot.mysql.db.query(sql, data, function(err, results) {
    if(err) console.log(err);
});
	return;
}

function getUnix() {
    return Date.now();
}
