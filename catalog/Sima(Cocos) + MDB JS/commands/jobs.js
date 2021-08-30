const {Command, Utils} = require('cocoscore')
const moment = require("moment");
moment.locale("ru");

const works =  [
{ name: 'Дворник', lvl: 0, min: 2000, max: 5000, id: 1},
{ name: 'Сантехник', lvl: 36, min: 15000, max: 25000, id: 2},
{ name: 'Электрик', lvl: 72, min: 50000, max: 75000, id: 3},
{ name: 'Слесарь', lvl: 122, min: 100000, max: 150000, id: 4},
{ name: 'Юрист', lvl: 210, min: 250000, max: 350000, id: 5},
{ name: 'Бухгалтер', lvl: 310, min: 550000, max: 800000, id: 6},
{ name: 'Бармен', lvl: 410, min: 1500000, max: 2500000, id: 7},
{ name: 'Администратор', lvl: 510, min: 5000000, max: 10000000, id: 8},
{ name: 'Программист', lvl: 610, min: 50000000, max: 100000000, id: 9},
{ name: 'Директор SimaBot', lvl: 10000, min: 1000000000000, max: 5000000000000, id: 10}
]

module.exports = [
	new Command({
		trigger: /^(?:работа|работы)\s?([0-9]+)?/i,
		type: "osnovnoe",
		name: "Работы",
		description: "Список работ",
		emoji: "👔",
		handler(ctx, bot) {
			if(!ctx.body[1]) {
			return ctx.send(`работы:
			${works.filter((x) => x.lvl <= ctx.user.work_lvl).map((x, i) => `🔹 ${i + 1}. ${x.name}\nЗарплата: ${x.min.toLocaleString()}$`).join("\n")}
		
			ℹ Что бы устроиться, напишите "Работа [номер]"`);
		}

	const work = works.find((x) => x.id == ctx.body[1]);
	if(!work) return console.info(work);

	if(ctx.user.work) return ctx.send(`у вас уже есть работа!`);

	if(work.lvl > ctx.user.lvl) return ctx.send(`вы не можете устроиться на эту работу!`);
	else if(work.lvl <= ctx.user.work_lvl) {
		ctx.user.set("work", work.id);
		return ctx.send(`вы успешно устроились на работу "${work.name}"`);
	}
}
}),
	new Command({
	trigger: /^работать/i,
		type: "osnovnoe",
		name: "Работать",
		description: "отработать",
		emoji: "👔",
	async handler(ctx, bot) {
		if(!ctx.user.work) return ctx.send(`вы нигде не работаете.\nЧто бы устроиться на работу, напишите "Работы"`);
    	if(ctx.user.work_time > getUnix()) return ctx.send(`рабочая неделя закончена\nВы сможете работать через ${unixStampLeft(ctx.user.work_time - Date.now())}`);
ctx.user.set('work_time', getUnix() + 600000)
    let w = works.find((x) => x.id === ctx.user.work);
    let earn = Utils.getRandomInRange(w.min, w.max);
    let lvl = Utils.getRandomInRange(1, 7);

    ctx.user.balance += earn;
    ctx.user.work_lvl += lvl;

    return ctx.send(`Рабочий день окончен.\nВы заработали ${earn.toLocaleString()}$`);
	}
}),
    new Command({
    trigger: /^уволиться/i,
        type: "osnovnoe",
        name: "Уволиться",
        description: "уволиться с работы",
        emoji: "👔",
    async handler(ctx, bot) {
        if (!ctx.user.work) return ctx.send(`У Вас нет работы.`);
    ctx.user.work = false;
    return ctx.send(`вы успешно уволились.`);
    }
})
]


function getUnix() {
    return Date.now();
}
//--------------------------------\\
function unixStamp(stamp) {
    let date = new Date(stamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixTime(stamp) {
    let date = new Date(stamp),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${hour}:${mins}:${secs}`;
}
//--------------------------------\\
function unixStampLeft(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + ":";
    if(h > 0) text += Math.floor(h) + ":";
    if(m > 0) text += Math.floor(m) + ":";
    if(s > 0) text += Math.floor(s) + "";
    return text;
}
//------------------------------------------------------------------\\
function unixstm(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + " Days ";
    if(h > 0) text += Math.floor(h) + " Hours ";
    if(m > 0) text += Math.floor(m) + " Minutes. ";
    if(s > 0) text += Math.floor(s) + " Seconds";
    return text;
}