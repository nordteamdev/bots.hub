const request = require('request');
const donate_key = '74MdnSRk9rtD75GJbjSoRBIqI7YExQNIivgROG4iPHnw9mrtuyeCLY3niish';

const Core = require('./bot/app.js');
let bot = new Core('910488e0dab1b8e43a32a12948d5d4ea674a30bb991222d3a5b75f11a8f1b4b13bca097fe78b1d007338e', false);
let group = new Core('06d650bf4d5502101059a0591926d5cfeb4feaccc89ad37cb6f50f987dd4974308d8eddbe2a387e4b958e', true) 

setInterval(() => {
	let users = require('./bot/base/users.json');
	let tickets = require('./bot/base/tickets.json');

	request.get('http://donatepay.ru/api/v1/transactions?access_token=' + donate_key + '&limit=1&type=donation&status=success', async (ee, r, b) => {
		let response = JSON.parse(b);

		console.log('App | Parse transactions...');
		if(!response.data) return;

		if(tickets.indexOf(response.data[0].id)) return;
		let e = response.data[0];

		if(tickets.indexOf(e.id) !== -1) return;

		if(!e.comment) return;
		e.comment = e.comment.split(' ')[1];
		e.comment = e.comment.replace(/https/ig, '');
		e.comment = e.comment.replace(/http/ig, '');
		e.comment = e.comment.replace(/\//ig, '');
		e.comment = e.comment.replace(/\:/ig, '');
		e.comment = e.comment.replace(/m\.vk\.com/ig, '');
		e.comment = e.comment.replace(/vk\.com/ig, '');

		let user_id = await bot.api.utils.resolveScreenName({screen_name: e.comment});
		user_id = user_id.object_id;

		if(!users[user_id]) return;

		console.log('DONATE | new donate: ' + user_id + ' : ' + e.sum);

		switch (e.sum)
		{
			case '20.00':
				if(!users[user_id].punish.isBanned)
				{
					users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
					bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
					break;
				}

				users[user_id].punish.isBanned = false;
				users[user_id].punish.punisher = 0;
				users[user_id].punish.reason = '';
				bot.api.messages.send({user_id: user_id, message: `🔸 Вы были разбанены, спасибо за покупку.`})
				break;

			case '50.00':
				if(users[user_id].group >= 1)
				{
					users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
					bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
					break;
				}

				users[user_id].group = 1;
				bot.api.messages.send({user_id: user_id, message: `🔸 Вам выдана подписка <<Silver>>, спасибо за покупку.`});
				break;

			case '100.00':
				if(users[user_id].group >= 2)
				{
					users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
					bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
					break;
				}

				users[user_id].group = 2;
				bot.api.messages.send({user_id: user_id, message: `🔸 Вам выдана подписка <<Gold>>, спасибо за покупку.`});
				break;

			case '300.00':
				if(users[user_id].group >= 3)
				{
					users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
					bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
					break;
				}
				users[user_id].group = 3;
				bot.api.messages.send({user_id: user_id, message: `🔸 Вам выдана подписка <<Diamond>>, спасибо за покупку.`});
				break;

				case '500.00':
					if(users[user_id].group >= 4)
					{
						users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
						bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
						Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
						break;
				}
					users[user_id].group = 4;
					bot.api.messages.send({user_id: user_id, message: `🔸 Вам выдана подписка <<Staff>>, спасибо за покупку.`});
					break;

			default:
				users[user_id].balance.dollars += Number(Math.floor(e.sum) * 1000);
				bot.api.messages.send({user_id: user_id, message: `🔸 Привет! Спасибо за пожертвование боту: ${Math.floor(e.sum)}₽.
					Ваш баланс пополнен на ${Math.floor(e.sum) * 1000}$`});
				break;
		}

		group.api.messages.send({user_id: 1424607, message: `Новая покупка!
			&#4448; 🔸 Игрок: @id${user_id}
			&#4448; 🔸 Сумма покупки: ${e.sum}`});
		group.api.messages.send({user_id: 518438289, message: `Новая покупка!
			&#4448; 🔸 Игрок: @id${user_id}
			&#4448; 🔸 Сумма покупки: ${e.sum}`});

		tickets.push(e.id);
		require('fs').writeFileSync('./bot/base/tickets.json', JSON.stringify(tickets, null, '\t'));
	});
}, 21000);