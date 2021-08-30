const { CocosCoreBot, Command, Utils } = require('cocoscore');

const bot = new CocosCoreBot({
	token: '',//',
	groupId: 173447827, //179388727,
	aliases: [],
	apiMode: 'sequential',
	developerId: 347241116,
	commandsDirectory: './commands',
	logsDirectory: './logs',
	chatBot: true,
	mongoURI: 'кластер'
});

bot.db.setModel('keys', { 
	key: String, 
	balance: Number, 
	users: Array, 
	activation: Number 
})

bot.start().catch(bot.logger.error);

const frm = new Intl.NumberFormat('en');

async function widget() {
    let users = await bot.db.getModel('user').find({ bantop: false }).sort('-rating').limit(10); 

let top = users.map((x) => `[{ 
"text": "${x.nickname}",
"icon_id": "id${x.vkId}",
"url": "https://vk.com/id${x.vkId}"}, 
	{
		"text": "${x.rating.toLocaleString()} ♛"}, {
		"text": "${frm.format(x.balance)}$"
}],
`).join('\n');

bot.widgetVk.api.call('appWidgets.update', {
"type": "table",
"code": `
return {
"title": "Лучшие игроки",
"title_url": "vk.com/botsima",
"head": [{
"text": "Игрок"
}, {
"text": "Рейтинг",
"align": "right"
}, {
"text": "Баланс",
"align": "right"
}],
"body": [
${top}
],
"more": "Написать боту",
"more_url": "vk.me/botsima"
};`
});
}
setInterval(widget, 15000);



function sp(number, decimals, dec_point, separator) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+ 2) ? 0 : Math.abs(2),
    sep = (typeof separator === 'undefined') ? ',' : separator ,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}