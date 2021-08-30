var fs = require("fs");
var VK = require("VK-Promise");
var vk = new VK("98083fdcfa9fc38e2d9640879a76dd0ef39d5564fee873994f03a85b3de9b82a38fcbaf26fe996359438a");
var vkm = new VK("a1c4edfcbd10dd7163a8f5e8d29925a1261e2e9e7db0adf7c5f8328113050220bf1eed77e01644f9eed84");
var data = {
	admins:[158505202],
	base:"",
	used:require("./used.json"),
	gid:0,
	gived:0
}

fs.readFile("./account_base.txt", "utf-8", function(a,b,c){
	data.base = b;
})

Array.prototype.random = function (count) {
	if (typeof count !== "undefined") {
		return new Array(count).fill(1).map(a=>this[Math.floor(this.length * Math.random())]);
	}
	else {
		return this[Math.floor(this.length * Math.random())];
	}
};

Array.prototype.del = function (del) {
	if (this.indexOf(del) !== -1) {
		this.splice(this.indexOf(del), 1);
		return this;
	}
	else {
		return "Object without array";
	}
}

vk.init_longpoll();
vk.init_execute_cart();
vk.on("message", function(event, msg){
	vk.log = function(){
		return new Promise(function(resolve, reject){
			vk.users.get({user_id:msg.user_id}).then(function(a){
				console.log("["+timeStamp()+"]["+msg.title+"]["+a[0].first_name+" "+a[0].last_name+"] "+msg.body);
				resolve(1);
			})
		})
	}
	msg.sendDocument = function (p, text, type, attachment) {
		vk.upload("docs.getUploadServer", "docs.save", {get:{type:type?type:""}, files:{file:fs.createReadStream(p)}}).then(function(a){
			msg.send(text?test:"", {attachment:"doc"+a[0].owner_id+"_"+a[0].id+(attachment?attachment:"")})
		})
	}
	cmds.some(function(a,i){
		var matched = msg.body.match(a.regexp);
		if(matched){
			msg.user_id = msg.from_id;
			if(!a.admin || a.admin && data.admins.indexOf(msg.user_id) > -1){
				a.f(matched, msg);
				vk.log();
			};
		};
	});
});

//vk.on()

var cmds = [
	{
		regexp:/^Бот,дай\sакк/i,
		f:function(params, msg){
			if(data.base.match(/[A-zА-я0-9]+/i)){
				var accounts = data.base.split("\n")
				vk.groups.isMember({user_id:msg.user_id, group_id:data.gid}).then(function(as){
					if(as == 1){
						if(data.used[msg.user_id] !== 1){
							if(accounts.length){
								var rand = accounts.random().split("|");
								msg.send("Вот тебе твой аккаунт для Clash "+rand[0]+"\nЛогин: "+rand[1].split(":")[0]+"\nПароль: "+rand[1].split(":")[1]);
								accounts.del(rand.join("|"));
								data.gived++;
								data.base = data.base.split("\n").del(rand.join("|")).join("\n");
								data.used[msg.user_id] = 1;
								save();
							}else{
								msg.send("Извини, аккаунтов больше нет =(");
							}
						}else{
							msg.send("Я тебе уже давал аккаунт!");
						}
					}else{
						msg.send("Сначала подпишись, потом дам аккаунт!");
					}
				})
			}else{
				msg.send("Извини, аккаунтов больше нет =(");
			}
		}
	},
	{
		regexp:/\/add\s([A-zА-я]+)\|([A-z]+\:+[A-z]+)/i,
		f:function(params, msg){
			data.base = data.base.split("\n")
			data.base.push(params[1]+"|"+params[2]);
			data.base = data.base.join("\n")
			msg.send("Аккаунт: "+params[1]+"|"+params[2]+" добавлен в базу");
			save();
		},
		admin:1
	}
];
vk.groups.getById().then(function(a){
	data.gid = a[0].id;
	vkm.status.set({text:"Время: "+timeStamp().match(/[0-9]{2}\:[0-9]{2}/)[0]+", аккаунтов в базе: "+data.base.split("\n").length, group_id:data.gid})
})

setInterval(function () {
	vkm.status.set({text:"Время: "+timeStamp().match(/[0-9]{2}\:[0-9]{2}/)[0]+", аккаунтов в базе: "+data.base.split("\n").length, group_id:data.gid})
}, 6000);

function timeStamp() {
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	if(hours < 10)hours = "0" + hours;
	if(minutes < 10)minutes = "0" + minutes;
	if(seconds < 10)seconds = "0" + seconds;
	var time = hours + ':' + minutes + ':' + seconds;
	return time;
}


function save(){
	fs.writeFile("./account_base.txt", data.base, function(){
		fs.writeFile("./used.json", JSON.stringify(data.used, null, "  "), function(){})
	});
}