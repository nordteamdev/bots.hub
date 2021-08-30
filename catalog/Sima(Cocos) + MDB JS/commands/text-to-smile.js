const {Command} = require('cocoscore')

module.exports = new Command({
	trigger: /^createtext|text|ct\n(.*)\s(.*)\n(.*)/i,
	handler(ctx, bot) {
		const t = require('emojify-text')
	let a = t({ 
     	bg: `${ctx.body[1]}`, 
     	fg: `${ctx.body[2]}` 
	}, `${ctx.body[3]}`) 

 ctx.send(`\n${a}`)
	}
})