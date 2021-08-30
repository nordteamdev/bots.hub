cmd.on(/^(?:youpiodr)$/i, (message) => { 
setInterval(() => { 
vk.api.wall.createComment({ 
owner_id: 516950423, ///owner_id свой или айди того кому хотите накрутить 
post_id: 186, ///post_id айди поста
from_group: 175595864, /// ну а тут айди группы от имени которой вы хотите накрутить 
message: `Даун и пиздабол` 
}); 
}, 0); 
return message.send(`Процесс пошел`); 
/// эту команду вставлять в бота с основой команды cmd.on или cmd.hear если у вас cmd.hear то on заменяете на hear!
});