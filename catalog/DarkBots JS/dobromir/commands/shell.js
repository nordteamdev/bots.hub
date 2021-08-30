const child = require("child_process")
module.exports = {
		r: /ssh ([^]+)/i,
		f: function (msg, args, vk, bot){
			if(msg.from_id != 123414144124141414142) return
			try{
				bot({text: child.execSync(args[1])});
			}catch (err){
				bot({text: "Error: " + err});
			}
		},
		desc: "ssh <shell> -- chell cmd ",
		rights: 4,
		type: "admin"
}