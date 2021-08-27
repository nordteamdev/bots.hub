/*var RuCaptcha   = require('rucaptcha');
var solver      = new RuCaptcha({
    apiKey:     '15a2e523235dd94a202a7328828c89bb', //required
    tmpDir:     './tmp',                //optional, default is './tmp'
    checkDelay: 3000                    //optional, default is 1000 - interval between captcha checks
});

function Captcha(key){
 
}



Captcha.prototype.get = function(url) {
  return new Promise((resolve, reject) => {
  	solver.solve('https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg', function(err, answer){
    if (err)
      console.log(err);
    else
    	console.log('Ответ: ' + answer);
    	return {"balance": 11, "answer": answer};
  	});
	
  })
};


module.exports = Captcha;
*/

const Image = require('image-binary');
const client = require('rucaptcha-client')
  .create('834b4e4bbe74cd6526dd4cd0a7b486a1');
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
      console.log('Ответ: ' + answer.text + ' | balance: ' + balance); 
      resolve({"balance": balance,
               "answer": answer.text})
    }).catch((err) => {
      reject(err)
    });
  })
};

module.exports = Captcha;