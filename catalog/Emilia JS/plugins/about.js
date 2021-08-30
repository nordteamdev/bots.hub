const users        = require('./../utils/db.js').users;
let plugin         = {};
plugin.name        = 'about';
plugin.description = 'информация о твоем аккаунте';
plugin.usage       = 'о мне';
plugin.commands    = [/^о (себе|мне|[:\/0-9a-z_]+)$/i];
plugin.level       = 0;
plugin.onCommand   = async (context) => {
    let id = context.getUserId();
    if (/^[0-9a-z_]+$/.test(context.$match[1].replace(/^(http[s]:\/\/[m]?[.]?vk.com\/|[m]?[.]?vk.com\/)/i, ''))) {
        id = context.$match[1];
    }
    await context.vk.api.users.get({user_ids: id, fields: 'status'}).then(async(data) => {
        id = data[0].id;
        if (users.get(id) == null) {
            context.send('Нет в базе');
            return;
        }
        context.send('О @id' + id + ' (' + data[0].first_name + ' ' + data[0].last_name + '):<br>' + 
            'Должность: ' + ['Пользователь', 'Вип', 'Премиум', 'Модератор', 'Админ', 'Разработчик'][users.getNested(id + '.level')] + '<br>' +
            'Префикс: ' + users.getNested(id + '.prefix') + '<br>' +
            'Статус: ' + data[0].status + '<br>' +
            'Забанен:' + (users.getNested(id + '.ban') == null ? 'Нет<br>' : (
                'Да<br>' + 
                'Причина: ' + users.getNested(id + '.ban.reason') + '<br>' +
                'Забанил: @id' + users.getNested(id + '.ban.banner') + '<br>')) +
            'Опыт: ' + users.getNested(id + '.exp') + '(' + users.getNested(id + '.lvl') + ' уровень)'
        );
    }).catch(() => {
            context.send('Нет пользователя с таким айди')
    });
};
module.exports     = plugin;