//Запросы к файлам и модули
const config = require("./settings/config.js")
const messages_config = require("./settings/messages.json")
const fs = require("fs")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./commands/" + x));
const consol = require("./plugins/console.js").consol
const time = require("./plugins/functions.js").time
const donate = require("./plugins/functions.js").dostup
const chats = require("./data/chats.json")
const getR = require("./plugins/functions.js").getRights
const accs = require("./data/accs.json")
const nick = require("./plugins/functions.js").nick
const colors = require("colors/safe")
const clans = require("./data/clans.json")
const random = require("./plugins/functions.js").getRandomInt
const wait = require("./plugins/functions.js").wait
const answers = require("./settings/answers.json")
const rand = require("./plugins/functions.js").rand
const filter = require("./plugins/functions.js").check
const https = require("https")
const systems = require("./plugins/systems.js")
const log = require("./plugins/console.js").logger
var RuCaptcha   = require('rucaptcha');
var solver      = new RuCaptcha({
	  apiKey:     'c90dd4df0055927b02e898ddad337f9b', //required 
	  tmpDir:     './temp',                //optional, default is './tmp' 
	  checkDelay: 7000              //optional, default is 1000 - interval between captcha checks 
});
//Другие переменные
const users = []

//Подключение к вк
const VK = require("VK-Promise") 
const vk = new VK(config.token)
vk.init_longpoll() // -- Лонгпул
vk.on("captcha",function(event, data){
	var name = "captcha-" + random(1, 10) + ".png" 
	downloadPhoto(data.captcha_img, "./temp/captcha/" + name, (err, folder) => {
		solver.solve(folder, function(err, answer){
			if(err){
				log({text: err, level: "ERROR", peer: "ANSWER", id: "CAPTCHA"})
			}else{
				data.submit(answer)
				log({text: "Ввел капчу --> " + answer, level: "LOG", peer: "SUCCESS", id: "CAPTCHA"})
			}
		});
	})  
});

vk.on("message", (event, msg) => {
	var req = require("./main.js")
	if(accs.some(a=> a.id == msg.from_id && a.ban.status == true)) return
	if(config.id == msg.from_id) return
	if(!chats.some(a=> a.chat_id == msg.chat_id) && msg.chat_id != undefined){
		chats.push({chat_id: msg.chat_id, title: "", photo: "", uid: chats.length})
	}
	if(chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.title) != msg.title && msg.chat_id != undefined){
		vk.messages.editChat({chat_id: msg.chat_id, title: chats.filter(a=> a.chat_id == msg.chat_id).map(a=> a.title)})
	}
	if (!accs.some(a => a.id == msg.from_id)) { // Авто регистратор аккаунтов
		accs.push({id: msg.from_id, level: 0, nickname: "Пользователь", exp: 0, bets: 0, spots: 2017, cmds: 0, used: 20, limit: 2, ban: {status: false, before: "", reason: "", time: "", author: ""}, not: [], inventory: { invites: 0, scans: 0, nick: 0, cases: { freecases: 0, vipcase: 0, prcase: 0, modercase: 0, admincase: 0 } }, rights: 0, clan_uid: -1, quests: [], next_level: 100, next_exp: 5, uid: accs.length, orders: []})
		vk.users.get({user_ids: msg.from_id})
		.then((res) => {
			var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
			accs[i].nickname = res[0].first_name
			++req.api
		})
	}
	 const i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
	 if(accs[i].exp >= accs[i].next_level){
		accs[i].level += 1
		accs[i].exp = accs[i].exp -= accs[i].next_level
		accs[i].next_level += 200
		accs[i].next_exp += 2
	 }
	 if(accs[i].spots == NaN || accs[i].spots == null || accs[i].spots == undefined) {accs[i].spots = 10000}
	 log({text: msg.body, level: "LOG", peer: msg.peer_id, id: msg.from_id})
	 cmds.map((cmd) => {
		try{
			 if (!config.pattern.test(msg.body)) return;
			 var patt = msg.body.match(config.pattern)
			 var body = patt[2]
			 if (!cmd.r.test(body)) return;
			 filter(body, (nexus) => {
			 if(nexus == true) return systems.ban({id: msg.from_id, before: 86400, reason: "Подозрительные ссылки!", author: "Система защиты"})
			 wait(config.wait)
			 if(cmd.type == "chat" && !msg.chat_id || cmd.type == "ls" && msg.chat_id) return 
			  if(!users.some(a=> a.id == msg.from_id)){ users.push({id: msg.from_id, mess: 0, uid: users.length}) }
			  ++users[users.filter(a=> a.id == msg.from_id).map(a=> a.uid)].mess
			 const args = body.match(cmd.r) || [];
			 msg.setActivity()
			 if (cmd.rights > accs[i].rights) return msg.send(messages_config.not_donate.replace(/%donate%/ig, donate(cmd.rights)).replace(/%MYRIGHTS%/ig, getR(msg.from_id)))
			 args[0] = msg
			 msg.ok = true;
			 accs[i].exp += accs[i].next_exp
			 cmd.f(msg, args, vk, (bot) => {
				 msg.reply(nick(msg.from_id, 1) + bot.text, {attachment: bot.att})
			 })
			 })
			 accs[i].cmds += 1
		}catch(err){
			 var lol = ""
			 if(accs[i].rights >= 7){
				 lol = "\nError: " + err.toString()
			 }
			 msg.reply("Произошла внутренняя ошибка, повторите запрос позднее!" + lol)
			 log({text: err.toString(), level: "ERROR", peer: msg.peer_id, id: msg.from_id})
		}
			++req.home.cmds
	 })
	 ++req.home.stats
	 ++req.home.api
})

