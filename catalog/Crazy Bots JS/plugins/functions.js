const accs = require("../data/accs.json")
const clans = require("../data/clans.json")
const rights = require("../data/rights.json")
const config = require("../settings/config.js")
const vk = require("VK-Promise")(config.token)
const links = require("../data/filters_links.json")
const fs = require("fs")
function decode(text) { //Расшифровчик слов (В разработке)
	var abc = {
		"1101000010111001": "й",
		"1101000110000110": "ц",
		"1101000110000011": "у",
		"1101000010111010": "к",
		"1101000010111010": "е",
		"1101000010111101": "н",
		"1101000010110011": "г",
		"1101000110001000": "ш",
		"1101000110001001": "щ",
		"1101000010110111": "з",
		"1101000110000101": "х",
		"1101000110001010": "ъ",
		"1101000110000100": "ф",
		"1101000110001011": "ы",
		"1101000010110010": "в",
		"1101000010110000": "а",
		"1101000010111111": "п",
		"1101000110000000": "р",
		"1101000010111110": "о",
		"1101000010111011": "л",
		"1101000010110100": "д",
		"1101000010110110": "ж",
		"1101000110001101": "э",
		"1101000110001111": "я",
		"1101000110000111": "ч",
		"1101000110000001": "с",
		"1101000010111100": "м",
		"1101000010111000": "и",
		"1101000110000010": "т",
		"1101000110001100": "ь",
		"1101000010110001": "б",
		"1101000110001110": "ю",
		"1101000110010001": "ё"
	}
	const replacer = function (f) { return abc[f] || f }
	const hz = text.toString().replace(/([^]+)/ig, replacer)
	return hz
}
function wait(ms) {
	var start = new Date().getTime()
	while ((new Date().getTime() - start) < ms) { }
	return 1
}
function gap(min, max) {
	var hui = []
	for (; min <= max; min++) {
		hui.push(min)
	}
	return hui
}
function nick(id, type) {
	if (accs.some(a => a.id == id) && type == 1) {
		return accs.filter(a => a.id == id).map(a => a.nickname) + ", "
	} else if (accs.some(a => a.id == id) && type == 2) {
		return accs.filter(a => a.id == id).map(a => a.nickname)
	} else {
		return ""
	}
}
function time(type) {
	const time = new Date()
	if (time.getSeconds().toString().length == 1) {
		var sec = "0" + time.getSeconds()
	} else {
		var sec = time.getSeconds()
	}
	if (time.getMinutes().toString().length == 1) {
		var min = "0" + time.getMinutes()
	} else {
		var min = time.getMinutes()
	}
	if (time.getDate().toString().length == 1) {
		var date = "0" + time.getDate()
	} else {
		var date = time.getDate()
	}
	if (time.getHours().toString().length == 1) {
		var hour = "0" + time.getHours()
	} else {
		var hour = time.getHours()
	}
	if (time.getMonth().toString().length == 1) {
		var mon = "0" + time.getMonth()
	} else {
		var mon = time.getMonth()
	}
	if (type == 1) {
		const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
		var gone = "📅 Дата: " + date + " " + mes[time.getMonth()] + " " + time.getFullYear() + " г. (" + wdays[time.getDay()] + ")\n⏰ Время: " + hour + ":" + min + ":" + sec
		return gone
	}
	if (type == 2) {
		return date + "." + mon + "." + time.getFullYear() + " " + hour + ":" + min + ":" + sec
	}
	if(type == 3){
		const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
		const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		return {data:{date: date, mes: mes[time.getMonth()], year: time.getFullYear(), wdays: wdays[time.getDay()]}, time:{hour: hour, min: min, sec: sec}}
	}
}
function rand(text) {
	var tts = Math.floor(text.length * Math.random())
	return text[tts]
}
var funct = Array.prototype.random = function () {
	return this[Math.floor(this.length * Math.random())]
}
function search(re, str) {
	if (!str.some(a => a.chic == re)) {
		return false
	} else {
		return true
	}
}
function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
function getRights(uuid) {
	var i = accs.filter(a => a.id == uuid).map(a => a.uid)
	var r = accs[i].rights
	if (r == 0) {
		var ri = "Пользователь"
	} else if (r == 1) {
		var ri = "Вип"
	} else if (r == 2) {
		var ri = "Премиум"
	} else if (r == 3) {
		var ri = "Модератор"
	} else if (r == 4) {
		var ri = "Администратор"
	} else if (r == 5) {
		var ri = "Смотритель"
	} else if (r == 6) {
		var ri = "Разработчик"
	} else if (r == 7) {
		var ri = "Системный Разработчик"
	} else {
		var ri = "Создатель Бота"
	}
	return ri
}
function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min
}
function getClan(uuid) {
	var i = accs.filter(a => a.id == uuid).map(a => a.clan_uid)
	if (i != -1) {
		var cf = clans[i].name
	}
	if (i == -1) {
		var cf = "Нет клана"
	}
	return cf
}
function filter(text) {
	var filter0 = text.search(/(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/);
	var filter1 = text.search(/(http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/);
	if (filter0 != -1 || filter1 != -1) {
		return false
	} else {
		return true
	}
}
function encode(text) {
	const right = text.toLowerCase()
	const abc = {
		"й": "1101000010111001",
		"ц": "1101000110000110",
		"у": "1101000110000011",
		"к": "1101000010111010",
		"е": "1101000010111010",
		"н": "1101000010111101",
		"г": "1101000010110011",
		"ш": "1101000110001000",
		"щ": "1101000110001001",
		"з": "1101000010110111",
		"х": "1101000110000101",
		"ъ": "1101000110001010",
		"ф": "1101000110000100",
		"ы": "1101000110001011",
		"в": "1101000010110010",
		"а": "1101000010110000",
		"п": "1101000010111111",
		"р": "1101000110000000",
		"о": "1101000010111110",
		"л": "1101000010111011",
		"д": "1101000010110100",
		"ж": "1101000010110110",
		"э": "1101000110001101",
		"я": "1101000110001111",
		"ч": "1101000110000111",
		"с": "1101000110000001",
		"м": "1101000010111100",
		"и": "1101000010111000",
		"т": "1101000110000010",
		"ь": "1101000110001100",
		"б": "1101000010110001",
		"ю": "1101000110001110",
		"ё": "1101000110010001"
	}
	const replacer = function (f) { return abc[f] || f }
	const hz = right.replace(/[А-яёЁ]/g, replacer)
	return hz
}
function replace(text) {
	const suf = "&#8419;"
	const replacer = function (a) { return a + suf || a}
	const a = text.toString().replace(/[0-9]/ig, replacer)
	return a
}
function dostup(num) {
	if (num == 1) return "c Випа"
	if (num == 2) return "c Премиума"
	if (num == 3) return "c Модератора"
	if (num == 4) return "c Администратора"
	if (num == 5) return "с Смотрителя"
	if (num == 6) return "С Разработчика"
	if (num == 7) return "только Системную Разработчику"
	if (num == 8) return "только Создателю Бота"
}
function password(text) {
	charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < text; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return retVal;
}
function generation(a, b, c) {
	var array = []
	for (var i = 1; i <= c; i++) {
		array.push(getRandomInt(a, b))
	}
	return array
}
function check(text, nexus) {
	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true
	}else{
		var check = false
	}
	if(!check) return nexus(false)
	if (check == true) {
		if(lol){
          var lolik = text.match(filter0)[0]
		}else{
		  var lolik = text.match(filter1)[0]
		}
		console.log(JSON.stringify(lolik))
		vk("utils.checkLink", {url: lolik}).then((res) => {
			const pizda = res.status == "banned" ? true : false
			nexus(pizda)
		})
	}
}
module.exports = {
	decode,
	wait,
	time,
	rand,
	search,
	getRights,
	getRandomInt,
	getClan,
	filter,
	encode,
	replace,
	declOfNum,
	gap,
	nick,
	dostup,
	password,
	generation,
	check
}