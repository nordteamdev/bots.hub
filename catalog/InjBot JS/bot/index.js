
const { VK } = require("vk-io");
const chalk = require('chalk');
const animation = require('chalk-animation');
const log = console.log;
const credits = [
    '╔══════════════════════════╗',
    '║     InjBot OpenSource    ║',
    '║      Made by Linius      ║',
    '║      vk.com/injbots      ║',
    '╚══════════════════════════╝',
    ''
];
animation.rainbow(credits.join("\n"));

function InjBot({ TOKEN, GROUP_ID, ADMINS }) {
    self = this;

    this.vk = new VK({
        "token": TOKEN,
        "apiMode": "parallel",
        "pollingGroupId": GROUP_ID
    });

    this.commands = [];
    this.options = { TOKEN, GROUP_ID, ADMINS };
    this.utils = require("./utils");

    this.start = async () => {
        try {
            await self.vk.updates.startPolling();
            log(`${chalk.green("[BOT]")} Polling has been started.`);
        } catch (err) {
            log(err);
        }

        self.vk.updates.use(async (ctx) => {
            if (ctx.is("message") && ctx.isOutbox) {
                return;
            }

            ctx.core = { 
                options: self.options,
                utils: self.utils 
            };
            ctx.text = ctx.text.replace(new RegExp(`\\[club${GROUP_ID}\\|[^\\]]+\\]\\s?`, "i"), "");
            let command = self.commands.find(x => x.pattern.test(ctx.text));
            if (!command) {
                return log(`${chalk.green("[MESSAGE]")} ${ ctx.senderId }/${ ctx.chatId || 0 } => ${ ctx.text.slice(0,33) }`);
            }
            
            ctx.args = ctx.text.match(command.pattern);
            ctx.body = "";
            ctx.append = (text) => ctx.body += text + "\n";
            ctx.apply = (options = {}) => ctx.send(ctx.body, options);
            ctx.answer = async (text, options = {}) => {
                let [ user ] = await self.vk.api.users.get({
                    user_ids: ctx.senderId
                });

                return ctx.send(user.first_name + ", " + text, options);
            };

            try {
                await command.run(ctx);
            } catch (err) {
                log(err);
            }
        });
    };

    this.on = (command) => {
        self.commands.push({
            pattern: command.pattern || command.r,
            description: command.description || command.d,
            admin: command.admin || false,
            run: command.run,
        });
    }
}

module.exports = InjBot;