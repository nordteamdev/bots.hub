const {Command} = require('cocoscore')

module.exports = new Command({
	trigger: /^магазин/i,
	type: "osnovnoe",
	name: "Магазин",
	emoji: '🛒',
	description: "покупка имущества",
	handler(ctx, bot) {
		let shop = bot.commander.commands
            .filter((command) => command.type == "shop")
            .map((command) => `${command.emoji} ${command.name}`)
            .join('\n⠀'); 

            ctx.send(`магазин:\n⠀` + shop) 
	}
})