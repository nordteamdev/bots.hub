/*const {
    Command,
    Utils,
    request
} = require('cocoscore')

async function Speech() {
const request = require('request')
const uri = `https://api.wit.ai/speech`
const apikey = 'FXYKXZ56H7LKSKJPSNFIJPXAK22BBMJY' // получаем ключ доступа на wit.ai в ручную // Если что пишите @zeuvs

module.exports = async (body) => {
  // отправляем post запрос с буфером аудио
  const response = await request.post({
    uri,
    headers: {
      'Accept': 'audio/x-mpeg-3',
      'Authorization': `Bearer ` + apikey,
      'Content-Type': 'audio/mpeg3',
      'Transfer-Encoding': 'chunked'
    },
    body
  })
  // парсим ответ и отдаем результат расшифровки
  return JSON.parse(response)._text
}
}

module.exports = new Command({
        trigger: /^рас/i,
        permission: 1,
       async handler(ctx, bot) {
try{
    if(typeof context.attachments[0].url !== 'undefined' && context.attachments[0].url !== null && context.attachments.length > 0){
    var audio = await request.get(context.attachments[0].url);
    try {
    var text = await Speech(audio);
    }
    catch (e) {
    return context.reply(` к сожалению, я не смог распознать то, что вы сказали!`);
    }
    if (typeof text !== 'undefined' && text !== null && text.length > 1) {
    return context.reply(` сказал: ${text}`);
    }
    else return context.reply(` к сожалению, я не смог распознать то, что вы сказали!`);
    }
    } catch (e) {
    
    }
}
})
*/