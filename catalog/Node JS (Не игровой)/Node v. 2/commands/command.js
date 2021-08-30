const accs = require("../plugins/autosave.js").accs
module.exports = {
    r: /(Состав)/i, 
    f: function (msg, args, vk, bot){
        var i = accs.filter(a=> a.id == msg.user).map(a=> a.uid)
        var userss = accs.length
        var per = 0
        var rig1 = "\n\n▪Випы▪"
        var rig2 = "\n\n▪Модераторы▪"
        var rig3 = "\n\n▪Админы▪"
        var rig4 = "\n\n▪Гл.Админы▪"
        var rig5 = "\n\n▪Президенты▪"
        
        while(per < userss) {
rig5 += (accs[per].rights == 5) ? "\n 🔹 [id"+accs[per].id+"|"+accs[per].nickname+"] \n": "";
rig4 += (accs[per].rights == 4) ? "\n 🔹 [id"+accs[per].id+"|"+accs[per].nickname+"] \n": "";
rig3 += (accs[per].rights == 3) ? "\n 🔹 [id"+accs[per].id+"|"+accs[per].nickname+"] \n": "";
rig2 += (accs[per].rights == 2) ? "\n 🔹 [id"+accs[per].id+"|"+accs[per].nickname+"] \n": "";
rig1 += (accs[per].rights == 1) ? "\n 🔹 [id"+accs[per].id+"|"+accs[per].nickname+"] \n": "";
per++;
}
msg.send("\n\n"+rig5+rig4+rig3+rig2+rig1)
    },
    desc: "Состав - ...",
    rights: 0,
    type: "all",
    typ: "game"
}