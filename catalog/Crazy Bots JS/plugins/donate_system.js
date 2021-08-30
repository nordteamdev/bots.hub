const url = "https://cryazbotss.online/"
const mysql = require("mysql")
const random = require("./functions.js").getRandomInt
const request = require("request")
const config = require("../settings/config.js")
const vk = require("VK-Promise")(config.token)
var secret = {
    secret1: "r66fzbyo",
    secret2: "cqbcyjnf"
}
var connection = mysql.createConnection({
    host     : '149.202.210.182',
    user     : 'serverforbots',
    password : 'Q9e7D3b2',
    database : 'shoping_228'
});
connection.connect()
var shop_id = 63014
function calc(count, desc, next){
      request.get(`${url}/shop/freekassa2.php?prepare_once=1&shop=${shop_id}&oa=${count}&l=${desc}&key=` + secret.secret1, (e, r, b) => {
           if(e) return
           var data = JSON.parse(b)
           next(data)
      })
}
function gone(user_id, count, info, cmd, nexts){
    var randoms = random(1, 9999999999)
    calc(count, user_id + "-" + randoms, (next) => {
        const orders = require("../data/orders.json")
        orders.push({user_id: user_id, desc: user_id + "-" + randoms, type: info, status: false, cmd: cmd, uid: orders.length})
        const fs = require("fs")
        fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, "\t"))
        vk("utils.getShortLink", {url: `https://www.free-kassa.ru/merchant/cash.php?m=${shop_id}&oa=${count}&o=${user_id + "-" + randoms}&s=${next.hash}&us_by=1&us_type=1&lang=ru`}).then((res) => {
            var pizda = res.short_url
            nexts(pizda)
        })
    })
}
function ogo(){
    connection.query('SELECT * FROM `users`', function (error, results, fields) {
        const accs = require("../data/accs.json")
        if (error) throw error;
        const orders = require("../data/orders.json")
        for(var o = 0; o < orders.length; o++){
            if(orders[o].type == "DONAT"){
                orders[o].status = true
            }
            if(orders[o].status == false){
                if(results.some(a=> a.zakaz == orders[o].desc)){
                    orders[o].status = true
                    eval(orders[o].cmd.replace(/%USER_ID%/ig, orders[o].user_id))
                }
            }
        }
    });
}
module.exports = {
    gone,
    ogo
}