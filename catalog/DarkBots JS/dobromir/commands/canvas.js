const https = require('https')
const fs = require('fs')
const Canvas	= require('canvas');
const getRand = require("../plugins/functions.js").getRandomInt
const vk = require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
  r: /цвл/i,
  f: function (msg, args, vk, bot){
    vk("messages.getById", {message_ids: msg.id}).then((response) => {
          if(!response.items[0].fwd_messages) return bot({text: "Нужны пересланные сообщения"})
          var Image = Canvas.Image;
          var canvas = new Canvas(850, 600);
          var ctx = canvas.getContext('2d');
          var msgs = [];
          var _id = response.items[0].fwd_messages[0].user_id;
          response.items[0].fwd_messages.map(function(x) {
              if (x.user_id == _id) msgs.push(x.body);
              return x;
          });
          var s = msgs.join('»\n«').split('');  
          var i = 0;
          var sfix = [];
          s.map(function(a) {
              sfix.push(a);
              i++;
              if (a == "\n") i = 0;
              if (i > 26) {
                  if (a == " ") {
                      sfix.push("\n");
                      i = 0;
                  }
              }
              return a;
          });
          sfix = sfix.join('');
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, 1000, 1000);
          ctx.fillStyle = "#ffffff";
          ctx.font = '60px Roboto';
          ctx.fillText("Цитаты великих людей:", 45, 100);
          ctx.font = '28px Roboto';
          ctx.fillText("«" + sfix + "»", 260, 210);
              getUser(_id).then((res) => {
                  var nick = `${res[0].first_name} ${res[0].last_name}`
                  ctx.textAlign = "right";
                  ctx.fillText("© " + nick, 790, 550);
                  downloadPhoto(res[0].photo_200, "temp/canvas/cit-" + getRand(1, 10) + ".png", (err, ppic) => {
                      var img = new Image;
                      img.src = ppic;
                      ctx.drawImage(img, 40, 180);
                      vk.upload("photos.getMessagesUploadServer", "photos.saveMessagesPhoto", { 
                          files:{file:{buffer:canvas.toBuffer()}}}).then(function (r){ 
                          bot({text: "", att: "photo"+r[0].owner_id+"_"+r[0].id})
                      })
                  })
              })
      })
  },
  desc: "цвл <ПЕРЕСЛАННЫЕ СООБЩЕНИЯ> -- Цитаты великих людей",
  rights: 0,
  type: "all"
}
function downloadPhoto(url, folder, next) {
    var request = https.get(url, function(response) {
        response.pipe(fs.createWriteStream(folder)).on('finish', function() {
            console.log('Скачал изображение -> ' + folder);
            fs.readFile(folder, function (err, squid) {
                next(err, squid)
            })
        });
    });
}
function getUser( obj, field = 'photo_200,status,is_friend' ) {
    if(obj < 0){
      return vk("groups.getById", {group_id: obj.toString().split('-')[1]})
    }else{
      return vk("users.get", { user_ids: obj, fields: field })
    }
  }