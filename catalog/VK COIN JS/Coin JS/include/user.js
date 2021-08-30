const db = require('./db');
const vk = require('./vk');

const typeCoin = {
  1: `Орел`,
  2: `Решка`,
  3: `Ребро`
}

module.exports = {
  getUser: async(uid) => {
    let _user = await db.get().collection('users').findOne({ uid: Number(uid) });
    if(_user != null) return _user;

    let vkUser = await vk.get()._vk.api.call('users.get', { user_ids: Number(uid), fields: 'name,lastname,sex,photo_100' });
    if(!vkUser || !vkUser[0]) { return false; }

    let userInfo = {
      uid: Number(uid),
      name: vkUser[0].first_name,
      right: 0,
      coins: 10000000,
      inGame: 0,
      type: 0,
      menu:0,
      firstMessage: Math.floor(new Date() / 1000)
    }; db.get().collection('users').insertOne(userInfo);
    return userInfo;
  },

  convertToType: (msg) => {
    return msg.replace(/(орел|орол|орёл)/i, 1).replace(/(решка|рэшка)/i, 2).replace(/ребро/i, 3);
  },

  isUser: async(uid) => {
    return (await db.get().collection('users').findOne({ uid: Number(uid) }) == null ? false : true);
  },
}
