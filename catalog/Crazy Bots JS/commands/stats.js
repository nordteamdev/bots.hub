const os = require("os")
const process = require("process")
const config = require("../settings/config.js")
module.exports = {
	r: /stats/i,
	f: function (msg, args, vk, bot){
        const main = require("../main.js")
        var sex = os.freemem() / 1024 / 1024;
        var totalmem = os.totalmem() / 1024 / 1024;
        var cpu = os.cpus();
        bot({text: "⚠Информация о системе и о железе:\n&#4448;&#4448;&#4448;🔥Тип системы: "+os.type()+"\n&#4448;&#4448;&#4448;💻Система: "+os.arch()+"\n&#4448;&#4448;&#4448;💽ОС: "+os.platform()+"\n&#4448;&#4448;&#4448;📎Версия: "+os.release()+"\n&#4448;&#4448;&#4448;⚠ОЗУ: "+sex.toFixed(2)+" / 1 GB"+"\n&#4448;&#4448;&#4448;⏰Работает: " + main.home.uptime.days + " дней " + main.home.uptime.hours + " часов " + main.home.uptime.min + " минут " + main.home.uptime.sec + " секунд" + "\n&#4448;&#4448;&#4448;💿ЦП: "+cpu[0].model+"\n&#4448;&#4448;&#4448;⏳Сервер работает: "+Math.floor(os.uptime())+" секунд\n\n💡Информация о процессе:"+"\n&#4448;&#4448;&#4448;📍PID: "+process.pid+"\n&#4448;&#4448;&#4448;📄Название: "+process.title+"\n&#4448;&#4448;&#4448;🔮Node: "+process.version+"\n\n👦Информация о аккаунте:"+"\n&#4448;&#4448;&#4448;👤ID: "+config.id+"\n&#4448;&#4448;&#4448;📡API: "+main.home.api+"\n&#4448;&#4448;&#4448;✉Сообщений принято: "+main.home.stats+"\n\n👥Друзья: "+"\n&#4448;&#4448;&#4448;👣Пришло: "+main.home.friends.remove+"\n&#4448;&#4448;&#4448;💥Слилось: "+main.home.friends.add});
    },
    desc: 'stats -- статистика сервера',
    rights: 3,
    type: "all"
}