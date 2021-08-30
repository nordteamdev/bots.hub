const request = require("request")
var api_key = "ТОКЕН РУКАПЧИ"
module.exports = {
	r: /(rucaptcha|рукапча)/i,
	f: function (msg, args, vk, bot){
        request.get('http://rucaptcha.com/res.php?action=getbalance&key=' + api_key + "&json=1", (e,r,b) => {
            if(e) return
            var data = JSON.parse(b)
            bot({text: "\nБаланс rucaptcha: " + data.request + " рублей"})
		});
    },
	desc: "рукапча -- баланс рукапчи",
    rights: 3,
    type: "admin"
}