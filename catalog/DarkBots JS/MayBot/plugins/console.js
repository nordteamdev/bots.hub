const time = require("./functions.js").time
var data = []
/**
 * {
 *    level: string,
 *    args: massive 
 * }
 *  @param {Array}
 */
function logger(level, args){
    var times = time(2)
    console.log(logger.format(logger.Levels[level], times, args))
}
logger.Levels = {
    "info": {
        prefix: "BOT"
    },
    "error": {
        prefix: "ERROR"
    },
    "warn": 
    {
        prefix: "WARN"
    }
}
logger.format = (level, date, args) => {
    var lolik = []
    for(var t = 0; t < args.length - 1; t++){
        lolik.push(args[t])
    }
    return `${level.prefix} -> [${date}] ${lolik.map(a=> "[" + a + "]").join(" ")} > ${args[args.length - 1]}`
}
exports.data = data
exports.Logger = logger