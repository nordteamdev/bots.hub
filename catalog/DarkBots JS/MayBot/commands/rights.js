const accs = require("../plugins/autosave.js").accs
module.exports = {
	    r: /(rights|права) ([0-5]+)/i,
	    f: function (msg, args, vk, bot){
            vk.api.call("messages.getById", {message_ids: msg.id}).then((response) => {
           var gone = ""
           if(args[2] == 0){
               var r = "Пользователя"
           }else if(args[2] == 1){
               var r = "Випа"
           }else if(args[2] == 2){
               var r = "Премиума"
           }else if(args[2] == 3){
               var r = "Модератора"
           }else if(args[2] == 4){
               var r = "Администратора"
           }else if(args[2] == 5){
               var r = "Данную привелегию нельзя выдать по команде!"
           } 
           var users = response.items[0].fwd_messages
           for(var p = 0; p < users.length; p++){
               var user = users[p].user_id;
               var i = accs.filter(a=> a.id == Number(user)).map(a=> a.uid)
               if(accs.some(a=> a.id == user)){
               args[2] == 5 ? null : accs[i].rights = Number(args[2])
               args[2] == 5 ? r : gone += "Пользователю [id" + accs[i].id + "|" + accs[i].nickname + "] выданы права " + r + "\n"
               }else{
                   gone += "У пользователя [id" + accs[i].id + "|" + accs[i].nickname + " нет аккаунта.\n"
               }
           }
           bot({text: gone})
           })
		},
		desc: "права <ПРАВА> -- выдать права пользователю",
		rights: 5,
		type: "all",
		typ: "prosto"
}
function like(text, ym){
	var lik = num(text*ym)
	return lik
}