const vk = require("VK-Promise")(require("../settings/config.js").token)
const rand = require("../plugins/functions.js").rand
module.exports = {
    r: /(позор|pozor)/i,
    f: function (msg, text){
        vk("wall.get", {owner_id: -71729358, count: 100}).then(function (res){
           var random = rand(res.items)
           bot({text: "Позор: \n\n" + random.text})
        })
    },
    rights: 0,
    desc: "позор -- позорная история",
    type: "all"
}