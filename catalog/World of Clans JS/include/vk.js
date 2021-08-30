const { VK, Keyboard } = require('vk-io');
const vk = new VK();
const util = require('./util');
const config = require("../config.js");

var state = {
  _vk: null,
  Keyboard: Keyboard,
  VK: VK
};

exports.connect = function (done) {
  if(state.vk) {
    return done();
  }

  state._vk = vk.setOptions({ token: config.token });
  vk.updates.start().catch(console.error);
  done();
};

exports.get = function() {
  return state;
};

exports.sendMsg = function(uid, msg, payload) {
  state._vk.api.call("messages.send", {
    peer_id: Number(uid),
    random_id: util.random(-200000000, 200000000),
    message: msg,
    payload: payload
  });
}

exports.setHook = function(obj, done) {
  vk.updates.on(obj, async(context) => {
  	done(context);
  });
}
