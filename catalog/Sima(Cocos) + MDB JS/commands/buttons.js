const { Command, Utils } = require('cocoscore');
const { generateKeyboard } = require('../functions.js')
const { Keyboard } = require('vk-io')

module.exports = [
new Command({
    trigger: /^(?:кнопка)\s(.*)?$/i,
    type: "raznoe",
    name: 'Кнопка [текст]',
    description: 'кнопки',
    emoji: '⌨',
    async handler(ctx,bot) {
    	if(ctx.chatId === 1 && ctx.senderId !== 347241116) return ctx.reply(`В данной беседе запрещено добавлять кнопки!`);

		if(ctx.user.buttons.length >= 40) return ctx.reply(`Ваше поле заполнено! (40/40)
		Для очистки поля используйте: Кнопка удалить`);

		ctx.user.buttons.push(ctx.body[1]);
		await ctx.user.save();

		await ctx.send(`кнопка успешно добавлена!`, {
			keyboard: generateKeyboard(ctx.user.buttons)
		});
    }
}),
new Command({
    trigger: /^(?:очистить кнопки)$/i,
    type: "raznoe",
    name: 'Очистить кнопки',
    description: 'очистить все кнопки',
    emoji: '✖',
    async handler(ctx,bot) {
    	ctx.user.set("buttons", []);
		return ctx.send(`вы очистили все кнопки!
		Для добавления новых используйте: Кнопка [Текст]`, {
			keyboard: Keyboard.keyboard([])
		});
    }
})
]