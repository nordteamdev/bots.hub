const {Command, Utils} = require('cocoscore')

module.exports = new Command({
	trigger: /^(?:ключ)\s(.*)/is,
	name: 'Ключ [ключ]',
	description: 'активация ключа.',
	emoji: '🔑',
	async handler(ctx, bot) {
	let $key = await bot.db.getModel('keys').findOne({ key: ctx.body[1].toUpperCase() });
	if(!$key) return ctx.send(`ключ не найден!`);
	if($key.users.indexOf(ctx.senderId) !== -1) return ctx.send(`вы уже активировали этот промокод.`);

	if($key.users.length >= $key.activation) {
		await $key.remove();
		return ctx.send(`ключ закончился...`);
	}

	$key.users.push(ctx.senderId);
	await $key.save();

	ctx.user.balance += $key.balance;
	return ctx.send(`вы успешно активировали ключ!\n\n🆕 Осталось активаций: ${$key.activation - $key.users.length}\n💰 Вы получили ${$key.balance.toLocaleString()}$`);
}
});