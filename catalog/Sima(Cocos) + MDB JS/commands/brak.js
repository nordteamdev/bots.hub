const {Command} = require('cocoscore')

module.exports = [
new Command({
	trigger: /^брак\s(.*)/i,
	type: "raznoe",
	name: "Брак [ссылка]",
	description: "сделать предложение.",
	emoji: "💍",
	async handler(ctx, bot) {
		 let user = await bot.vk.snippets.resolveResource(ctx.body[1])
     		if(!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
        		let userFound = await bot.db.getModel('user').findOne({vkId: userId});	

	if(ctx.user.partner) return ctx.send(`У вас уже есть партнёр!`);
	//if(Number(ctx.body[1]) === ctx.user.vkId) return ctx.send(`ты чё, кто на себе то женится?`);

	if(userFound.partner) return ctx.send(`этот человек уже состоит в браке`);
	if(userFound.requests.find(x=> x == userId)) return ctx.send(`вы уже делали предложение этому игроку`);
	if(ctx.user.requests.find(x=> x == userId))
	{
		ctx.user.requests = [];
		ctx.user.partner = userFound.vkId;

		userFound.requests = [];
		userFound.partner = ctx.user.vkId;
		userFound.save();

		return ctx.send(`вы вступили в брак с игроком "${userFound.nickname}"`);
	}

	userFound.requests.push(ctx.user.vkId);
	userFound.save()

	bot.vk.api.call('messages.send', {user_id: userFound.vkId, message: `💍 Кто-то сделал вам предложение.\nℹ Напишите "Браки", что бы посмотреть предложения.`, random_id: 0})
	return ctx.send(`вы сделали предложение игроку "${userFound.nickname}"`);
}
}),
new Command({
	trigger: /^браки/i,
		type: "raznoe",
	name: "Браки",
	description: "Список браков",
	emoji: "⠀⠀📃",
	async handler(ctx, bot) {
		if(ctx.user.requests.length < 1) return ctx.send(`вам ещё не делали предложений.`)
		let a = ctx.user.requests.map((x) => `- @id${x}`).join('\n')
		if(ctx.user.partner) return ctx.send(`вы уже состоите в браке`);
		return ctx.send(`предложения:\n ${a}\n\nℹ Что бы вступить в брак с одним из этих, напишите "Брак [ID]`);
	}
}),
new Command({
	trigger: /^развод/i,
		type: "raznoe",
	name: "Развод",
	description: "развестись",
	emoji: "⠀⠀💔",
	async handler(ctx, bot) {
	let userFound = await bot.db.getModel('user').findOne({vkId: ctx.user.partner});
	if(!ctx.user.partner) return ctx.send(`вы не состоите в браке`);

	userFound.partner = 0;
	ctx.user.partner = 0;

	userFound.save()
	return ctx.send(`вы теперь свободный человек`);
}
})
]