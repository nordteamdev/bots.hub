const users        = require('./../utils/db.js').users;
let plugin         = {};
plugin.name        = 'setprefix';
plugin.description = 'установить префикс';
plugin.usage       = 'зови меня';
plugin.commands    = [/^зови меня/i];
plugin.level       = 0;
plugin.onCommand   = async (context) => {
    if (users.getNested(context.getUserId() + '.lvl') < 20) {
        await context.send('Сначала получи 20 уровень чмо');
        return;
    }
    let prefix = context.text.replace(/^зови меня/i, '').trim();
    if (prefix.length == 0 || prefix.length > 20) {
        await context.send('Могу звать тебя на гей вечеринки');
        return;
    }
    users.setNested(context.getUserId() + '.prefix', prefix);
    users.save();
    await context.send('да? Так тебе нравится?');
};
module.exports     = plugin;