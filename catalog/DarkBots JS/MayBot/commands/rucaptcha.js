const request = require("request")
const api_key = require("../settings/config.js").api_key_rucaptcha
module.exports = {
	r: /(rucaptcha|рукапча)/i,
	f: function (msg, args, vk, bot){
        request.get('http://rucaptcha.com/res.php?action=getbalance&key=' + api_key + "&json=1", (e,r,b) => {
            if(e) return
            var data = JSON.parse(b)
            bot({text: "Баланс rucaptcha: " + data.request + " рублей.", status: false})
		});
    },
	desc: "рукапча -- баланс рукапчи",
    rights: 5,
    type: "all"
}