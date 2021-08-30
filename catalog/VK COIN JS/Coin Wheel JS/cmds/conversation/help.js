module.exports = {
  tag: ["помощь"],
  button: ["help"],
  func: async(context, { vk, _user, game }) => {
    var Keyboard = vk.get().Keyboard;
    await context.send({ message: `[id${context.senderId}|${_user.name}], воспользуйтесь кнопками!`, keyboard: game.getKeyboard() });
  }
};
