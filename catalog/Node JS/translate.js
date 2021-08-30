const config = require('./config');
const translator = require('yandex-translate')(config.yandex_translate);

module.exports = (message) => {
    translator.detect(message.text, (err, res) => {
        if (err)   return message.send('Ошибка! Повторите запрос позднее.');
        translator.translate(message.text, {to: res.lang == 'en' ? 'ru' : 'en'}, (err, res) => {
            if (err)   return message.send('Ошибка! Повторите запрос позднее.');
            message.send(res.text[0]);
        });
    });
};
