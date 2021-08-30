let pluginList = [];
const files = require('fs');
const logger = require('./logger.js');
const users = require('./db.js').users;
const config = require('../config.json');
const usage = new RegExp(config.usage, 'i');
const events = {'chat_kick_user': 'onKick', 'chat_invite_user': 'onInvite', 'chat_title_update': 'onUpdateTitle', 'chat_photo_update': 'onUpdatePhoto', 'chat_photo_remove': 'onDeletePhoto'};
function load(vk) {
    files.readdir('plugins', async (err, files) => {
        let plugins = files.filter((file) => /.js$/i.test(file));
        plugins.forEach(async (file) => {
            try {
                let plugin = await require('../plugins/' + file);
                pluginList.push(plugin);
                logger.info('Плагин ' + plugin.name + ' был запущен.');
            } catch (error) {
                logger.error(error);
            }
        });
    });
    vk.updates.use(async (context, next) => {
        try {
            if (context.is('message')) {
                if (process.argv[2] == 'vladik' && context.getChatId() == 11) {
                    return next();
                }
                if (context.getSenderId() == config.botId) {
                    await pluginList.filter((plugin) => plugin.onBotMessage != undefined).forEach(async (plugin) => {
                        await plugin.onBotMessage(context);
                    });
                    if (process.argv[2] != 'vladik') {
                        return next();
                    }
                }
                if (users.get(context.getSenderId()) == null) {
                    users.set(context.getSenderId(), {
                        level: 0,
                        prefix: 'Новичек',
                        ban: null
                    });
                    await pluginList.filter((plugin) => plugin.onFirstMessage != undefined).forEach(async (plugin) => {
                        await plugin.onFirstMessage(context);
                    });
                    users.save();
                }
                const pluginUserList = pluginList.filter((plugin) => plugin.hearBanned === true || users.getNested(context.getSenderId() + '.ban') === null);
                const current = pluginUserList.filter((pl) => {
                    return (pl.isOnState !== undefined && pl.onState !== undefined  && pl.isOnState(context) === true);
                });
                if (current.length != 0) {
                    await current.forEach(async (plugin) => {
                        await plugin.onState(context);
                    });
                    return next();
                }
                if (context.isEvent() !== true && context.hasText() && usage.test(context.text)) {  
                    context.text = context.text.replace(usage, '');
                    let command = undefined;
                    await pluginUserList.forEach(async (plugin) => {
                        command = testCommand(context.text, plugin.commands);
                        if (command == undefined) {
                            return;
                        }
                        context.$match = context.text.match(command instanceof RegExp ? command : new RegExp('^' + command + '$'));
                        if ((plugin.level || 0) > users.getNested(context.getSenderId() + '.level')) {
                            return;
                        }
                        try {
                            await plugin.onCommand(context);
                        } catch (e) {
                            logger.error('В плагине ' + plugin.name + ' произошла ошибка');                           
                            logger.error(e);
                        }
                    });
                    if (command == undefined) {
                        await pluginUserList.filter((plugin) => plugin.onMessage != undefined).forEach(async (plugin) => {
                            await plugin.onMessage(context); 
                        });
                    }
                } else if (context.isEvent()) {
                    await pluginUserList.filter((plugin) => plugin[events[context.getEventType()]] != undefined).forEach(async (plugin) => {
                        await plugin[events[context.getEventType()]](context);
                    });
                } else {
                    await pluginUserList.filter((plugin) => plugin.onMessage != undefined).forEach(async (plugin) => {
                       await plugin.onMessage(context); 
                    });
                }
            }
            next();
        } catch (error) {
            logger.error(error);
        }
    });
}

function testCommand(str, commands) {
    if (Array.isArray(commands)) {
        let command = undefined;
        if (commands.filter((regex) => {
            command = regex;
            return regex.test(str);
        }).length <= 0) {
            return;
        }
        return command;
    } else if (commands != undefined && commands.test(str)) {
        return commands;
    }
    return;
}
module.exports = {load: load, plugins: pluginList};