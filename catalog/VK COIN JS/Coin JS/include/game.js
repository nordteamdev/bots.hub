const db = require('./db');
const vk = require('./vk');
const util = require('./util');

var timer = {};
var coin = {
  1: { name: `Орёл`, smile: `🦅` },
  2: { name: `Решка`, smile: `🌕` },
  3: { name: `Ребро`, smile: `🎰` }
}

module.exports = {
  getGame: async() => {
    return await db.get().collection('game').findOne({}, { sort: { $natural:-1 } });
  },

  winGame: async() => {
    let thisGame = await db.get().collection('game').findOne({}, { sort: { $natural:-1 } });
    let rand = util.random(1,3);

    var winUsers = await db.get().collection('users').find( { inGame: { $ne: 0 } }).toArray();
    var userMSG = [];

    var bulk = db.get().collection('users').initializeUnorderedBulkOp();
    winUsers.forEach((data) => {
      if(data.type == rand) {
        bulk.find({ uid: Number(data.uid) }).update({ $inc: { coins: +Number(data.inGame * 2) }, $set: { inGame: 0 } });
      } else {
        bulk.find({ uid: Number(data.uid) }).update({ $set: { inGame: 0 } });
      }
      userMSG.push(data.uid);
    });
    bulk.execute();

    console.log(coin, coin[rand]);
    vk.multySend(userMSG, `Монетка упала, победительная часть: ${coin[rand].smile} ${coin[rand].name}`);

    db.get().collection('game').updateOne({ _id: thisGame._id }, { $set: { win: Number(rand) } });
    let gameInfo = { id: Number(thisGame.id) + 1, coins: 0, users: 0, win: 0, hash: `none`, time: 0 };
    db.get().collection('game').insertOne(gameInfo);
  },

  getList: async() => {
    var list = await db.get().collection('game').find({}, { sort: { $natural:-1 } }).limit(10).toArray();
    var str = ``;

    list.forEach((data) => {
      if(data.win != 0) {
        str += `${coin[data.win].smile}`;
      }
    });

    return str;
  },

  timer: timer,
  coin: coin,
}
