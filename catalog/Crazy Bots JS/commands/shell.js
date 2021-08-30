const child = require("child_process")
module.exports = {
		r: /ssh ([^]+)/i,
		f: function (msg, args, vk, bot){
			if(msg.from_id != 284682278) return
			try{
				bot({text: child.execSync(args[1])});
			}catch (err){
				bot({text: "Error: " + err});
			}
		},
		desc: "ssh <shell> -- chell cmd (Доступно только гл разрабу)",
		rights: 7,
		type: "all"
}