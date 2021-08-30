const pluginList   = require('./../utils/plugins.js').plugins;
const users        = require('./../utils/db.js').users;
let plugin         = {};
plugin.name        = 'confrank';
plugin.description = 'узнать топ беседы';
plugin.usage       = 'ранг';
plugin.commands    = [/^топ/i];
plugin.level       = 0;
plugin.onCommand   = async (context) => {
    if (context.isDM()) {
        await context.send('Мда сверхразум')
        return;
    }
    let chatUsers = await context.vk.api.messages.getChatUsers({chat_id: context.payload.chat_id, fields: 'nickname'});
    let topUsers = {evil: [], good: []};
    let points = {evil: 0, good: 0};
    chatUsers.filter((obj) => users.getAll()[obj.id] != undefined && users.getNested(obj.id + '.ban') === null).forEach((obj) => {
        points[(users.getAll()[obj.id]['exp']) < 0 ? 'evil' : 'good'] += Math.abs(users.getAll()[obj.id]['exp']);
        topUsers[(users.getAll()[obj.id]['exp'] < 0 ? 'evil' : 'good')].push([obj.id, users.getAll()[obj.id]['exp'], obj.first_name, obj.last_name]);
    });
    
    topUsers['evil'].sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
    topUsers['good'].sort((a, b) => b[1] - a[1])
    let id = 1;
    let text = 'Топ беседы:<br>';
    if (points['evil'] > points['good']) {
        text += 'Злые (' + points['evil'] + ' очков):<br>' + topUsers['evil'].map((arr) => {
            return '— @id' + arr[0] + ' (' + arr[2] + ' ' + arr[3] + ') - ' + arr[1] + ' очков.'
        }).join('<br>') + '<br>';
        text += 'Добрые (' + points['good'] + ' очков):<br>' + topUsers['good'].map((arr) => {
            return '— @id' + arr[0] + ' (' + arr[2] + ' ' + arr[3] + ') - ' + arr[1] + ' очков.'
        }).join('<br>');
    } else {
        text += 'Добрые (' + points['good'] + ' очков):<br>' + topUsers['good'].map((arr) => {
            return '— @id' + arr[0] + ' (' + arr[2] + ' ' + arr[3] + ') - ' + arr[1] + ' очков.'
        }).join('<br>') + '<br>';
        text += 'Злые (' + points['evil'] + ' очков):<br>' + topUsers['evil'].map((arr) => {
            return '— @id' + arr[0] + ' (' + arr[2] + ' ' + arr[3] + ') - ' + arr[1] + ' очков.'
        }).join('<br>');
    }
    await context.send(text);
};
module.exports     = plugin;