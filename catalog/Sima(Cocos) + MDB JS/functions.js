const { Utils } = require('cocoscore');
const { Keyboard } = require('vk-io')
const moment = require("moment");
moment.locale("ru");

/*function sp(string) {
	if (typeof string !== "string") string = string.toString();
	return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");
};
*/
function getUnix() { return Math.floor(Date.now() / 1000); }

function getTimer(unixtime, step, format = "mm:ss") {
    return moment.utc((moment((unixtime+step) * 1000).diff(moment((getUnix())*1000)))).format(format);
}


function unixTime(stamp) {
    let date = new Date(stamp),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${hour}:${mins}`;
}

function timer(stamp){
var a = new Date(stamp * 1000);
var date = a.getDate();
var hour = a.getHours() < 10 ? "0" +a.getHours() : a.getHours();
var min = a.getMinutes() < 10 ? "0" +a.getMinutes() : a.getMinutes();
var sec = a.getSeconds() < 10 ? "0" +a.getSeconds() : a.getSeconds();
var time = hour + ':' + min + ':' + sec ;
return time;
}


function unixStamp(stamp) {
	let date = new Date(stamp),
		year = date.getFullYear(),
		month = date.getMonth(),
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;
	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;
	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;
	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;
	let text = ``;

	if(d > 0) text += Math.floor(d) + " д. ";
	if(h > 0) text += Math.floor(h) + " ч. ";
	if(m > 0) text += Math.floor(m) + " мин. ";
	if(s > 0) text += Math.floor(s) + " с.";

	return text;
}

function sp(Number) {
	Number.toLocaleString("de-DE")
}

function generateKeyboard(array) {
	let kb = [];
	if(array.length > 40) return false;

	for (let i = 0; i < 10; i += 1) {
		if(!array.slice(i * 3, i * 3 + 3)[0]) break;
		kb.push(array.slice(i * 3, i * 3 + 3));
	}

	kb.map((arr) => {
		arr.map((button, i) => {
			arr[i] = Keyboard.textButton({
				label: button
			});
		});
	});

	return Keyboard.keyboard(kb);
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
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        var gone = + date + " " + mes[time.getMonth()] + " " + time.getFullYear() + ", " + hour + ":" + min + ":" + sec
        return gone
    }
    if (type == 3) {
        const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return {
            data: {
                date: date,
                mes: mes[time.getMonth()],
                year: time.getFullYear(),
                wdays: wdays[time.getDay()]
            },
            time: {
                hour: hour,
                min: min,
                sec: sec
            }
        }
    }
    if (type == 4) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var gone = + date + "." + mes[time.getMonth()] + "." + time.getFullYear() + " | " + hour + ":" + min + ":" + sec
        return gone
    }
     if (type == 5) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var gone = + date + "." + mes[time.getMonth()] + "." + time.getFullYear()
        return gone
    }
}


module.exports = {
	sp,
	time,
    timer,
	getUnix,
	getTimer,
	unixStamp,
	unixStampLeft,
	generateKeyboard
}