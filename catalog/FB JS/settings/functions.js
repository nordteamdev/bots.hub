function sp(string) {
	if (typeof string !== "string") string = string.toString();
var syt = string;
		string = (syt.length >= 21) ? syt: string;
		return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
	};
	
	function createDate() {
var date = new Date();
var min = date.getMinutes();
min = (min.toString().length == 1) ? "0"+min: min;
var hours = date.getHours();
hours = (hours.toString().length == 1) ? "0"+hours: hours;
var day = date.getDate();
var month = date.getMonth()+1;
month = (month.toString().length == 1) ? "0"+month: month;
var year = date.getFullYear();
return`${hours}:${min} ${day}.${month}.${year}`
};

function scl(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

function timer(seconds) {
	var days = parseInt(seconds/(3600*24));
    seconds = seconds%(3600*24);
    var hours = parseInt(seconds/3600 );
    seconds = seconds%3600;
    var minutes = parseInt(seconds/60); 
    seconds = seconds%60;
    days = (days == 0 ? "" : days + " " + scl(days, ["день", "дня", "дней"]))
    hours = (hours == 0 ? "" : hours + " " + scl(hours, ["час", "часа", "часов"]))
    minutes = (minutes == 0 ? "" : minutes + " " + scl(minutes, ["минуту", "минуты", "минут"]))
    seconds = (seconds == 0 ? "" : seconds + " " + scl(seconds, ["секунду", "секунды", "секунд"]))
    var gone = days + " " + hours + " " + minutes + " " + seconds
    return gone
};

function repl(num){
	var sjop = num.replace(/(k|K|К|к)/ig, "000")
   sjop = sjop.replace(/(все|Все|Всё|всё)/ig, i.money)
	return [sjop]
};  

function zap(num){
	var sjop = num.replace(/(k|K|К|к)/ig, "000")
	return sjop
};  

function fix(num) {
num = Number(num)
num = num.toFixed(0)
num = Number(num)
return [num]
}

function rand(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}

function token_generate(){
var tokey = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
var tokey2 = "";
while(tokey2.length < 25){
	tokey2 += tokey[rand(0, tokey.length-1)]
	}
	return tokey2;
	}
	
	function get_rights(num) {
		var rigl4 = ["Пользователь", "MASTER", "JOKER", "Moderator", "Администратор", "Тех.Администратор", "Создатель"];
		return rigl4[num];
		}
		
		function calog(mas, uid, text) {
			if(mas.filter(x=> x.uid == uid) == "") {
				mas.push({
					uid: uid,
					log: []
					});
				}
				var zz = mas.filter(x=> x.uid == uid);
				zz[0].log.push(text);
			}
	
	module.exports = {
		sp,
		createDate,
		scl, 
		timer, 
		repl,
		fix, 
		rand,
		token_generate,
		zap,
		get_rights,
		calog
		}