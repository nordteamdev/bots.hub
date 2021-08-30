const { Command, Utils } = require('cocoscore');

module.exports = new Command({
    trigger: /^cid?$/i,
    permission: 1,
    handler(ctx) {
        ctx.send(`ChatID: ${ctx.chatId}`);
    }
});