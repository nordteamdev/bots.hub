const { Command, Utils } = require('cocoscore');
const request = require('request');
const key = 'trnsl.1.1.20190721T012831Z.ae935cb757bc33b4.085f79d59912985f803b9fb2589f1c633d5c1937';

const z = {
 	"1": { 
 	"name": "📱"
 },
 	"2": { 
 	"name": "📱"
 },
 	"3": { 
 	"name": "📱"
 },
 	"4": { 
 	"name": "📱"
 },
 	"5": { 
 	"name": "📱"
 },
 	"6": {
 	"name": "🖥"
},
 	"7": { 
 	"name": "🖥"
}
}

module.exports = [
new Command({
	trigger: /^кто\s(.*)/i,
	async handler(ctx, bot) {
		if (!ctx.isChat) return ctx.send(`Команда работает только в беседе.`);
    let {
        profiles
    } = await bot.vk.api.messages.getConversationMembers({ peer_id: ctx.peerId });
    let profile = Utils.getRandomElement(profiles);
    await ctx.send(
    	Utils.getRandomElement([
    		'Это точно',
    		 'Я уверен, что это',
    		  'Твоя мама говрит, что это',
    		   'Кнч, это', 'Думаю, что это',
    		    'Наверное, это',
    		     'Википедия говорит, что это',
    		      'Сотку даю, что это'
    		      ]) + 
    	' -- @id' + profile.id + '(' + profile.first_name + ')');
	}
}),
new Command({
	trigger: /^переведи\s(.*)/i,
	handler(ctx, bot) {
		request.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&lang=ru&text=" + encodeURIComponent(ctx.body[1]), (e, r, b) => {
           if(!b || JSON.parse(b).code != 200) return;
           ctx.send("Перевод:\n=> " + JSON.parse(b).text[0])
       })
	}
}),
new Command({
	trigger: /^онлайн/i,
	async handler(ctx, bot) {
		if (!ctx.isChat) return ctx.send(`Команда работает только в беседе.`);
	bot.vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + ctx.chatId,
        fields: "online, last_seen"
    }).then(function(res) {
        let text = '';
        text += 'Онлайн беседы: \n\n';
        for (i in res.profiles) {
            if (res.profiles[i].online == 1) {

                text += `— [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}] ${res.profiles[i].last_seen.platform === undefined ? `[ONLINE]\n`  : `${res.profiles[i].last_seen.platform.toString().replace(/1/gi, "📱").replace(/2/gi, "📱").replace(/3/gi, "📱").replace(/4/gi, "📱").replace(/5/gi, "📱").replace(/6/gi, "🖥").replace(/7/gi, "🖥")}\n`}`
            }
        }
        return ctx.send(text)
    })
	}
}),
new Command({
	trigger: /^актив/i,
	async handler(ctx, bot) {
		bot.vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + ctx.chatId,
        fields: "online, last_seen"
    }).then(function(res) {
        let text = '';
        text += 'актив пользователей: \n\n';
        for (i in res.profiles) {
            if (res.profiles[i].online == 0) {
                text += `— [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}] ${unixStampLeft(res.profiles[i].last_seen.time / 1000)} назад\n`
            }
        }
        return ctx.send(text)
	})
}
	})
]

function check(status){
    if(status == 1) return "ONLINE 📗"
    if(status == 0) return "OFFLINE 📕"
}

function unixStampLeft(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + " д. ";
    if(h > 0) text += Math.floor(h) + " ч. ";
    if(m > 0) text += Math.floor(m) + " м.";
    if(s > 0) text += Math.floor(s) + " с. ";
    return text;
}