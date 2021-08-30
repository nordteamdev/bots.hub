const math = require("mathjs")
module.exports = {
	r: /(посчитай|calc|реши|калькулятор) ([^"]+)/i,
	f: function (msg, args, vk, bot){
        try{
        bot({text: args[2] + " = " + math.eval(args[2])})
        }catch (err){
            return console.log(err)
        }
	},
	desc: "реши <ПРИМЕР> -- простой калькулятор",
    rights: 0,
    type: "all"
}