//Функции
//Принималка и удалялка друзей
if(config.autoaccept == true){
setInterval(() => {
	var req = require("./main.js")
	vk.friends.getRequests({out: 0, extended: 0, need_mutual: 0})
	.then((r) => {
		 if(r.items.length == 0) return
		 for(var y = 0; y < r.items.length; y++){
			 vk.friends.add({user_id: r.items[y]})
			 ++req.home.friends.add
		 }
	})
	vk.friends.getRequests({out: 1, extended: 0, need_mutual: 0})
	.then((r) => {
		if(r.items.length == 0) return
		for(var y = 0; y < r.items.length; y++){
			vk.friends.delete({user_id: r.items[y]})
			++req.home.friends.remove
		}
   })
}, 1200000)
}
if (config.autostatus == true) {
	setInterval(() => {
		var req = require("./main.js")
		const statuss = messages_config.status_text.replace(/%WORKTIME_DAYS%/ig, req.home.uptime.days).replace(/%WORKTIME_HOURS%/ig, req.home.uptime.hours).replace(/%WORKTIME_MIN%/ig, req.home.uptime.min).replace(/%WORKTIME_SEC%/ig, req.home.uptime.sec).replace(/%MESSAGES%/ig, req.home.stats).replace(/%API%/ig, req.home.api).replace(/%TIME%/ig, time(2))
		vk.status.set({text: statuss});
		++req.home.api
	}, 30000);
}
setInterval(()=>{
	const donate = require("./plugins/donate_system.js")
	donate.ogo()
}, 60000)
setInterval(() => {
	const systems = require("./plugins/systems.js")
	var req = require("./main.js").home
	systems.antispam()
	systems.forbans()
	++req.uptime.sec
	if(req.uptime.sec == 60){
		req.uptime.sec = 0
		req.uptime.min += 1
	}
	if(req.uptime.min == 60){
		req.uptime.min = 0
		req.uptime.hours += 1
	}
	if(req.uptime.hours == 24){
		req.uptime.hours = 0
		req.uptime.days += 1
	}
}, 1000)
setInterval(() => {
	var users = require("./main.js").users
	var quests = require("./settings/point.json")
	/*for(var i = 0; i < users.length; i++){
		users[i].mess = 0
	}
	for(var l = 0; l < accs.length; l++){
		var q = accs[l].quests
		for(var t = 0;t < quests.length; t++){
			if(quests[t].type == "like" && q.indexOf(t) == -1){
			   vk.likes.isLiked({user_id: accs[l].id, type: quests[t].object.type, owner_id: quests[t].object.owner_id, item_id: quests[t].object.item_id})
			   .then((res) => {
				   if(res.liked == 1){
					   accs[l].quests.push(t)
					   accs[l].spots += quests[t].price
				   }
			   })
			}else if(quests[t].type == "sub" && q.indexOf(t) == -1){
			   vk.groups.isMember({group_id: quests[t].object.group_id, user_id: accs[l].id})
			   .then((res) => {
					if(res.member == 1){
						accs[l].quests.push(t)
						accs[l].spots += quests[t].price
					}
			   })
			}else if(quests[t].type == "used" && q.indexOf(t) == -1){
               if(quests[t].object.type == "cmds"){
                  if(accs[l].cmds >= quests[t].object.count){
					  accs[l].quests.push(t)
					  accs[l].spots += quests[t].price
				  }
			   }
			}
		}
		if(q.length != 0){
			for(var h = 0; h < q.length; h++){
                
			}
		}
	}*/
}, 300000);
//Автосохранение
setInterval(() => {
	console.log(colors.cyan("Autosave starting..."))
	var update = require("./data/info.json")
	var promo = require("./data/promocodes.json")
    fs.writeFileSync("./data/accs.json", JSON.stringify(accs, null, "\t"))
	fs.writeFileSync("./data/clans.json", JSON.stringify(clans, null, "\t"))
	fs.writeFileSync("./data/info.json", JSON.stringify(update, null, "\t"))
	fs.writeFileSync("./data/promocodes.json", JSON.stringify(promo, null, "\t"))
	fs.writeFileSync("./data/chats.json", JSON.stringify(chats, null, "\t"))
	console.log(colors.green("Autosave completed!"))
}, config.auto_save)

module.exports = {
	home: {
		friends: {
			add: 0,
			remove: 0
		},
		uptime: {
			sec: 0,
			min: 0,
			hours: 0,
			days: 0
		},
		api: 0,
		cmds: 0,
		stats: 0
	},
	users: users
}
function downloadPhoto(url, folder, next) {
    var request = https.get(url, function(response) {
        response.pipe(fs.createWriteStream(folder)).on('finish', function() {
            fs.readFile(folder, function (err, squid) {
                next(err, folder)
            })
        });
    });
}