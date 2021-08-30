const { Command, Utils} = require('cocoscore')
const frm = new Intl.NumberFormat('en');

module.exports = new Command({
    trigger: /^б[оа]ланс?$/i,
    type: "osnovnoe",
    name: 'Баланс',
    description: 'Ваш баланс',
    emoji: '💵',
    handler(ctx, bot) {
        ctx.send(`Ваш баланс:
			💵 Деньги: ${frm.format(ctx.user.balance)}$
			🌐 Биткоины: ${frm.format(ctx.user.bitcoin)}
			👑 Рейтинг: ${frm.format(ctx.user.rating)}
		`);
    }
});


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