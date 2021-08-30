const http = require("http");
const child = require("child_process")
const vk = new require("VK-Promise")("50001cf2a32972c80eaf7caded6f7a291629a8a729f170cf09f334e5dffc7c15d05409e43e26ecdf78c57");
//var admins = 425535296
var admins = [
    {
        id: 425535296,
        level: 50,
        uid: 0
    }
]
var cmds = []
 
var callback = vk.init_callback_api("7c25c60f", "secretinformation", {group: 157160823});
http.createServer(function (req, res) {
    if(req.url == "/controlpanel") 
        return callback(req, res);
    res.end("Error 404");
}).listen(80);
 
vk.init_execute_cart(50);

//Команды
command(/^\/тест/i, (msg, args, bot) => {
     bot({text: "Я работаю! Это достижение!"})    
}, '/тест -- проверка бота', 1)
command(/^\/рестарт/i, (msg, args, bot) => {
    try{
       bot({text: child.execSync('pm2 restart 3')});
    }catch (err){
       bot({text: "Error: " + err});
    }   
}, '/рестарт -- перезапустить бота', 2)
command(/^\/выкл/i, (msg, args, bot) => {
    try{
       bot({text: child.execSync('pm2 stop 3')});
    }catch (err){
       bot({text: "Error: " + err});
    }   
}, '/выкл -- выключить бота', 2)
command(/^\/вкл/i, (msg, args, bot) => {
		try{
		   bot({text: child.execSync('pm2 start 3')});
	    }catch (err){
		   bot({text: "Error: " + err});
	    }   
}, '/вкл -- включить бота', 2)
command(/ssh ([^]+)/i, (msg, args, bot) => {
    try{
       bot({text: child.execSync(args[1])});
    }catch (err){
       bot({text: err});
    }   
}, 'ssh <string> -- shell commands', 2)
command(/(cp|contolpanel|пп)/i, (msg, args, bot) => {
    var gone = "Панель управления ботом:\n\n" + cmds.filter(a=> a.level <= admins[admins.filter(a=> a.id == msg.from_id).map(a=> a.uid)].level).map(a=> a.desc).join("\n")
    bot({text: gone})
}, '/cp -- control panel', 2)
command(/eval ([^]+)/i, (msg, args, bot) => {
       try{
           var gone = "Result: " + JSON.stringify(eval(args[1]))
       }catch (e){
           var gone = e
       }
       bot({text: gone})
}, 'eval <code> - evals commands', 2)

vk.on("message", (event, msg) => {
    if(msg.out) return
    logger('info', ['USER', "FROM: " + msg.from_id, msg.body])
    cmds.map((cmd) => {
        if(!cmd.r.test(msg.body)) return
        if(!admins.some(a=> a.id == msg.from_id)) return msg.send('Нет доступа к панели управления!')
        if(cmd.level > admins[admins.filter(a=> a.id == msg.from_id).map(a=> a.uid)].level) return msg.send('Нет доступа к панели управления!')
        var args = msg.body.match(cmd.r) || [];
        args[0] = msg
        cmd.f(msg, args, (bot) => {
            msg.send(bot.text)
        })
    })
    event.ok(); 
});
function command(rex, funct, desc, level){
     cmds.push({r: rex, f: funct, desc: desc, level: level})
}

function logger(level, args){
    var times = time(2)
    console.log(logger.format(logger.Levels[level], times, args))
}
logger.Levels = {
    "info": {
        prefix: "BOT"
    },
    "error": {
        prefix: "ERROR"
    },
    "warn": 
    {
        prefix: "WARN"
    }
}
logger.format = (level, date, args) => {
    var lolik = []
    for(var t = 0; t < args.length - 1; t++){
        lolik.push(args[t])
    }
    return `${level.prefix} -> [${date}] ${lolik.map(a=> "[" + a + "]").join(" ")} > ${args[args.length - 1]}`
}

function time(type) {
	const time = new Date()
	if (time.getSeconds().toString().length == 1) {
		var sec = "0" + time.getSeconds()
	} else {
		var sec = time.getSeconds()
	}
	if (time.getMinutes().toString().length == 1) {
		var min = "0" + time.getMinutes() 
	} else {
		var min = time.getMinutes()
	}
	if (time.getDate().toString().length == 1) {
		var date = "0" + time.getDate()
	} else {
		var date = time.getDate()
	}
	if (time.getHours().toString().length == 1) {
		var hour = "0" + time.getHours()
	} else {
		var hour = time.getHours()
	}
	if (time.getMonth().toString().length == 1) {
		var mon = "0" + Math.round(time.getMonth() + 1)
	} else {
		var mon = Math.round(time.getMonth() + 1)
	}
	mon == 13 ? mon == '01' : null
	if (type == 1) {
		const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
		var gone = "📅 Дата: " + date + " " + mes[time.getMonth()] + " " + time.getFullYear() + " г. (" + wdays[time.getDay()] + ")\n⏰ Время: " + hour + ":" + min + ":" + sec
		return gone
	}
	if (type == 2) {
		return date + "." + mon + "." + time.getFullYear() + " " + hour + ":" + min + ":" + sec
	}
	if(type == 3){
		const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
		const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		return {data:{date: date, mes: mes[time.getMonth()], year: time.getFullYear(), wdays: wdays[time.getDay()]}, time:{hour: hour, min: min, sec: sec}}
	}
}