const getRandomInt = require("../plugins/functions.js").getRandomInt
const rand = require("../plugins/functions.js").rand
const scl = require("../plugins/functions.js").declOfNum
module.exports = {
    r: /(when|когда) ([^]+)/i,
    f: function (msg, args, vk, bot){
        var rhour = getRandomInt(1, 24);
        var rsec = getRandomInt(1, 100);
        var ddate = getRandomInt(1, 30);
        var mdate = getRandomInt(1, 12);
        var ydate = getRandomInt(2017, 2100);
        var minut = getRandomInt(1, 120);
        var yea = getRandomInt(1, 70);
        if(ddate.toString().length == 1){
            ddate = "0" + ddate
        }
        if(mdate.toString().length == 1){
            mdate = "0" + mdate
        }
        if(ydate.toString().length == 1){
            ydate = "0" + ydate
        }
        //scl(sec, ["секунда", "секунды", "секунд"])
        var random = rand(["Это произойдет через "+rsec+" " + scl(rsec, ["секунда", "секунды", "секунд"]), "Это произойдет через "+rhour+" " + scl(rhour, ["час", "часа", "часов"]), "Это произойдет в "+ddate+"."+mdate+"."+ydate, "Это произойдет через "+minut+" " + scl(minut, ["минуту", "минуты", "минут"]), "Это произойдет через "+yea+" " + scl(yea, ["год", "года", "лет"]), "Это произойдет никогда.", 'Это произойдет когда твоя мамка родит'])
        bot({text: random});
    },
    desc: "когда <ТЕКСТ> -- когда произойдет то или иное событие",
    rights: 0,
    type: "all"
}