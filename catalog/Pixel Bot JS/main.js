//Not my modules
const config = require("./settings/config.js")
const fs = require("fs")
const VK = require('vk-io')
const vk = new VK()
const RuCaptcha   = require('rucaptcha');
const id = require("./settings/config.js").id
var solver      = new RuCaptcha({
    apiKey:     config.api_key_rucaptcha,
    tmpDir:     './temp',
    checkDelay: 30000
}); 
//Историк лох бла-бла бла-бла
//Модули 
const autosave = require("./plugins/autosave.js"), //System of autosave
      accs = autosave.accs
      clans = autosave.clans
const funct = require("./plugins/functions.js") //Functions
var bans = [451578961, 336816275]
const log = require("./plugins/console.js").Logger
const https = require('https')
var whitelist = [4395]
const mess = require("./settings/messages.json")
const systems = require("./plugins/systems.js")
const cmds = fs.readdirSync("./commands").filter(x => x.endsWith(".js")).map(x => require("./commands/" + x));
//Other
var main = {
    friends: {
        add: 0,
        remove: 0
    },
    uptime: {
        min: 0,
        hours: 0,
        days: 0
    },
    api: 0,
    cmds: 0,
    in: 0,
    out: 0,
    course: {
        bitcoins: funct.getRandomInt(1111111, 2222222),
        diamonds: funct.getRandomInt(11111, 33333),
        bit: 0,
        dd: 0
    }
}
var users = []
var cache = {}
vk.setToken(config.token)
vk.longpoll.start()
vk.setCaptchaHandler((src, sid, retry) => {
    var name = "captcha-" + funct.getRandomInt(1, 10) + ".png" 
    downloadPhoto(src, "./temp/captcha/" + name, (err, folder) => {
        solver.solve(folder, (err, answer) => {
            if(err) return log('err', ['CAPTCHA', 'ERROR', err])
            retry(answer)
            log('warn', ['CAPTCHA', 'ANSWER', answer])
        });
    })  
});
vk.longpoll.on("message", (msg) => {
    if(!config.id == msg.user) return;
    if(!msg.text || ~msg.flags.indexOf('outbox')) return;
    msg.chat ? log('info', ['CHAT', "CHAT_ID: " + msg.chat, "FROM: " + msg.user, msg.text]) : log('info', ['USER', "FROM: " + msg.user, msg.text])
    var banlist = autosave.banlist
    if(banlist.some(a=> a.id == msg.user && a.status == true) == true) return
    if(!autosave.accs.some(a=> a.id == msg.user)){
        autosave.accs.push({
            id: msg.user, 
            balance: 50000, 
            nickname: "Пользователь",
            prefix: "Пользователь",
            level: 1,
            cmds: 0,
            exp: 0, 
            bonus: false,
            bets: 0, 
        winDuel: 0,
            loseDuel: 0,
            inventory: {
                invites: 0,
                scans: 0,
                nicks: 0,
                diamonds: 0,
                bitcoins: 0,
                barons: 0,
                rabs: 0,
                cases: {
                    donate: 0
                }
            },
            register: funct.time(2),
            rights: 0,
            clan_uid: -1,
            next_exp: 5,
            next_level: 500,
            uid: autosave.accs.length
        })
        vk.api.call('users.get', {user_ids: msg.user})
        .then((res) => {
            var i = accs.filter(a=> a.id == Number(msg.user)).map(a=> a.uid)
            accs[i].nickname = res[0].first_name
        })
    }
    check_bots(msg.chat, (next) => {
    if(typeof next == 'object') {msg.send(`🔫 Я обнаружил что в этой 🎎беседе🎎 находятся посторонние боты💻\n
    ${next.map(a=> 'https://vk.com/id' + a).join('\n')} \n🔖 Поэтому я вынужден покинуть данную беседу`).then(res => vk.api.call('messages.removeChatUser', {chat_id: msg.chat, user_id: id}))}
    if(!autosave.bank.some(a=> a.id == msg.user)){ autosave.bank.push({number: autosave.bank.length, balance: {balance: 0, diamonds: 0, bitcoins: 0}, id: msg.user})}
    var i = autosave.accs.filter(a=> a.id == msg.user).map(a=> a.uid)
    accs[i].balance <= 0 || !accs[i].balance ? accs[i].balance = funct.getRandomInt(100, 3500) : null
    cmds.map((cmd) => {
        try{
        main.in += 1
        if(!config.pattern.test(msg.text) || cache[msg.id]) return;
        if(msg.out == 1) return
        var patt = msg.text.match(config.pattern)
        var body = patt[2]
        if(!cmd.r.test(body)) return
        !cache[msg.id] ? cache[msg.id] = true : null
        users.some(a=> a.id == msg.user) ? "" : users.push({id: msg.user, mess: 0, uid: users.length}) 
        ++users[users.filter(a=> a.id == msg.user).map(a=> a.uid)].mess
        if(cmd.rights > autosave.accs[i].rights) return msg.reply(mess.not_donate.replace(/%donate%/ig, funct.dostup(cmd.rights)).replace(/%MYRIGHTS%/ig, funct.getRights(msg.user)))
        const args = body.match(cmd.r) || [];
        args[0] = msg
        cmd.type == 'game' ? accs[i].exp += (accs[i].next_exp + 10) : accs[i].exp += accs[i].next_exp
        accs[i].cmds += 1
        var a = accs[i].clan_uid
        var k = autosave.accs.filter(k=> k.clan_uid == a && k.id == msg.user).map(k=> k.clan_uid)
        if(accs[i].clan_uid != -1){ 
        clans[k].exp += clans[k].next_exp
        };
        main.cmds += 1
        cmd.f(msg, args, vk, (bot) => {
             main.out += 1
             msg.reply(funct.nick(msg.user, bot.status) + bot.text, {attachment: bot.att})
        })
    }catch(err){
        msg.reply(err)
        console.log(err)
    }
         var a = accs[i].clan_uid
         var k = autosave.accs.filter(k=> k.clan_uid == a && k.id == msg.user).map(k=> k.clan_uid)
         if(accs[i].clan_uid != -1){
            if(clans[k].exp >= clans[k].next_level){
            clans[k].level += 1
            clans[k].exp = clans[k].exp -= clans[k].next_level
            clans[k].next_level += 200
            clans[k].next_exp += 2
            }
         }
        if(accs[i].exp >= accs[i].next_level){
            accs[i].level += 1
            accs[i].exp = accs[i].exp -= accs[i].next_level
            accs[i].next_level += 200
            accs[i].next_exp += 2
        }
        main.api += 1
})
})
})
setInterval(() => {
    main.uptime.min += 1
    if(main.uptime.min == 60){
        main.uptime.min = 0
        main.uptime.hours += 1
    }
    if(main.uptime.hours == 24){
        main.uptime.hours = 0
        main.uptime.days += 1
    }
}, 60000)
setInterval(() => {
    systems.forbans()
}, 1000)
setInterval(() => {
    autosave.saving()
}, config.auto_save)
setInterval(() => {
    systems.antispam()
    var limiter = require("./plugins/skills.js")
    accs.map((acc) => {
    }) 
    vk.api.call("account.setOnline", {voip: 0})
    ++main.api
    vk.api.status.set({text: `🔧 ${config.codename} | 💻 UPTIME: ${main.uptime.days} дней ${main.uptime.hours} часов ${main.uptime.min} минут | 📤 Сообщений отправлено: ${main.out} | ✉ Сообщений принято: ${main.in} | 🔧 Создатель Давид Ербаев`});
}, 60000)
setInterval(() => {
    var r = funct.getRandomInt(1000000, 2200000)
    var r1 = funct.getRandomInt(15000, 30000) 
    main.course.bit = r - main.course.bitcoins
    main.course.dd = r1 - main.course.diamonds
    main.course.bitcoins = r
    main.course.diamonds = r1
}, 600000)
setInterval(() => {
    vk.api.friends.getRequests({out: 0, extended: 0, need_mutual: 0})
    .then((r) => {
         if(r.items.length == 0) return
         for(var y = 0; y < r.items.length; y++){
             vk.api.friends.add({user_id: r.items[y]})
             ++main.friends.add
         }
    })
    vk.api.friends.getRequests({out: 1, extended: 0, need_mutual: 0})
    .then((r) => {
        if(r.items.length == 0) return
        for(var y = 0; y < r.items.length; y++){
            vk.api.friends.delete({user_id: r.items[y]})
            ++main.friends.remove
        }
   })
}, 1200000)
function downloadPhoto(url, folder, next) {
    var request = https.get(url, (response) => {
        response.pipe(fs.createWriteStream(folder)).on('finish', () => {
            fs.readFile(folder, (err, squid) => {
                next(err, folder)
            })
        });
    });
}
var check_bots = (chat_id, next) => { //Слив с беседы, если есть говноботы, P.S С колинимы ботами тоже робит ы
    vk.api.call('messages.getChatUsers', {chat_id: chat_id})
    .then(res => {
        var govnobots = bans
        var check = []
        res.map((govnobot) => {
            if(govnobots.indexOf(govnobot) > -1) check.push(govnobot)
        })
        return next(check.length == 0 ? true : check)
    })
}
module.exports = {
    main: main,
    users: users
}