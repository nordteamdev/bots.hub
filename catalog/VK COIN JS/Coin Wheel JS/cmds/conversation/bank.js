module.exports = {
  tag: ["банк"],
  button: ["bank"],
  func: async(context, { vk, _user, game, util }) => {
    let _thisGame = await game.getGame(context.peerId);

    if(!_thisGame.users) {
      return context.send({ message: `
🖤[id${context.senderId}|${_user.name}], информация о текущей игре🖤
🖤Банк: 0 коинов🖤

Ставки:
🖕🏻Не кто не поставил!🖕🏻

💞До конца раунда: ${util.unixStampLeft(_thisGame.game.time - Math.floor(Date.now() / 1000))}💞
      `, keyboard: game.getKeyboard() });
    }

    let coins = 0;
    let str = { blue: [], black: [], even: [], noteven: [], number: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []] };
    _thisGame.users.forEach((res, i) => {
      res.inGame.forEach((g, k) => {
        if(g.peer_id == Number(context.peerId)) {
          if(g.type == `number`) {
            str.number[g.number].push(`${res.name} - ${util.number_format(g.coins)} коинов`);
          } else {
            str[g.type].push(`${res.name} - ${util.number_format(g.coins)} коинов`);
          }
          coins = Number(coins) + Number(g.coins);
        }
      })
    });

    let getNumber = (number) => {
      let gg = ``;
      number.forEach((res, i) => {
        if(res.length != 0) {
            gg += `Ставки на ${i}<br>${res.join('<br>')}<br><br>`;
        }
      }); return `${gg}`;
    }

    await context.send({ message: `
[id${context.senderId}|${_user.name}], информация о текущей игре:
Банк: ${util.number_format(coins)} коинов

${ ( str.blue.length != 0 ? `Ставки на ❤:<br>${str.blue.join('<br>')}` : `` ) }

${ ( str.black.length != 0 ? `Ставки на 💙:<br>${str.black.join('<br>')}` : `` ) }

${ ( str.even.length != 0 ? `Ставки на чётное:<br>${str.even.join('<br>')}` : `` ) }

${ ( str.noteven.length != 0 ? `Ставки на нечётное:<br>${str.noteven.join('<br>')}` : `` ) }

${ getNumber(str.number) }

До конца раунда: ${util.unixStampLeft(_thisGame.game.time - Math.floor(Date.now() / 1000))}
    `, keyboard: game.getKeyboard() });
  }
};
