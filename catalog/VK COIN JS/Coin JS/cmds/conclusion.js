module.exports = {
  tag: ["вывод"],
  button: ["conclusion"],
  func: async(context, { _user, db }) => {
    db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { menu: 2, type: 0 } });
    await context.send(`Укажите сумму для вывода:`);
  }
};
