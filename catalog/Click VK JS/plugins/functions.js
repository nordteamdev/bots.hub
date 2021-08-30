const fs = require("fs") 
 
/*----------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/
 
function time() {
	let date = new Date();
	let days = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;
	var times = hours + ':' + minutes + ':' + seconds
	return times;
}
/*----------------------------------------------------------------------------------------------------------*/
function data() {
	var date = new Date();
	let days = date.getDate();
	let month = date.getMonth() + 1; 
	if (month < 10) month = "0" + month;
	if (days < 10) days = "0" + days;
	var datas = days + ':' + month + ':2018' ;
	return datas;
}
/*----------------------------------------------------------------------------------------------------------*/
function spaces(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(",").split("").reverse().join("");
};
/*----------------------------------------------------------------------------------------------------------*/ 
function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
/*----------------------------------------------------------------------------------------------------------*/
Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; }
/*----------------------------------------------------------------------------------------------------------*/
function user_id(user){
	for (i in acc.users) {
		if (i == user) {
			return acc.users[i].id
		}
	}
}

module.exports = { 
	time,
	data,
	spaces, 
	rand,
	user_id
}