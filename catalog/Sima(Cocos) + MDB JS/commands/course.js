const { Command, Utils } = require('cocoscore');
const { sp, getUnix, getTimer } = require('../functions.js')
//const request = require('request')
const fetch = require('node-fetch');
const frm = new Intl.NumberFormat('en');
let course = 0;

module.exports = [
 new Command({
    trigger: /^курс?$/i,
    type: "raznoe",
    name: 'Курс',
    description: 'курс биткоина',
    emoji: '💹',
    async handler(ctx, bot) {
        let request = await (await fetch('https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB,BTCRUB,BTCUSD&key=32d7da2983067548252da9e135daa0d9')).json();
        course = request.data.BTCUSD
        ctx.send(`курс биткоина на данный момент: ${frm.format(Math.floor(course))}$`);
    }
}),
 new Command({
    trigger: /^(?:продать биткоины)\s(.*)$/i,
    type: "raznoe",
    name: 'Продать биткоины [кол-во]',
    description: 'продать биткоины',
    emoji: '💹',
    async handler(ctx, bot) {
    ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
    ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
    ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
    ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.bitcoin);

        if(ctx.user.bitcoin < ctx.body[1]) return ctx.send(`недостаточно биткоинов для продажи.`);
            ctx.user.balance += Number(ctx.body[1] * Math.floor(course));
            ctx.user.bitcoin -= Number(ctx.body[1])
            ctx.send(`вы продали ${frm.format(ctx.body[1])} ${Utils.declOfNum(ctx.body[1], ['биткоин', 'биткоина', 'биткоинов'])} за ${frm.format(ctx.body[1] * Math.floor(course))}$`);
}
}),
 new Command({
    trigger: /^(?:биткоин)\s(.*)$/i,
    type: "raznoe",
    name: 'Биткоин [кол-во]',
    description: 'купить биткоины',
    emoji: '💹',
    async handler(ctx, bot) {
    	ctx.body[1] = ctx.body[1].replace(/(\.|\,)/ig, '');
    ctx.body[1] = ctx.body[1].replace(/(к|k)/ig, '000');
    ctx.body[1] = ctx.body[1].replace(/(м|m)/ig, '000000');
    ctx.body[1] = ctx.body[1].replace(/(вабанк|вобанк|все|всё)/ig, ctx.user.balance);

        if(ctx.user.balance < ctx.body[1] * course) return ctx.send(`недостаточно денег.`);
            ctx.user.balance -= Number(ctx.body[1] * Math.floor(course));
            ctx.user.bitcoin += Number(ctx.body[1])
            ctx.send(`вы купили ${frm.format(ctx.body[1])} ${Utils.declOfNum(ctx.body[1], ['биткоин', 'биткоина', 'биткоинов'])} за ${frm.format(ctx.body[1] * Math.floor(course))}$`);
}
})
]