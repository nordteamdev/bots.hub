const RuCaptcha   = require('rucaptcha');
const config = require("../config.js");

var state = {
  capcha: null
};

exports.connect = function (done) {
  if(state.vk) {
    return done();
  }

  state.capcha = new RuCaptcha({ apiKey: config.ru_key, tmpDir: './tmp', checkDelay: 1000 });
  done();
};

exports.get = function() {
  return state.capcha;
};

exports.getCapcha = function(url) {
  return new Promise((resolve, reject) => {
    state.capcha.solve(url, function(err, answer){
      if(err) return reject(err);
      else return resolve(answer);
    });
  });
}
