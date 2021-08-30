const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const config = require("../config.js");
const util = require('./util');

var state = {
  _vk: null,
  Keyboard: Keyboard,
  VK: VK
};

exports.connect = function (done) {
  if(state.vk) {
    return done();
  }

  state._vk = vk.setOptions({ token: config.groupToken, pollingGroupId: config.groupID });
  vk.updates.start().catch(console.error);
  done();
};

exports.get = function() {
  return state;
};

exports.sendMsg = function(uid, msg) {
  state._vk.api.call("messages.send", {
    peer_id: Number(uid) ,
    random_id: util.random(-200000000, 200000000),
    message: msg
  }).catch((err) => { console.log(`Ошибка при отправлке сообщения ${err}`); });
}

exports.multySend = function(users, msg) {
  var str = ``; users.forEach((data) => { str += `${data},`; });

  state._vk.api.call("messages.send", {
    user_ids: str.substr(0, str.length - 1),
    random_id: util.random(-200000000, 200000000),
    message: msg
  }).catch((err) => { console.log(`Ошибка при отправлке сообщения ${err}`); });
}

exports.setHook = function(obj, done) {
  vk.updates.on(obj, async(context) => {
  	done(context);
  });
}
