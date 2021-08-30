module.exports = {
  tag: ["вывод"],
  button: ["output"],
  func: async(context, { vk, _user, game, util, db, vkcoin }) => {
    await vkcoin.api.sendPayment(context.senderId, Number(_user.balance) * 1000, true).then(async() => {
      db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { balance: 0 } });
      console.log(`[ ${context.senderId} ] вывод ${util.number_format(_user.balance)}`);
      await context.send({ message: `[id${context.senderId}|${_user.name}], Отправлено ✔ ( ${util.number_format(_user.balance)} )`, keyboard: game.getKeyboard() });
    }).catch(async(err) => {
      await context.send(`[id${context.senderId}|${_user.name}], у вас нет коинов!`); //${err}
    });
    //await context.send({ message: `Заявка на вывод создана!`, keyboard: game.getKeyboard() });
  }
};
