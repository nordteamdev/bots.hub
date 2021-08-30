var vk = new ( require('vk-io') );
var users = {};


vk.setToken(`TOKEN`);
vk.longpoll.start();
vk.longpoll.on('message', message => {
	if(!message.text || ~message.flags.indexOf('outbox')) return;
	cmd.list(cmds => {
		if(!cmds.pattern.test(message.text) || message.sended) return;
		message.args = message.text.match(cmds.pattern) || [];
		if(cmds.permissions <= users[message.user]) {
			cmds.f(message);
		}
	})
})

var cmd = {
	list: [],
	on: (regex, desc, level, func) => cmd.list.push({pattern: regex, description: desc, permissions: level, f:func})
}