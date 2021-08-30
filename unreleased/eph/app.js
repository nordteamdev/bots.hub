console.log('Derwear Inc. Все права защищены © 2019');


const chalk = require('chalk-master');
var ProgressBar = require('progress');
const { VK, Keyboard } = require('vk-io');
const vk = new VK();
let user = new VK();
const commands = [];
let buttons = [];
let users = require('./base/users.json');


var bar = new ProgressBar('[:bar] :percent', { total: 20 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log(chalk.bold.bgGreen('\nСкрипт запущен.'));
    clearInterval(timer);
  }
}, 200);

user.setOptions({
	token: '18a7172460f9e64f05bc1de108b43b6216bd8e53fdf7649a85cfc57930841e2f63c84adbd2d92007ff18a'
	});
	
async function saveUsers()
{
	require('fs').writeFileSync('./base/users.json', JSON.stringify(users, null, '\t'));
	return true;
}
const fs = require("fs");
vk.setOptions({ token: '18a7172460f9e64f05bc1de108b43b6216bd8e53fdf7649a85cfc57930841e2f63c84adbd2d92007ff18a', pollingGroupId: 185764640 });
const { updates, snippets } = vk;
updates.startPolling();
updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club185764640\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club185764640\|(.*)\]/ig, '').trim();

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			clan_id: null,
			balance: 0
			tag: user_info.first_name
			})
		}
message.user = users.find(x=> x.id === message.senderId);
message.args = message.text.match(command[0]);
	await command[1](message, bot);
	
vk.updates.on(['IsMember'], async (message, next) => {
	if(message.payload.action.member_id == message.senderId) return;
	let user = await vk.api.users.get({user_id: message.payload.action.member_id})

	return message.send(`Hello!`);

		await next();
	});
	
const bot = (text, params) => {
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
		}
message.user = users.find(x=> x.id === message.senderId);
message.args = message.text.match(command[0]);
	await command[1](message, bot);
const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;
});
const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}