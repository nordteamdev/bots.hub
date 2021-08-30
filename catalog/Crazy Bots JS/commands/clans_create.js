const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(clans create|clan create|cc create|клан создать) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var i = accs.filter(a=> a.id == msg.from_id).map(a=> a.uid)
       if(accs[i].clan_uid != -1) return bot({text: "У тебя уже есть клан."})
       if(accs[i].spots < 20000) return bot({text: "Чтобы создать клан нужно иметь минимум 20000 ботсов."})
       var smiles = rand(["😈", "👽", "🌚", "🌝", "⚡", "🎃", "💙", "💚", "💛", "💜", "🔥", "⛔", "🌹", "💥", "🔱", "🐲"])
       clans.push({name: args[2], level:0, owner: msg.from_id, spots:0, helpers: [], exp:0, events: [], next_level: 1000, uid: clans.length, type: "1", smile: smiles});
       accs[i].clan_uid = clans.length - 1
       return bot({text: "Клан <<" + args[2] + ">> успешно создан"})
	},
	cc: "клан создать <НАЗВАНИЕ> -- создать клан",
    rights: 0,
    type: "all"
}