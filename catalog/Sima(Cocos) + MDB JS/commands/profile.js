const { Command, Utils } = require('cocoscore');
const {works} = require('../works.js')
const frm = new Intl.NumberFormat('en');

module.exports = new Command({
    trigger: /^проф[еи]ль?$/i,
    type: "osnovnoe",
    name: 'Профиль',
    description: 'Ваш профиль',
    emoji: '👤',
   async handler(ctx, bot) {
        let userFound = await bot.db.getModel('user').findOne({vkId: ctx.user.partner});  
        let text = ``;
    ctx.append = (_text) => text += _text+"\n";
        ctx.append(`ваш профиль:`)
		ctx.append(`🔎 ID: ${ctx.user.vkId}`)
		ctx.append(`💰 Денег: ${frm.format(ctx.user.balance)}$`)
		ctx.append(`🌐 Биткоинов: ${frm.format(ctx.user.bitcoin)}`)
		ctx.append(`👑 Рейтинг: ${frm.format(ctx.user.rating)}`)
        if(ctx.user.work) ctx.append("👔 Работа: " + works.find((x) => x.id === ctx.user.work).name);
        if(ctx.user.partner) ctx.append(`💍 В браке с: @id${userFound.vkId} (${userFound.nickname})`);

        if(ctx.user.home || ctx.user.apartment || ctx.user.phone || ctx.user.airplane || ctx.user.car || ctx.user.yacht || ctx.user.pit) ctx.append("\n🔑 Имущество:");
        if(ctx.user.pit) ctx.append(`⠀🐼 Питомец: ${ctx.user.pit}`);
        if(ctx.user.car) ctx.append(`⠀🚘 Машина: ${ctx.user.car}`);
        if(ctx.user.airplane) ctx.append(`⠀✈ Самолёт: ${ctx.user.airplane}`);
        if(ctx.user.home) ctx.append(`⠀🏠 Дом: ${ctx.user.home}`);
        if(ctx.user.apartment) ctx.append(`⠀🌇 Квартира: ${ctx.user.apartment}`);
        if(ctx.user.phone) ctx.append(`⠀📱 Телефон: ${ctx.user.phone}`);
        if(ctx.user.yacht) ctx.append(`⠀🛥 Яхта: ${ctx.user.yacht}`);


        ctx.append(`\n📗 Дата регистрации: ${ctx.user.regDate}`);
        ctx.send(text, {emoji: `${ctx.user.prefix ? `[${ctx.user.prefix}]` : ``}`})
    }
});

