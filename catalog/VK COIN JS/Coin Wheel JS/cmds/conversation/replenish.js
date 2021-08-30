module.exports = {
  tag: ["пополнить"],
  button: ["replenish"],
  func: async(context, { vk, _user, game, vkcoin }) => {
    const link = vkcoin.api.getLink(20000000, false);
    await context.send({ message: `
[id${context.senderId}|${_user.name}], ссылка для пополнения ${link}
    `, keyboard: game.getKeyboard() });
  }
};
