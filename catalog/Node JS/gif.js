const Yandex = require('yandex-speech');
const redis = require('redis').createClient();
const fs = require('fs');
const sha1 = require('sha1');

module.exports = (message, group, config, user) => {
    user.api.docs.search({q: message.text+' gif', count: 500}).then((response) => {
        if (response.count === 0) return message.send('Извините &#128530; , но по Вашему запросу ничего не найдено. ', {forward_messages: message.id});
        var doc = getRandomInt(0,50);
        message.send({
            attachment: 'doc'+response.items[doc].owner_id + '_' + response.items[doc].id
        });
        redis.del(sha1(message.text.toLowerCase()) + message.user);
    });

};

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}