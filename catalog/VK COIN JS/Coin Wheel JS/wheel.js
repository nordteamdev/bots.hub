const fs = require('fs');
const colors = require('colors');
const deferred = require('deferred');
const VKCOINAPI = require('node-vkcoinapi');

const config = require("./config.js");
const db = require('./include/db');
const vk = require('./include/vk');
const util = require('./include/util');

const user = require('./include/user');
const game = require('./include/game');

let cmds = [fs.readdirSync(`${__dirname}/cmds/conversation`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/conversation/${name}`)), fs.readdirSync(`${__dirname}/cmds/private`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/private/${name}`))];

//const cmds = fs.readdirSync(`${__dirname}/cmds/`).filter((name) => /\.js$/i.test(name)).map((name) => require(`${__dirname}/cmds/${name}`));
const vkcoin = new VKCOINAPI({
key: 'hDuW9f14wtxQc*qU68MgBfUpDvSpWx1Zb1I-LJrY5e#ig8twec',
userId: 541289515,
token: 'ead73358f26530977d607ff63473c39a88a099653d7c239f33be6e42e50df36e6c01cc95120a000adce98'
});
//const vkcoin = null;
/* ------------------------- [ Бот ]  ------------------------- */

let defferred = [];
vk.setHook(['new_message', 'edit_message'], async(context) => {
	if (context.senderId < 1 || context.isOutbox || context.isGroup) {
		return;
	}

	defferred.forEach(async(data) => {
		if(data.user_id == context.senderId) {
			data.def.resolve(context);
			return defferred.splice(defferred.indexOf(data), 1);
		}
	});

	context.question = async(text) => {
		await context.send(text);
		let def = deferred();
    defferred.push({ user_id: context.senderId, def: def });
		return await def.promise((data) => { return data.text; });
	}

	let cmd = cmds[ (!context.isChat ? 1 : 0) ].find( context.messagePayload && context.messagePayload.command ? (cmd => cmd.bregexp ? cmd.bregexp.test(context.messagePayload.command) : (new RegExp(`^\\s*(${cmd.button.join('|')})`, "i")).test(context.messagePayload.command)):(cmd => cmd.regexp ? cmd.regexp.test(context.text) : (new RegExp(`^\\s*(${cmd.tag.join('|')})`, "i")).test(context.text)) );
	if(!cmd) {
    if(!context.isChat) { await context.send({ message: `Воспользуйтесь кнопками`, keyboard: game.getPrivateKeyboard() }); }
    return;
  }
	else cmd["cmd"] = (context.messagePayload && context.messagePayload.command ? context.messagePayload.command : context.text);

	var _user = await user.getUser(context.senderId);
  console.log(`[ newMessage ] [ ${context.peerId} ] [ ${context.senderId} ] ==> ${context.text}`);

	await cmd.func(context, { db, util, user, _user, cmd, cmds, vk, cmd, fs, game, vkcoin }).then(() => {}).catch((e) => {
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

	await vkcoin.updates.startPolling(console.log); // Подключение к серверу / заупск
	await vkcoin.api.setShopName(`great`);
  vkcoin.updates.onTransfer(async(event) => {
    const { amount, fromId, id } = event;
    const score = vkcoin.api.formatCoins(amount);

		let _getUser = await user.getUser(fromId);
    if(_getUser == null) return;

		db.get().collection('users').updateOne({ uid: Number(fromId) }, { $inc: { balance: +Math.floor(amount / 1000) } });
    console.log(`пополнения ${score}`);
		vk.get()._vk.api.call("messages.send", {
      peer_id: Number(fromId) ,
      random_id: util.random(-200000000, 200000000),
      message: `Баланс пополнен на ${score} коинов!•`
    }).catch((err) => { console.log(`Ошибка при отправлке сообщения ${err}`); });
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
