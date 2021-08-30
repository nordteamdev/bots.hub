const {Command} = require('cocoscore')

 module.exports = new Command({
	trigger: /^scr\s(.*)/i,
	async handler(ctx, bot) {
 ctx.sendPhoto("http://mini.s-shot.ru/1024x768/1024/png/?" + ctx.body[1])
}
})
