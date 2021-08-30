const { Command, Utils } = require('cocoscore');

module.exports = new Command({
    trigger: /^(?:ник)\s(.*)?$/i,
    type: "osnovnoe",
    name: 'Ник [nick]',
    description: 'сменить ник',
    emoji: '📝',
    async handler(ctx,bot) {
        let a = /\.com|\.ru|\.net|\.org|\.su|\.me/
        if(a.test(ctx.body[1]) == true) return ctx.error(`придумайте другой Ник!`)
    	if(ctx.body[1].length > 10) return ctx.send(`Ваш ник превышает лимит в 10 символов!`)
    		ctx.user.set("nickname", ctx.body[1])
    	ctx.send(`Вы успешно сменили свой ник на "${ctx.body[1]}"`)
    }
})