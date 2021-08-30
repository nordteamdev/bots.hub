const { VK, Keyboard } = require('vk-io');
const vk = new VK();
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

  state._vk = vk.setOptions({ token: config.groupToken, pollingGroupId: config.groupID });
  vk.updates.start().catch(console.error);
  done();
};

exports.get = function() {
  return state;
};

exports.setHook = function(obj, done) {
  vk.updates.on(obj, async(context) => {
  	done(context);
  });
}
