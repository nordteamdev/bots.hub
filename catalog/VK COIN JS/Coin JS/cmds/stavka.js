module.exports = {
  regexp: /^(\d+)$/i,
  button: ["help"],
  func: async(context, { cmd, _user, db, game, util, vkcoin, vk }) => {
    if(_user.menu != 1 && _user.menu != 2) return;

    var Keyboard = vk.get().Keyboard;

    if(_user.menu == 1) {
      if(_user.coins < cmd.cmd) {
        db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { menu: 0, type: 0 } });
        return context.send(`У вас нету столько коинов!`);
      }

      var _game = await game.getGame();
      db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { menu: 0 }, $inc: { inGame: +Number(cmd.cmd), coins: -Number(cmd.cmd) } });
      db.get().collection('game').updateOne({ _id: _game._id }, { $set: { time: ((_game.users + 1) == 2 ? Date.now():_game.time) }, $inc: { users: +1, coins: +Number(cmd.cmd) } });

      if((_game.users + 1) == 2) {
        game.timer = setTimeout(game.winGame, 30000);
      }

      await context.send({
    		message: `Вы поставили ставку: ${cmd.cmd}`,
    		keyboard: Keyboard.keyboard([
          Keyboard.textButton({ label: 'Сделать ставку', payload: { command: 'create_stavka' }, color: Keyboard.PRIMARY_COLOR }),
          [
            Keyboard.textButton({ label: 'Пополнить', payload: { command: 'replenish' }, color: Keyboard.POSITIVE_COLOR }),
            Keyboard.textButton({ label: 'Статус игры', payload: { command: 'game_info' }, color: Keyboard.NEGATIVE_COLOR }),
            Keyboard.textButton({ label: 'Вывод', payload: { command: 'conclusion' }, color: Keyboard.POSITIVE_COLOR }),
          ],
          [
            Keyboard.textButton({ label: 'Покупка коинов', payload: { command: 'price' }, color: Keyboard.SECONDARY_COLOR }),
            Keyboard.textButton({ label: 'Информация', payload: { command: 'info' }, color: Keyboard.SECONDARY_COLOR })
          ]
    		])
    	});
    } else if(_user.menu == 2) {
      if(_user.coins < cmd.cmd) return context.send(`[ ⚠ ] • ${_user.name}, у вас нету коинов для вывода`);
      await vkcoin.api.sendPayment(context.senderId, Number(cmd.cmd * 95 / 100) * 1000).then(async() => {
        db.get().collection('users').updateOne({ uid: Number(context.senderId) }, { $set: { coins: 0, menu: 0 } });
        console.log(`[ ${context.senderId} ] Вывел баланс на сумму ${util.number_format(cmd.cmd * 95 / 100)} VK COINS`);
        await context.send({
      		message: `[ ✔ ] • ${_user.name}, VK Coins успешно отправлены!`,
      		keyboard: Keyboard.keyboard([
            Keyboard.textButton({ label: 'Сделать ставку', payload: { command: 'create_stavka' }, color: Keyboard.PRIMARY_COLOR }),
            [
              Keyboard.textButton({ label: 'Пополнить', payload: { command: 'replenish' }, color: Keyboard.POSITIVE_COLOR }),
              Keyboard.textButton({ label: 'Статус игры', payload: { command: 'game_info' }, color: Keyboard.NEGATIVE_COLOR }),
              Keyboard.textButton({ label: 'Вывод', payload: { command: 'conclusion' }, color: Keyboard.POSITIVE_COLOR }),
            ],
            [
              Keyboard.textButton({ label: 'Покупка коинов', payload: { command: 'price' }, color: Keyboard.SECONDARY_COLOR }),
              Keyboard.textButton({ label: 'Информация', payload: { command: 'info' }, color: Keyboard.SECONDARY_COLOR })
            ]
      		])
      	});
      }).catch(async(err) => {
        await context.send({
      		message: `[ ⚠ ] • ${_user.name}, не удалось отправить VK Coins. Ошибка: ${err}`,
      		keyboard: Keyboard.keyboard([
            Keyboard.textButton({ label: 'Сделать ставку', payload: { command: 'create_stavka' }, color: Keyboard.PRIMARY_COLOR }),
            [
              Keyboard.textButton({ label: 'Пополнить', payload: { command: 'replenish' }, color: Keyboard.POSITIVE_COLOR }),
              Keyboard.textButton({ label: 'Статус игры', payload: { command: 'game_info' }, color: Keyboard.NEGATIVE_COLOR }),
              Keyboard.textButton({ label: 'Вывод', payload: { command: 'conclusion' }, color: Keyboard.POSITIVE_COLOR }),
            ],
            [
              Keyboard.textButton({ label: 'Покупка коинов', payload: { command: 'price' }, color: Keyboard.SECONDARY_COLOR }),
              Keyboard.textButton({ label: 'Информация', payload: { command: 'info' }, color: Keyboard.SECONDARY_COLOR })
            ]
      		])
      	});
      });
    }
  }
};
