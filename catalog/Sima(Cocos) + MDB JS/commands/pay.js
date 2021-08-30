const {Command, Utils} = require('cocoscore')

module.exports = new Command({
    trigger: /^(?:Передать|pay)\s(.*)\s(.+)/is,
    type: "osnovnoe",
    name: 'Передать [ссылка] [сумма]',
    description: 'передача денег',
    emoji: '🔁',
    async handler(ctx, bot) {
        var userId
        var amount = Number(ctx.body[2])
        if(amount > ctx.user.balance) return ctx.send(`недостаточно средств для передачи.`)
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if(!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
        let userFound = await bot.db.getModel('user').findOne({
                vkId: userId
            });
        if(!userFound) return ctx.error('пользователь не найден.');

            ctx.user.balance -= amount
        userFound.balance += amount
        userFound.save()
        bot.vk.api.call('messages.send', {user_id: userFound.vkId, message: `[УВЕДОМЛЕНИЕ]\n👤 Игрок @id${ctx.user.vkId} (${ctx.user.nickname}) перевёл вам ${amount.toLocaleString()}$`, random_id: 0})
        return ctx.send(`Вы успешно передали пользователю [id${userFound.vkId}|${userFound.nickname}] ${amount.toLocaleString()}$`)
    }
})