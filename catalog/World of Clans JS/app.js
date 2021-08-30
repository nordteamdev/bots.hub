const { VK } = require('vk-io');
const config = require("./config.js");

const user = require('./include/user');
const vk = require('./include/vk');
const mine = require('./include/mine');
const capcha = require('./include/capcha');


vk.setHook(['new_message', 'edit_message'], async(context) => {
	await context.loadMessagePayload();
	if(context.senderType != 'group' || context.senderId != -172544710 || context.peerId != -172544710) return;

	if(context.text.indexOf(`напишите ответ примера`) != -1) {
		let match = context.text.match(/(\d+)\+(\d+)/i);
		if(!match && match[0]) return console.log(`[ WOC BOT ] Ошибка - Анти-Бот`);
		console.log(`[ WOC BOT ] Выскочил - Анти-Бот. Вопрос: ${match[0]} - Ответ: ${eval(match[0])}`);
		context.send(eval(match[0]));
	}
	//console.log(context);
	//if(context.messagePayload) console.log(context.messagePayload);

	user.getUserInfo(context);
	//mine.getThisMine();
	mine.checkMine(context.text);
})

async function run() {
	await vk.connect(function(err) {
		if(err) { return console.log(`[ RCORE ] Ошибка подключения! (VK)`, err); }
		console.log(`[ RCORE ] Успешно подключен! (VK)`)

		setTimeout(function() {
			vk.sendMsg(-172544710, `🕍 Поселение`, `"поселение"`);
		}, 3000)

		vk.get()._vk.captchaHandler = async ({ src }, retry) => {
			const key = await capcha.getCapcha(src);

			try {
				await retry(key);
				console.log(`[ RCORE ] Капча успешно решена! Ответ: ${key}  | Капча: ${scr}`);
			} catch (error) {
				console.log(`[ RCORE ] Капча неверная! Ответ: ${key} | Капча: ${scr}`);
			}
		};

	});

	await capcha.connect(function(err) {
		if(err) { return console.log(`[ RCORE ] Ошибка подключения! (CAPCHA)`, err); }
		console.log(`[ RCORE ] Успешно подключен! (CAPCHA)`)
	});

	mine.startMineng();

	console.log(`[ RCORE ] Бот успешно запущен и готов к работе!`);
}

run().catch(console.error);

/* ------------------------- [ Консолим ошибки ]  ------------------------- */

process.on("uncaughtException", e => {
	console.log(`[ uncaughtException ]`, e);
});

process.on("unhandledRejection", e => {
  	console.log(`[ unhandledRejection ]`, e);
});
