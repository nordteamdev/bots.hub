module.exports = {
  tag: ["баланс"],
  button: ["balance"],
  func: async(context, { _user, vkcoin, util, game }) => {
    let myBalance = Math.floor(await vkcoin.api.getMyBalance() / 1000);
    await context.send({ message: `
💶[id${context.senderId}|${_user.name}], ваш баланс - ${util.number_format(_user.balance)} коинов!💶

💙Выиграно: ${util.number_format(_user.win)} коинов💙



    `, keyboard: game.getKeyboard() });
  }
};
