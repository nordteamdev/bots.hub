const vk = require("VK-Promise")(require("../settings/config.js").token)
const tts_key = "8af689a2-3ae6-414f-a324-00664d8a8593"
const https = require("https")
const nick = require("../plugins/functions.js").nick
module.exports = {
    r: /(скажи|speak) (-м|-ж) ([^]+)/i,
    f: function (msg, args, vk, bot){
        if(args[2] == "-м"){
            var lol = "zahar"
        }else{
            var lol = "oksana"
        }
        https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key +
        "&format=mp3&speaker="+ lol +"&text="+encodeURIComponent(args[3]),function(stream){
        stream.filename = "audio_message.ogg";
        vk.upload("docs.getWallUploadServer", "docs.save",{
            get:{type: "audio_message"},files:{file:stream}}).then(function (r) {
                console.log(r);
                bot({text: "", att:"doc"+r[0].owner_id+"_"+r[0].id});
            })
    });
    },
    rights: 0,
    desc: "скажи <ТЕКСТ> -- скажет ваш текст",
    type: "all"
}