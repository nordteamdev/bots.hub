const fs = require('fs');
const colors = require('colors');
const VKCOINAPI = require('node-vkcoinapi');

const config = require("./config.js");
const db = require('./include/db');
const vk = require('./include/vk');
const util = require('./include/util');

const user = require('./include/user');
const game = require('./include/game');

const vkcoin = new VKCOINAPI({
    key: 'GuaVHYhmMtEdBNSbeXH5Lb*#X]0GpztE57zxsG7psCn5S9ZYlo',
    userId: 524929279, // id стр
    token: '4c79e56f445acb38f60cebc037cc75244ea65e31fe46f8b9e5794659075bc9634661a295cdb286ec128d1'
});

const cmds = fs.readdirSync(`${__dirname}/cmds/`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/${name}`));

/* ------------------------- [ Бот ]  ------------------------- */

vk.setHook(['new_message', 'edit_message'], async(context) => {
	if (context.senderId < 1 || context.isOutbox) {
		return;
	} console.log(context);

  //db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { inGame: $coins + 1000 * 2 } });

	let cmd = cmds.find( context.messagePayload && context.messagePayload.command ? (cmd => cmd.bregexp ? cmd.bregexp.test(context.messagePayload.command) : (new RegExp(`^\\s*(${cmd.button.join('|')})`, "i")).test(context.messagePayload.command)):(cmd => cmd.regexp ? cmd.regexp.test(context.text) : (new RegExp(`^\\s*(${cmd.tag.join('|')})`, "i")).test(context.text)) );
	if(!cmd) return (!context.isChat ? context.send('&#128213; | Команда не найдена | Напишите "Начать"'):'');
	else cmd["cmd"] = (context.messagePayload && context.messagePayload.command ? context.messagePayload.command : context.text);

	var _user = await user.getUser(context.senderId);

	await cmd.func(context, { db, util, user, _user, game, vkcoin, cmd, cmds, vk, cmd, fs }).then(() => {}).catch((e) => {
		console.log(`Ошибка:\n${e}`.red.bold);
	});
})

async function run() {
  await db.connect(function(err) {
    if(err) { return console.log(`[ RCORE ] Ошибка подключения к базе данных! (MongoDB)`, err); }
    console.log(`[ RCORE ] Успешно подключен к базе данных! (MongoDB)`);
  });

	await vk.connect(function(err) {
		if(err) { return console.log(`[ RCORE ] Ошибка подключения! (VK)`, err); }
		console.log(`[ RCORE ] Успешно подключен! (VK)`)
	});

	await vkcoin.updates.startPolling();
	vkcoin.updates.onTransfer(async(event) => {
	  const { amount, fromId, id } = event;
	  const score = vkcoin.api.formatCoins(amount);

	  console.log(`[ ${fromId} ] Пополнил баланс на сумму ${score} VK COINS | ID: ${id}`);

		if(!await user.isUser(fromId)) return;

		db.get().collection('users').updateOne({ uid: Number(fromId) }, { $inc: { coins: +(amount / 1000) } });
		vk.sendMsg(fromId, `[ ✔ ] На ваш баланс зачислено ${score} VK Coins 💸`);
	});

	console.log(`[ RCORE ] Бот успешно запущен и готов к работе!`);
}

run().catch(console.error);

/* ------------------------- [ Консолим ошибки ]  ------------------------- */

process.on("uncaughtException", e => {
	console.log(e);
});

process.on("unhandledRejection", e => {
	console.log(e);
});
