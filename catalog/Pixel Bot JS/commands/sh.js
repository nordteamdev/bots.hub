const child = require('child_process')
const config = require("../settings/config.js")
module.exports = {
	r: /(ssh|shell) ([^]+)/i,
	f: function (msg, args, vk, bot){
		if(config.eval[0] != msg.user) return
		try{
			var gone = child.execSync(args[2])
		}catch (err){
			var gone = err.toString()
		}
		return bot({text: gone, status: false})
	},
	rights: 5,
	desc: "ssh <code> -- shell cmds",
	type: "all",
	typ: "prosto"
}