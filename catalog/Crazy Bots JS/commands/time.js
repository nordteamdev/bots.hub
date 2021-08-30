const time = require("../plugins/functions.js").time
const num = require("../plugins/functions.js").replace
const vk = new require("VK-Promise")(require("../settings/config.js").token)
const https = require('https')
const fs = require('fs')
const Canvas	= require('canvas');
const Image = Canvas.Image
const canvas = new Canvas(632, 510)
const ctx = canvas.getContext('2d');
module.exports = {
	r: /(время|time)/i,
	f: function (msg, args, vk, bot){
       openfile("src/images/time.jpg", (err, ppic) => {
		  var img = new Image
		  img.src = ppic
		  ctx.drawImage(img, 0, 0);
		  ctx.fillStyle = "#ffffff";
		  ctx.textAlign = "center";
		  ctx.font = '35px Roboto';
		  ctx.fillText("Время: " + time(3).time.hour + ":" + time(3).time.min + ":" + time(3).time.sec, 260, 200);
		  ctx.font = '30px Roboto';
		  ctx.fillText("Дата: " + time(3).data.date + " " + time(3).data.mes + " " + time(3).data.year + " г.  (" + time(3).data.wdays + ")", 320, 300);
		  vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", { 
			files:{file:{buffer:canvas.toBuffer()}}}).then(function (r){ 
			bot({text: "", att:"photo"+r[0].owner_id+"_"+r[0].id}); 
		  })
	   })
		////msg.send(num(time(3)))
	},
	desc: "время -- узнать время по МСК",
	rights: 0,
	type: "all"
}
function openfile(folder, next){
	fs.readFile(folder, function (err, squid) {
		next(err, squid)
	})
}