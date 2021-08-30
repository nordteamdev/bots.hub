  const { VK, Keyboard } = require('vk-io');
  const {MessageContext} = require('vk-io');
  const vk = new VK();
  const keyboard = Keyboard;
  const {updates} = vk;
  const {upload, snippets, auth, collect} = vk;
  const { SceneManager, StepScene } = require('@vk-io/scenes')
  const { SessionManager } = require('@vk-io/session')
  const sessionManager = new SessionManager();
  const sceneManager = new SceneManager();
  const fs = require('fs');
  
  const tokens = require('./base/tokens.json');
  const acc = require('./base/acc.json');
  
  setInterval(() => {
  	fs.writeFileSync('./base/tokens.json', JSON.stringify(tokens, null, "\t"))
  fs.writeFileSync('./base/acc.json', JSON.stringify(acc, null, "\t"))
  }, 1000);
  var mentionRegexp = new RegExp(`\\[club190363492\\|(.*)\\]`);
  
// Подключаемся к ВК
for(i in tokens){
		var bot = new bots(VK, {
			token: tokens[i].token,
			apiMode: 'parallel',
			id: tokens[i].id,
		});  
}
/*==========================================================================================================*/
function start(){
	for(i in tokens.tokens){
			var bot = new bots(VK, {
				token: i,
				apiMode: 'parallel',
				id: tokens[i].id,
			}); 
	} 
}

/*==========================================================================================================*/
function bots(VK, token) {  

	const vk = new VK(); 
	const { updates, snippets } = vk;  
	
	vk.setOptions({ token: token.token, apiMode: 'parallel', pollingGroupId: token.id });  
	
updates.on("message", async(msg, next, context) => {
    if (msg.is("message") && msg.isOutbox) return;

 ///////////////////////////////////
 userId = msg.senderId;
 //////////////////////////////////

if(!msg.isChat){
  msg.attachments.map(async function(a) {
    if(a.type == 'sticker'){
      await msg.send(`
🆔 ID Стикера: ${a.id}
📖 Id Стикер-Пака: ${a.productId}

🔗 Ссылка на стикер: ${a.images[0].url}
🌌 Фотография стикера:
`);
  await msg.sendPhotos(`https://vk.com/sticker/1-${a.id}-352`);
     }
    })
 }
 
if(mentionRegexp.test(msg.text)) msg.text = msg.text.replace(mentionRegexp, '').trim();
  try {
      await next();
  } catch (err) { console.error(err) }
})

updates.hear(/^(?:connect)$/i, async (message) => {
	message.scene.enter('connect');
})

sceneManager.addScene(new StepScene('connect', [
   async (msg) => {
        if (msg.scene.step.firstTime || !msg.text) {
         let user = await vk.api.users.get({ user_ids: userId });
            return msg.send(`@id${userId} (${user[0].first_name} ${user[0].last_name}), введите токен группы!`);
        }
        const tok = new VK();
         let gr = await tok.api.groups.getById({ access_token: msg.text, fields: "members_count,age_limits,wall,verified,trending,status,site,is_closed,type" }).catch((error) => { return msg.send(`Неверный токен!`); });
         acc.tokens += 1;
         msg.scene.state.token = msg.text;
         msg.scene.state.baseId = acc.tokens;
         tokens[acc.tokens] = { token: msg.text, id: 0 }
        return msg.scene.step.next();
    },
    async (msg) => {
    	if (msg.scene.step.firstTime || !msg.text) {
         let user = await vk.api.users.get({ user_ids: userId });
            return msg.send(`@id${userId} (${user[0].first_name} ${user[0].last_name}), введите id группы!`);
        }
        const { baseId } = msg.scene.state;
        if(Number(msg.text)){
        	tokens[baseId].id = Number(msg.text)
        } else {
         snippets.resolveResource(`${msg.text}`).then(function (a){
            if(a.object == "group"){
            	tokens[baseId].id = a.id
            }
         });
        }
       return msg.scene.step.next();
     },
      async (msg) => {
        const { baseId, token } = msg.scene.state;
          let user = await vk.api.users.get({ user_ids: userId });
          
           await msg.send(`@id${userId} (${user[0].first_name} ${user[0].last_name}), бот успешно запущен в вашей группе! Проверьте!`);
            setTimeout (() => {
            	 process.exit(-1);
            }, 2000);
        await msg.scene.leave();
    }
]));

updates.on('message', sessionManager.middleware);
updates.on('message', sceneManager.middleware);
updates.on('message', (msg, next) => {
    if (!msg.scene.current) {
        return next();
    }
    const cancel =  msg.messagePayload && msg.messagePayload.command === 'cancel';
    if (cancel) {
        return msg.scene.leave({
            canceled: true
        });
    }
    return msg.scene.reenter();
});

/////////////////////////////////////////////
async function run() {
	    await vk.updates.startPolling();

        console.log('×××××××××××××××××××××');
	    console.log('Бот Запущен! ');
	    console.log('×××××××××××××××××××××');
	}
  run().then(async () => {
	      console.log(`ID Группы: ${token.id}`);
          console.log(`Token: ${token.token.substring(0,6)}****${token.token .substring(5,9)}`);
	      console.log('×××××××××××××××××××××');
	       console.log('Разработчик: https://vk.com/daviderbaev');
	      console.log('×××××××××××××××××××××');
	})
	.catch((error) => {
	    console.error('НЕВЕРЫЙ ТОКЕН' + token.token + '\n '+error)
	    console.log('×××××××××××××××××××××');
	     console.log('Разработчик: https://vk.com/daviderbaev');
	    console.log('×××××××××××××××××××××');
	});
}