const request = require("request")
module.exports = {
    r: /(оператор|operator) ([^]+)/i,
    f: function (msg, args, vk, bot){
       request.get('https://htmlweb.ru/geo/api.php?json&telcod='+ encodeURIComponent(args[2]) +'&html&charset=utf-8&api_key=f3299f6bd77f04ce405586f9bda157dc&', (e,r,b) => {
            if(e) return
            var data = JSON.parse(b)
            if(!data[0].oper || b.search("<!DOCTYPE html>") != -1) return bot({text: "Нет такого оператора / номера"})
            if(!data[0].oper_brand){
              var op = ""
            }else{
              var op = "("+ data[0].oper_brand + ")"
            }
            bot({text: "Номер " + args[2] + " "+ op +" принадлежит " + data[0].oper + ". Номер из города " + data[0].name + ", " + data["country"].name})
		});
    },
    rights: 0,
    desc: "оператор <НОМЕР ТЕЛЕФОНА> -- определение оператора по номеру телефона",
    type: "all"
}