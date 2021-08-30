module.exports = {
  tag: ["прайс"],
  button: ["price"],
  func: async(context, { _user, vkcoin }) => {
  	await context.send(`
[ ✔ ] ${_user.name}, Текущий курс 1.25р за 1 000 000 VK COIN
Также вы можете продать свои койны по курсу 2р здесь - https://vk.com/public191186218
    `);
  }
};