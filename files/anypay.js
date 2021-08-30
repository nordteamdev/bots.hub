function generateurl({ amount, payid, desc, id }) {
	if(!desc) desc = 'Хз'
	    desc = encodeURIComponent(desc)
	    $shop_id = MyShopId; 
	    $secret_key = MySecret; 
	    $amount = amount; 
	    $pay_id = payid; 
	    $currency = 'RUB';	
	    $sign = md5($currency+':'+$amount+':'+$secret_key+':'+$shop_id+':'+$pay_id); 
	return `https://anypay.io/merchant?merchant_id=${$shop_id}&amount=${$amount}&pay_id=${$pay_id}&currency=${$currency}&vkid=${id}&desc=${desc}&sign=${$sign}`;
}

hnk({
    regex: /^(?:Валюта|💵 Валюта)\s?([0-9]+)?/i, 
    pattern: async (message) => {
	if(!message.body[1]) return message.ans(`введите сумму от 10млрд до 999млрд (Пример: Валюта 10)`)
    if(message.body[1] < 10 || message.body[1] > 999) return message.ans(`введите сумму 10млрд до 999млрд (Пример: Валюта 10)`)
    let user = mysql.Query(`SELECT * FROM users where id = ${message.senderId}`)
	let url = generateurl({ amount: message.body[1]/10*5, payid: 5, desc: `${message.body[1]}kkk`, id: user[0].id})	
	await vk.api.utils.getShortLink({url: url})
	.then(res => {
		url = res.short_url
	});
	return message.ans(`вы выбрали товар Валюта:
		💸 Стоимость: ${message.body[1]/10*5}₽
		💵 Количество: ${message.body[1]}kkk
		🔗 Оплатить: ${url}`, { mention: true })	
}})	

const express = require("express"); 
const app = express(); 
app.post("/donate", function (request, response) { 
body = request.body;
let user = mysql.Query(`SELECT * FROM users where id = ${body.vkid}`)
if(!user) return;
user = user[0]
if(body.pay_id == 1) // Премиум
{
	mysql.Query(`UPDATE * FROM users where id = ${body.vkid} SET admin = 2`)
	mysql.Query(`UPDATE * FROM users where id = ${body.vkid} SET puid = ${createuid()}`)
	vk.api.messages.send({user_id: user.id, message: `👾 Успешная оплата:
	✅ Вы успешно приобрели ${body.desc} за ${body.amount}₽
	🧾 Номер транзакции: #${body.transaction_id}
	🕰 Дата: ${body.pay_date}
➖➖➖➖➖➖➖➖
💡 Узнать свои возможности - Apanel` })
} else if(body.pay_id == 2) // Валюта
{
	body.desc = body.desc.toString().replace(/k/ig, '000')
    mysql.Query(`UPDATE * FROM users where id = ${body.vkid} SET balance = ${user.balance}+${body.desc}`);
	vk.api.messages.send({user_id: user.id, message: `👾 Успешная оплата:
	✅ Вы успешно приобрели ${body.desc} за ${body.amount}₽
	🧾 Номер транзакции: #${body.transaction_id}
	🕰 Дата: ${body.pay_date}
➖➖➖➖➖➖➖➖
🍩 Покупая донат вы помогаете проекту!` })	
}
vk.api.messages.send({ chat_id:2, message: `👾 @id${user.id} (Новый донат):
✅ Успешно приобрел ${Number(body.desc) ? utils.sp(body.desc) : body.desc} за ${body.amount}₽
🕰 Дата: ${body.pay_date}` })

});
app.listen(3000); 