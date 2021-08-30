const pluginList   = require('./../utils/plugins.js').plugins;
let plugin         = {};
plugin.name        = 'help';
plugin.description = 'получить список доступных комманд';
plugin.usage       = 'помощь';
plugin.commands    = [/^помощь/i, /^ком[м]?анды/i];
plugin.level       = 0;
plugin.onCommand   = async (context) => {
    await context.send('помощь по плагинам:\n\n———————————————\n\n' + pluginList.filter(data => !data.hidden && data.usage != undefined).sort((a, b) => a.level - b.level).map((data) => {
        return text = '✍ » ' + data.usage + ' - ' + (data.description || 'описания нет');
    }).join("<br>") + '\n\n———————————————\n\nБот находится в разработке.');
};
module.exports     = plugin;