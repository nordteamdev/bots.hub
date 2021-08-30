var data = []
const colors = require("colors/safe")  
const fs = require("fs")
const getRand = require("../plugins/functions.js").getRandomInt
var name = getRand(100, 999)
var date = new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
var names = date + "_" + name 
var test = fs.createWriteStream("logs/"+ names +".txt", {encoding: "utf8"});
function logger(array){
    var root = "[" + array.level + "] ["+ date +"] [PEER_ID: "+ array.peer +"] [USER_ID: " + array.id +"] > " + array.text
    test.write(root + "\n")
    if(array.level == "LOG"){
        data.push({text: array.text, level: "log", date: date, id: array.id, peer: array.peer})
        root = colors.green(root)
    }
    if(array.level == "ERROR"){
        data.push({text: array.text, level: "error", date: date, id: array.id, peer: array.peer})
        root = colors.red(root)
    }
    if(array.level == "INFO"){
        data.push({text: array.text, level: "info", date: date, id: array.id, peer: array.peer})
        root = colors.cyan(root)
    }
    if(array.level == "WARNING"){
        data.push({text: array.text, level: "warn", date: date, id: array.id, peer: array.peer})
        root = colors.yellow(root)
    }
    console.log(root)
    /**
     * {
     *     text: string,
     *     level: "dsd"
     *     peer: string,
     *     id: msg.from_id
     * }
     */
    return 
}
module.exports = {
    data: data,
    logger
}