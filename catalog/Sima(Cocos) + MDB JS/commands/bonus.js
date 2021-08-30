const { Command, Utils } = require('cocoscore');
const moment = require("moment");
moment.locale("ru");

module.exports = new Command({
trigger: /^бонус?$/i,
type: "osnovnoe",
name: 'Бонус',
description: 'получить ежедневный бонус',
emoji: '💠',
async handler(ctx, bot) {
    if(ctx.user.bonus > getUnix()) return ctx.send(`следующий бонус через ${unixStampLeft(ctx.user.bonus - Date.now())}`);
       ctx.user.set('bonus', getUnix() + 86400000)
           let prize = Utils.getRandomElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
              if(prize === 1) { ctx.user.balance += 10000000; return ctx.send(`вы выиграли 10.000.000$\n💵 Деньги: ${ctx.user.balance.toLocaleString()}$`); }
                  if(prize === 2) { ctx.user.bitcoin += 10000; return ctx.send(`вы выиграли 1000฿\n🌐 Биткоины: ${ctx.user.bitcoin.toLocaleString()}`); }
                      if(prize === 3) { ctx.user.rating += 3; return ctx.send(`вы выиграли 3👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                        if(prize === 4) { ctx.user.rating += 1; return ctx.send(`вы выиграли 1👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                            if(prize === 5) { ctx.user.rating += 1; return ctx.send(`вы выиграли 1👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                                if(prize === 6) { ctx.user.rating += 2; return ctx.send(`вы выиграли 2👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                            if(prize === 7) { ctx.user.rating += 3; return ctx.send(`вы выиграли 3👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                        if(prize === 8) { ctx.user.rating += 3; return ctx.send(`вы выиграли 3👑!\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}`); }
                    if(prize === 9) { ctx.user.bank += 100000; return ctx.send(`вы выиграли 100.000$ на свой банковский счёт!\n💳 В банке: ${ctx.user.bank.toLocaleString()}$`); }
                if(prize === 10) { ctx.user.bank += 500000; return ctx.send(`вы выиграли 500.000$ на свой банковский счёт!\n💳 В банке: ${ctx.user.bank.toLocaleString()}$`); }
            if(prize === 11) { ctx.user.bank += 1000000; return ctx.send(`вы выиграли 1.000.000$ на свой банковский счёт!\n💳 В банке: ${ctx.user.bank.toLocaleString()}$`); }
        if(prize === 12) { ctx.user.bank += 5000000; return ctx.send(`вы выиграли 5.000.000$ на свой банковский счёт!\n💳 В банке: ${ctx.user.bank.toLocaleString()}$`); }
    }
})

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
    if(d > 0) text += Math.floor(d) + " д. ";
    if(h > 0) text += Math.floor(h) + " ч. ";
    if(m > 0) text += Math.floor(m) + " м.";
    if(s > 0) text += Math.floor(s) + " с. ";
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