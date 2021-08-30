module.exports = {
  tag: ["игра"],
  button: ["game"],
  func: async(context, { _user, db, vkcoin, cmd, game, vk }) => {
    let does = cmd.cmd.split("_")[1];
    let _game = await game.getGame();
    console.log(_game);

    if(does && does.includes(`info`)) {
      var str = `
[ ⚠ ] • ${_user.name},
Текущая игра: #${_game.id}
Хэш игры: ${_game.hash}
Прошедшие игры: ${await game.getList()}
Статус игры: ${_game.users > 2 ? `Ожидание конца`:`Ожидание ставок`}
До конца игры: 00:${_game.time != 0 ? 30 - (Math.floor((Date.now() / 1000) - (_game.time / 1000))):`30`}
Банк игры: ${_game.coins} коинов
Участники:
      `;
      var gUsers = await db.get().collection('users').find( { inGame: { $ne: 0 } }).toArray();
      gUsers.forEach((data) => {
        str += `${game.coin[data.type].smile} ${game.coin[data.type].name} - [id${context.senderId}|${data.name}]<br>`;
      })
      await context.send(str);
    } else if(does && does > 0 && !isNaN(does)) {
      if(_user.type != 0 && _user.inGame != 0) return context.send(`Вы уже сделали ставку`);
      db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { menu: 1, type: Number(does) } });
      await context.send(`Укажите вашу ставку`);
    }
  }
};
