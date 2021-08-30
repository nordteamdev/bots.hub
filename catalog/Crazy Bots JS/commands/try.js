const rand = require("../plugins/functions.js").rand
module.exports = {
	r: /(try|пробовать) ([^]+)/i,
	f: function (msg, args, vk, bot){
       var frazs = ['Success', 'Fail', 'Успешно', 'Провал']
       vk("users.get", {user_ids: msg.from_id}).then((r) => {
           bot({text: r[0].first_name + " " + r[0].last_name + " попробовал " + args[2] + " | " + rand(frazs)})
       })
    },
	desc: "попробовать <ТЕКСТ> -- попробовать что-нибудь сделать",
    rights: 0,
    type: "chat"
}