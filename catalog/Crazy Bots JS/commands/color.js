const Canvas = require("canvas")
const vk = new require("VK-Promise")(require("../settings/config.js").token)
const fs = require("fs")
const https = require("https")
const wait = require("../plugins/functions.js").wait
module.exports = {
	r: /(color|цвет) ([^]+)/i,
	f: function (msg, args, vk, bot){
        var canvas = new Canvas(100, 100);
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = args[2];
        ctx.fillRect(0, 0, 100, 100);
        vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", { 
            files:{file:{buffer:canvas.toBuffer()}}}).then(function (r){ 
            return bot({text: "", att:"photo"+r[0].owner_id+"_"+r[0].id}); 
        });
	},
	desc: "цвет <color>",
    rights: 7,
    type: "all"
}
