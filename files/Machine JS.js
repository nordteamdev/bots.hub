const {
	VK,
	updates,
	Keyboard
} = require('vk-io');

let bot = new Flooder('74490d0acf48e4a38557125d1a2dde0e081624a2415fdb689501a0b915905becab3ec6c42a8e39a5e6358', 177862103);
function Flooder (access_token, group_id)
{
	let vk = new VK(),
		request = require('request'),
		chats = require('./data/chats.json'),
		users = require('./data/users.json'),
		whitelist = require('./data/whitelist.json'),
		utils = require('./meta/utils.js');

	vk.setOptions({
		token: access_token,
		apiMode: 'parallel_selected',
		pollingGroupId: group_id
	});

	vk.updates.startPolling();

	vk.updates.on('message', async (message) => {
		if(message.isUser)
		{
			if(message.isOutbox) return;
			if(/^(кто вы такие)/i.test(message.text))
			{
				return message.send({
					message: 'Вкратце - бот для краша конференций/бесед.\nХотите пошутить над своим другом/классной беседой? Добавьте бота в чат, и вы сами увидите, что он умеет!\n\nВнимание: Бот создан в ознакомительных целях! Автор не несет ответственность за последствия от ваших действий'
				})
			}
			if(/^(?:хочу добавить бота)/i.test(message.text))
			{
				return message.send({
					message: 'Вы можете добавить бота в беседу.\n\nИнструкция: \n1. Зайдите в нашу группу\n2. Найдите кнопку <<Добавить в беседу>> или <<Пригласить в беседу>> под кнопкой ниже <<Подписаться>>\n3. Выберите беседу\n4. Дайте доступ к уведомлениям либо напишите @fludbot старт',
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Понял!',
							color: Keyboard.POSITIVE_COLOR
						}),
						Keyboard.textButton({
							label: 'Я не понял!',
							color: Keyboard.NEGATIVE_COLOR
						}),
						Keyboard.textButton({
							label: 'Вернуться назад'
						})
					])
				})
			}
			if(/(vk\.(com|me)\/join\/[a-z0-9_]+)/i.test(message.text))
			{
				let args = message.text.match(/(vk\.(com|me)\/join\/[a-z0-9_]+)/i);
				args[1] = args[1].replace('https', '')
				args[1] = args[1].replace('http', '')
				args[1] = args[1].replace(':', '')
				args[1] = args[1].replace('//', '')
				await message.joinChatByInviteLink('https://' + args[1])
				return message.send('Запрос отправлен')
			}
			if(/(репорт)/i.test(message.text))
			{
				message.reply('Постараемся разобраться!', {
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
				return message.send({
					user_id: 422783858,
					message: 'Вам был отправлен репорт от *id' + message.senderId + ' (Пользователя)\n\nТекст: ' + message.text
				})
			}
			if(/(не работает)/i.test(message.text))
			{
				return message.send({
					message: 'Бот может не работать взависимости от нагрузки\nВК накладывает флуд контроль на бота на некоторое время'
				})
			}
			if(/(^понял|не хочу|назад)/i.test(message.text))
			{
				return message.send({
					message: 'Ок.',
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
			}
			if(/(не понял)/i.test(message.text))
			{
				return message.send('Подробная инструкция в нашем посте:', {
					attachment: 'wall-170300337_3'
				})
			}
			if(/(не хочу|)/i.test(message.text))
			{
				return message.send({
					message: `У меня не нашлось на это ответа :(\n\nНажмите на нужную кнопку`,
					keyboard: Keyboard.keyboard([
						Keyboard.textButton({
							label: 'Кто вы такие?'
						}),
						Keyboard.textButton({
							label: 'Хочу добавить бота в беседу!'
						})
					])
				})
			}
		}
		if(message.isChat)
		{
			if(/(айди|cid)/i.test(message.text))
			{
				return message.reply(`ID беседы ` + message.chatId)
			}
			if(whitelist.includes(message.chatId)) return;
			if(chats.includes(message.chatId))
			{
				chats.push(message.chatId)
				await message.send({
					chat_id: message.chatId,
					message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					attachment: utils.pick(['photo-177862103_456239244'])
				})
				await message.send({
					chat_id: message.chatId,
					message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					attachment: utils.pick(['photo-177862103_456239244'])
				})
				await message.send({
					chat_id: message.chatId,
					message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					attachment: utils.pick(['photo-177862103_456239244'])
				})
				await message.send({
					chat_id: message.chatId,
					message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					attachment: utils.pick(['photo-177862103_456239244'])
				})
				await message.send({
					chat_id: message.chatId,
					message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					attachment: utils.pick(['photo-177862103_456239244'])
				})
				await message.send({
					chat_id: message.chatId,
					message: kasha,
					attachment: utils.pick(['photo-177862103_456239244'])
				})
			}
			if(message.isOutbox) return;
			const a = setInterval(() => {
				message.send({
					message: utils.pick([
						'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
						kasha
					]),
					attachment: utils.pick(['photo422783858_456260159', 'photo-170300337_456239020', 'photo-169488967_456239019', 'photo422783858_456261250', 'photo422783858_456261169'])
				})
			}, 1000)
			setTimeout(() => {
				clearInterval(a)
			}, 60000)
			let presents = utils.pick(['капец', 'бабуля флексит', 'что здес происходит', 'зачем!', 'ты чтоо сделал', 'пиздец', 'пошол нахуй отсюда', 'моя мама похлеще флексит', 'всем пизда', 'страшна вырубай', 'ето конец походу', 'ебануться', 'нам пиздец', 'жопа', 'ЭЩКЕРЕ'])
			return message.send({
				message: utils.pick([
					'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
					kasha
				]),
				keyboard: Keyboard.keyboard([
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					}),
					Keyboard.textButton({
						label: presents,
						color: Keyboard.POSITIVE_COLOR
					})
				]),
				attachment: utils.pick(['photo-177862103_456239244'])
			})
		}
		message.send({
			chat_id: message.chatId,
			message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
			attachment: utils.pick(['photo-177862103_456239244'])
		})
		message.send({
			chat_id: message.chatId,
			message: 'ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💥 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ⚡ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) ✉ ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 🔧 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 📝 ПОДПИШИСЬ [magicbot_inc|«MagicBot Inc»] (vk.com/magicbot_inc) 💎',
			attachment: utils.pick(['photo-177862103_456239244'])
		})
	})

	setInterval(() => {
		require('fs').writeFileSync('./data/chats.json', JSON.stringify(chats, null, '\t'))
		require('fs').writeFileSync('./data/users.json', JSON.stringify(users, null, '\t'))
	}, 5000)

}

let kasha = `56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏56#͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏#͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓͓̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏̏`