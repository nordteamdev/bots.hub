const accs = require("./autosave.js").accs
const clans = require("./autosave.js").clans
const config = require("../settings/config.js")
const vk = require("VK-Promise")(config.token)
const fs = require("fs")
let date = require('date-and-time');
function wait(ms) {
	var start = new Date().getTime()
	while ((new Date().getTime() - start) < ms) { }
	return 1
}
function nick(id, type) {
	return type == true ? accs.filter(a=> a.id == id).map(a=> a.nickname) + ", " : ""
}
function time(){
    return date.format(new Date(), 'DD.MM.YYYY HH:mm:ss')
}
function rand(text) {
	var tts = Math.floor(text.length * Math.random())
	return text[tts]
}
function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
function getRights(uuid) {
	var i = accs.filter(a => a.id == uuid).map(a => a.uid)
	var r = accs[i].rights
	        return r == 7 ? '🔧CREATOR🔧' : (r == 6 ? 'ZAM' : (r == 5 ? 'LOOKING' : (r == 4 ? 'SUPPORT' : (r == 3 ? 'ADMIN' : (r == 2 ? 'MODERATOR' : (r == 1 ? 'VIP' : 'USER'))))))
}
function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}
function getClan(uuid) {
	var i = accs.filter(a => a.id == uuid).map(a => a.clan_uid)
	return i != -1 ? clans[i].name : ""
}
function replace(text) {
	const suf = "&#8419;"
	return text.toString().replace(/[0-9]/g, (a) => {
		return `${a}${suf}`
	})
}
function dostup(num) {
	return num == 7 ? '🔧CREATOR🔧' : (num == 6 ? 'ZAM' : (num == 5 ? 'LOOKING' : (num == 4 ? 'только SUPPORT' : (num == 3 ? 'c ADMIN' : (num == 2 ? 'c MODERATOR' : (num == 1 ? 'c VIP' : undefined))))))
}
function password(text) {
	var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var retVal = "";
	for (var i = 0, n = abc.length; i < text; ++i) {
		retVal += abc.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}
function check(text, nexus) {
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	var check = filter0.test(text) == true || filter1.test(text) == true ? true : false
	if(!check) return nexus(false)
    var lolik = lol ? text.match(filter0)[0] : text.match(filter1)[0]
	  vk("utils.checkLink", {url: lolik}).then((res) => {
		 const pizda = res.status == "banned" ? true : false
		 nexus(pizda)
	  })
}
function filter(text){
	var filter0 = text.replace(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/ig, "<LINK REMOVED>")
	var filter1 = filter0.replace(/(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ig, '<LINK REMOVED>')
	return filter1
}
module.exports = {
	wait,
	time,
	rand,
	getRights,
	getRandomInt,
	getClan,
	replace,
	declOfNum,
	nick,
	dostup,
	password,
	check,
	filter
}