const Image = require('image-binary');
const client = require('rucaptcha-client')
  .create('8dce418f23a87ebd8cd8c1f54ebb431f');
function Captcha(key){

}

Captcha.prototype.get = function(url) {
  return new Promise((resolve, reject) => {
    client.balance.then((num) => {
      balance = num; 
      return Image.create(url);
    }).then((image) => {
      client.image = image;
      return client.solve({language: 2, regsense: 0});
    }).then((answer) => {
      resolve({"balance": balance,
               "answer": answer.text})
    }).catch((err) => {
      reject(err)
    });
  })
};

module.exports = Captcha;