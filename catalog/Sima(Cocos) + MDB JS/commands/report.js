const { Command, Utils } = require('cocoscore');
const request = require('request')

module.exports = new Command({
    trigger: /^(?:репорт)\s(.*)?$/i,
    type: "osnovnoe",
    name: 'Репорт [Жалоба/пожелание]',
    description: 'связь с Администрацией',
    emoji: '🆘',
    handler(ctx, bot) {
        if(ctx.user.banreport != false) return ctx.send("⚠ Вам запрещено обращаться в репорт.")
           bot.vk.api.call('messages.send', {
            chat_id: 277,
            message: `[REPORT]\n От игрока @id${ctx.user.vkId}\n\n- ${ctx.body[1]}`,
            random_id: 0
           })
        ctx.send(`Ваше сообщение было отправлено, ожидайте ответа.`);
    }
})