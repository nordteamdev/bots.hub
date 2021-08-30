const request = require("request");
module.exports = {
    r: /(wiki|вики) ([^]+)/i,
    f: function (msg, args, vk, bot){
        request.get("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent(args[2])+"&meta=siteinfo&rvprop=content&format=json", function(e,r,b){
            if(e) throw e
            var data = JSON.parse(b);
            if(!data[2][0]) return bot({text: "Информация в википедии не найдена!"})
            bot({text: "\n📎 " + data[1][0] + "\n\n📖==========Информация из википедии=============📖\n\n" + data[2][0] + "\n\n📖=========================================📖\n\n✏ Ссылка: " + data[3][0]});
        });
    },
    rights: 0,
    desc: "вики <ТЕКСТ> -- информация из вики",
    type: "all"
}