const Bot = require("./bot");
const bot = new Bot(require("./config"));

bot.on({
    pattern: /^test/i,
    async run(ctx) {
        return ctx.answer("привет!");
    }
});

bot.start();