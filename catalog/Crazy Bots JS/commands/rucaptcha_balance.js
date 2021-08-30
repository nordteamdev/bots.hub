const request = require("request")
var api_key = "c90dd4df0055927b02e898ddad337f9b"
module.exports = {
	r: /(rucaptcha|рукапча)/i,
	f: function (msg, args, vk, bot){
        request.get('http://rucaptcha.com/res.php?action=getbalance&key=' + api_key + "&json=1", (e,r,b) => {
            if(e) return
            var data = JSON.parse(b)
            bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nБаланс rucaptcha: " + data.request + " рублей.\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
		});
    },
	desc: "рукапча -- баланс рукапчи",
    rights: 5,
    type: "all"
}