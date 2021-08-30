const { Command, Utils } = require('cocoscore');

module.exports = new Command({
    trigger: /^пом[ао]щь|начать?$/i,
    handler(ctx, bot) {
         let osnovnoe = bot.commander.commands
            .filter((command) => command.type == "osnovnoe")
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n⠀');
        let razvl = bot.commander.commands
            .filter((command) => command.type == "razvl")
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n⠀');
         let game = bot.commander.commands
            .filter((command) => command.type == "game")
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n⠀');
         let raznoe = bot.commander.commands
            .filter((command) => command.type == "raznoe")
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n⠀');        

        let commands = bot.commander.commands
            .filter((command) => command.name)
            .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
            .join('\n');

        ctx.send(`Команды:\n\n📕 Основные:\n⠀${osnovnoe}\n\n🎉 Развлечения:\n⠀${razvl}\n\n🕹 Игры:\n⠀${game}\n\n💡 Разное:\n⠀${raznoe}\n\n${ctx.user.permission > 0 ? `✅ ADMIN - Панель администратора.` : ``}`);
    }
});