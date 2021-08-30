const md5 = require('md5');
const db = require('./db');
const vk = require('./vk');
const util = require('./util');

let _conv = [];

let _this = module.exports = {
  getGame: async(peer_id) => {
    let _game = ( !_conv[peer_id] ? _this.newGame(peer_id) : _conv[peer_id] );
    let _users = await db.get().collection('users').find( { inGame: { $ne: [] } }).toArray();
    return { game: _conv[peer_id], users: _users };
  },

  newGame: (peer_id) => {
    let _randNumber = util.random(1,36);
    let _randColor = util.random(0,1);
    let _randString = util.str_rand(20);

    _conv[peer_id] = {
      peer_id: peer_id,
      timer: setTimeout(() => _this.winGame(peer_id), 100000),
      time: Math.floor(new Date() / 1000) + 100,
      hash: {
        hash: _this.getHash( `${_randNumber}|${ (_randColor ? `black`:`blue`) }|${_randString}` ),
        str: _randString,
        color: _randColor,
        number: _randNumber
      }
    }

    console.log(`[ newGame ] [ ${peer_id} ] - ${_randNumber}|${ (_randColor ? `black`:`blue`) }|${_randString}`);
    console.log(`[ hash ] - ${_conv[peer_id].hash.hash}`);

    return _conv[peer_id];
  },

  winGame: async(peer_id) => {
    let _thisGame = await _this.getGame(peer_id);
    let _hash = _thisGame.game.hash;
    if(_thisGame.users.length == 0) {
      console.log(`[ winGame ] [ ${peer_id} ] - конец раунда!`);
      _this.newGame(peer_id);
      return;
    }
    let str = `Выпало число ${_thisGame.game.hash.number}, ${ (_thisGame.game.hash.color ? `💙`:`❤`)}!<br><br>`;
    let _name = { 'blue': `❤`, 'black': `💙`, 'even': `чётное`, 'noteven': `нечётное` };

    var bulk = db.get().collection('users').initializeUnorderedBulkOp(); let _find = false;
    _thisGame.users.forEach((res, i) => {
      res.inGame.forEach((g, k) => {
        if(g.peer_id == Number(peer_id)) {
          if( (g.type == `blue` && _hash.color == 0) || (g.type == `black` && _hash.color == 1) || (g.type == `even` && _hash.number % 2 == 0) || (g.type == `noteven` && _hash.number % 2 != 0) ) {
            str += `🖤[id${res.uid}|${res.name}] - ставка ${util.number_format(g.coins)} на ${_name[g.type]} выиграла! (+${util.number_format(g.coins)})<br>`;
            bulk.find({ uid: Number(res.uid) }).update({ $inc: { win: +Number(g.coins), winround: +1, balance: +Number(g.coins * 2) }, $pull: { inGame: { $in: [ g ] } } });
          }

          else if(g.type == `number` && _hash.number == g.number) {
            str += `[id${res.uid}|${res.name}] - ставка ${util.number_format(g.coins)} на число ${g.number} выиграла! (+${util.number_format(Number(g.coins) * 13)})<br>`;
            bulk.find({ uid: Number(res.uid) }).update({ $inc: { win: +Number(g.coins * 12), winround: +1, balance: +Number(g.coins * 13) }, $pull: { inGame: { $in: [ g ] } } });
          }

          else {
            str += `💔[id${res.uid}|${res.name}] - ставка ${util.number_format(g.coins)} на ${ ( g.type == `number` ? `число ${g.number}` : _name[g.type]) } проиграла<br>`;
            bulk.find({ uid: Number(res.uid) }).update({ $inc: { loseround: +1 }, $pull: { inGame: { $in: [ g ] } } });
          }

          _find = true;
        }
      })
    });
    if(!_find) {
      console.log(`[ winGame ] [ ${peer_id} ] - Завершилась игра`);
      _this.newGame(peer_id);
      return;
    }
    bulk.execute();


    vk.get()._vk.api.call("messages.send", {
      peer_id: Number(_thisGame.game.peer_id) ,
      random_id: util.random(-200000000, 200000000),
      message: str
    }).catch((err) => { console.log(`Ошибка при отправлке сообщения ${err}`); });

    console.log(`[ winGame ] [ ${peer_id} ] - Завершилась игра`);
    _this.newGame(peer_id);
  },

  setGameRes: (peer_id, number, color) => {
    console.log(`[ setGameRes ]: ${peer_id}`, !peer_id, !number, !color, !_conv[peer_id]);
    if(!peer_id || !number || !color || !_conv[peer_id]) {
      return 0;
    }
    let _backup = { number: _conv[peer_id].hash.number, color: _conv[peer_id].hash.color };
    _conv[peer_id].hash.number = number;
    _conv[peer_id].hash.color = (color == `blue` ? 0 : 1 );
    return { old: _backup, new: _conv[peer_id] };
  },

  getHash: (str) => {
    return md5(`${str}[PASXALKA](romanovsosimyhyu)[PASXALKA]`)
  },

  getKeyboard: () => {
    var Keyboard = vk.get().Keyboard;
    return Keyboard.keyboard([
      [
        Keyboard.textButton({ label: '❤', payload: { command: 'deposit_blue' }, color: Keyboard.NEGATIVE_COLOR }),
        Keyboard.textButton({ label: 'Банк', payload: { command: 'bank' }, color: Keyboard.POSITIVE_COLOR }),
        Keyboard.textButton({ label: '💙', payload: { command: 'deposit_black' }, color: Keyboard.PRIMARY_COLOR }),
      ],
      [
        Keyboard.textButton({ label: 'Чётное', payload: { command: 'deposit_even' }, color: Keyboard.NEGATIVE_COLOR }),
        Keyboard.textButton({ label: 'На число', payload: { command: 'deposit_number' }, color: Keyboard.POSITIVE_COLOR }),
        Keyboard.textButton({ label: 'Нечётное', payload: { command: 'deposit_noteven' }, color: Keyboard.PRIMARY_COLOR }),
      ],
      [
        Keyboard.textButton({ label: 'Баланс', payload: { command: 'balance' }, color: Keyboard.NEGATIVE_COLOR }),
        Keyboard.textButton({ label: 'Вывод', payload: { command: 'output' }, color: Keyboard.PRIMARY_COLOR }),
        ],
      [
      Keyboard.textButton({ label: 'Ручное пополнение', payload: { command: 'replenish' }, color: Keyboard.SECONDARY_COLOR }),
      ],
      Keyboard.applicationButton({ label: 'Пополнить', appId: 6915965, hash: "#x558085012_20000000_1441405634_1" }),
    ]);
  },
  getPrivateKeyboard: () => {
    var Keyboard = vk.get().Keyboard;
    return Keyboard.keyboard([
      Keyboard.textButton({ label: 'Поиск беседы 🔍', payload: { command: 'getConversation' }, color: Keyboard.POSITIVE_COLOR }),
      [
        Keyboard.textButton({ label: 'Как играть?', payload: { command: 'how_play' }, color: Keyboard.PRIMARY_COLOR }),
        Keyboard.textButton({ label: 'Топ игроков', payload: { command: 'top_players' }, color: Keyboard.PRIMARY_COLOR }),
       Keyboard.textButton({ label: 'Топ игроков', payload: { command: 'top_players' }, color: Keyboard.PRIMARY_COLOR }),
       ],
      Keyboard.applicationButton({ label: 'Глобальный чат', appId: 5747634, ownerId: -184661971 })
    ]);
  }
}

