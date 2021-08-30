const { VK } = require('vk-io'); // npm i vk-io
const vk = new VK({
	token: process.env.TOKEN
});

const { updates } = vk;
updates.startPolling();

updates.on("wall_post", async (context, next) => {
	const [info] = await vk.api.users.get({ user_id: context["wall"].createdUserId});
	vk.api.messages.send({ user_id: id, message: `Администратор [id${info.id}|${info.first_name} ${info.last_name}] опубликовал пост.`, attachment: `wall${context["wall"].ownerId}_${context["wall"].id}`});
	await next();
})