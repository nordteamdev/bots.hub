const users        = require('./../utils/db.js').users;
let plugin         = {};
plugin.name        = 'note';
plugin.description = 'запоминает, напоминает или забывает текст';
plugin.usage       = 'запомни, напомни, забудь';
plugin.commands    = [/^(запомни|напомни|забудь)/i];
plugin.level       = 0;
plugin.onCommand   = async (context) => {
    if (context.$match[1].toLowerCase() == 'забудь') {
        if (users.getNested(context.getUserId() + '.note') == null) {
            await context.send('А что забыть-то?')
            return;
        }
        users.setNested(context.getUserId() + '.note', null);
        users.save();
        await context.send('Все забыто');
    } else if (context.$match[1].toLowerCase() == 'запомни') {
        let text = context.text.replace(/^запомни/i, '').trim();
        if (text == "") {
            await context.send('Столько много я не запомню...');
            return;
        } else if (text.length >= 2000) {
            await context.send('Можно-ли еще больше?');
            return;
        }
        users.setNested(context.getUserId() + '.note', text);
        users.save();
        await context.send('Кажись, всё!');
    } else {
        if (users.getNested(context.getUserId() + '.note') == null) {
            await context.send('Разве ты говорил мне что-нибудь запомнить?');
            return;
        }
        await context.send('Вроде, ты говорил ' + users.getNested(context.getUserId() + '.note'));
    }
};
plugin.onFirstMessage = async (context) => {
    users.setNested(context.getSenderId() + '.note', null);
};
module.exports     = plugin;