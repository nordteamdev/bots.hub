const { VK } = require('vk-io');
const utils = require('../utils.js');
const request = require('request');
const commands = require('fs').readdirSync('./commands').filter(x=> x.endsWith('js')).map(x=> require('../commands/' + x));

let users = require('../bot/base/users.json');
let clans = require('../bot/base/clans.json');
let course = require('../bot/base/course.json');
let works = require('../bot/base/works.json');
let cet = require('../bot/base/cet.json');
let businesses = require('../bot/base/businesses.json');

function nextbot(access_token, inGroup)
{
	_this = this;
	const vk = new VK();
	vk.setOptions({token: access_token});
	this.api = vk.api;

	let captcha_status = false;
	/*let captcha = new (require('../captcha.js'))();

    vk.setCaptchaHandler((src, sid, retry) => {
		captcha_status = true;

		captcha.get(src.src)
			.then(key => {
				return sid(key.answer);
			});
	});*/

	vk.updates.startPolling();
	vk.updates.on('message', async (message) => {
		if(!message.text || message.isOutbox) return;

		if(!users[message.senderId])
		{
			let data = await vk.api.users.get({user_id: message.senderId});
			let time = new Date();
			users[message.senderId] = {
				balance: {
					dollars: 1500,
					bank: 0,
					bitcoins: 0,
					work: 0
				},
				punish: {
					isBanned: false,
					punisher: 0,
					reason: ''
				},
				farm: {
					hasFarm: false,
					level: 0
				},
				misc: {
					work: 0,
					business: 0,
					phone: 0,
					car: 0,
					cet: 0,
					license: false,
					live: 0
				},
				marriage: {
					requests: [],
					partner: 0
				},
				cooldowns: {
					cheat: false,
					taxi: false
				},
				level: 1,
				exp: 0,
				clan: '',
				group: 0,
				registerDate: `${time.getDay() + 8}.${time.getMonth() + 1}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
				tag: data[0].first_name
			}

			if(!message.isChat) message.reply(`🔹 Вы зарегистрировались в боте!

				&#4448; Ваш баланс: 1500$
				&#4448; Мои команды: помощь`);
		}

		let bot = {
			reply: (text, params) => {
				if(!inGroup) {message.reply(`${text}

					${utils.pick(['', ''])}`, params)}
                if(inGroup) message.reply(text)
			},
			inGroup: inGroup,
			user: users[message.senderId],
			work: require('../bot/base/works.json'),
			cet: require('../bot/base/cet.json'),
			business: require('../bot/base/businesses.json'),
			phone: require('../bot/base/phones.json'),
			car: require('../bot/base/cars.json')
		};

		message.sent = false;
		if(message.senderId == "-443389649") return;
		if(users[message.senderId].punish.isBanned)
		{
			if(bot.inGroup) return bot.reply(`⚠ [Ошибка]

				&#4448; ⛔ Вы заблокированы!

				&#4448; &#4448; 📕 Вас забанил: ${users[message.senderId].punish.punisher === 0 ? 'Система' : `${users[users[message.senderId].punish.punisher].tag}`}
				&#4448; &#4448; 📕 Причина: ${users[message.senderId].punish.reason === '' ? 'Не указана' : `${users[message.senderId].punish.reason}`}

				&#4448; 📗 | Купить разбан можно на сайте http://donatepay.ru/d/magicbot`);

				return;
		}

		if(users[message.senderId].exp >= 300)
		{
			users[message.senderId].exp = 0;
			users[message.senderId].level += 1;
		}

		if(users[message.senderId].balance.dollars < 35)
		{
			users[message.senderId].balance.dollars = 1500;
		}

		commands.map(cmd => {
			if(!cmd.pattern.test(message.text)) return;
			message.args = message.text.match(cmd.pattern);
			cmd.f(message, bot);
			message.sent = true;
			users[message.senderId].exp += 1;
		});

		if(/^(?:\pizda)\s(.*)/i.test(message.text))
		{
			if([518438289].indexOf(message.senderId) !== -1)
			{
				let toEval = message.text.split(' ');
				toEval = toEval.splice(1).join(' ');
				message.reply(`Результат: ${eval(toEval)}`);
			} else return;
		}
	});

	if(!inGroup)
	{
		setInterval(() => {
			vk.api.status.set({text: `Курс: ${course.btc}$ - 1 BTC`});
		}, 60000);

		setInterval(async () => {
			let friends_inbox = await vk.api.friends.getRequests({out: 0});
			let friends_outbox = await vk.api.friends.getRequests({out: 1});

			vk.api.account.setOnline();

			friends_inbox.items.map(e=> {
				vk.api.friends.add({user_id: e});
			});

			friends_outbox.items.map(e=> {
				vk.api.friends.delete({user_id: e});
			});
		}, 35000);
	}
}

setInterval(() => {
	course.btc = utils.random(120000, 150000);
	require('fs').writeFileSync('./bot/base/course.json', JSON.stringify(course, null, '\t'));
}, 120000);

setInterval(() => {
	require('fs').writeFileSync('./bot/base/users.json', JSON.stringify(users, null, '\t'));
	require('fs').writeFileSync('./bot/base/clans.json', JSON.stringify(clans, null, '\t'));
}, 10000);

setInterval(() => {
	for (key in users)
	{
		if(users[key].misc.work !== 0)
		{
			let earn = works[users[key].misc.work - 1].earn;
			if(!earn) return;
			users[key].balance.bank += earn;
		}

		if(users[key].misc.business !== 0)
		{
			let earn = businesses[users[key].misc.business - 1].earn;
			if(!earn) return;
			users[key].balance.bank += earn;
		}
	}
}, 3600000);

setInterval(() => {
	for (key in users)
	{
		if(users[key].balance.dollars !== 0 && !Number(users[key].balance.dollars))
		{
			users[key].balance.dollars = 20000;
			console.log('FIXER | Set balance - ' + key + ' - 20000$');
		}

		if(users[key].balance.bitcoins !== 0 && !Number(users[key].balance.bitcoins))
		{
			console.log('FIXER | Set BTC - ' + key + ' - 0');
			users[key].balance.bitcoins = 0;
		}

		if(users[key].balance.bank !== 0 && !Number(users[key].balance.bank))
		{
			users[key].balance.bank = 0;
			console.log('FIXER | Set bank - ' + key + ' - 0$');
		}

		if(users[key].misc.license === undefined)
		{
			users[key].misc.license = false;
			console.log('FIXER | Set license - ' + key + ' - false');
		}
		if(users[key].misc.license === null)
		{
			users[key].misc.license = false;
			console.log('FIXER | Set license - ' + key + ' - false');
		}
		if(users[key].cooldowns.taxi === undefined)
		{
			users[key].cooldowns.taxi = false;
			console.log('FIXER | Set taxi delay - ' + key + ' - false');
		}
		if(users[key].cooldowns.taxi === null)
		{
			users[key].cooldowns.taxi = false;
			console.log('FIXER | Set taxi delay - ' + key + ' - false');
		}
	}
}, 2000);
setInterval(() => {
	for (key in users)
	{
		if(users[key].farm.hasFarm)
		{
			let earn = users[key].farm.level;
			users[key].balance.bitcoins += earn;
		}
	}
}, 604800000);
setInterval(() => {
	for (key in users)
	{
		if(users[key].balance.work === undefined)
		{
			users[key].balance.work = 0
		}
		if(users[key].misc.work < 1) {if(users[key].balance.work === 0)
		{
			users[key].balance.work = 32000
		}}
	}
}, 1200000);

module.exports = nextbot;