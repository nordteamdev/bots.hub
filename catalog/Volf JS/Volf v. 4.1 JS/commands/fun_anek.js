let command = {
	pattern: /^(?:анекдот|anek)$/i,
	f: async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

	let rq = require('prequest');
    let anek = await getAnek();
    return bot.reply(`${filter(anek)}`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
    	}
	}
}

module.exports = command;