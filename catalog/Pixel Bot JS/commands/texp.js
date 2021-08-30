const rand = require("../plugins/functions.js").rand 
const accs = require("../plugins/autosave.js").accs 
module.exports = { 
           r: /gexp ([0-9]+)/i, 
           f: (msg, args, vk, bot) => { 
           var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid) 
           if(Number(args[1]) > 50000000000000) return bot ({text: "\n⚠ Нельзя добавлять больше 50000000000000 опыта"}) 
           accs[i].exp += Number(args[1]) 
                   bot({text: "добавил тебе " + args[1] + "🌟"}) 
}, 
           rights: 5, 
           desc: "gexp <число> — добавляет опыт", 
           type: "all", 
           typ: "game" 
}