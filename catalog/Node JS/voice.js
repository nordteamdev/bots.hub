const Yandex = require('yandex-speech');
const redis = require('redis').createClient();
const fs = require('fs');
const sha1 = require('sha1');

module.exports = (message, group, config,user ) => {
    redis.get(sha1(message.text.toLowerCase()), (err, value) => {
        if (value == null || err) {
            setTimeout(() => {
                Yandex.TTS({
                        speaker: 'ermil',
                        text: message.text.toLowerCase(),
                        file: 'audio/' + sha1(message.text.toLowerCase()) + '.mp3'
                    }, () => {
                user.upload.voice({
                            file: __dirname + '/audio/' + sha1(message.text.toLowerCase()) + '.mp3',
                            group_id: config.group_id
                        }).then((info) => {
                            fs.unlinkSync(__dirname + '/audio/' + sha1(message.text.toLowerCase()) + '.mp3');
                            const attachment = group.getAttachment('doc', info);

                            message.send({
                                attachment: attachment
                            });
                            redis.set(sha1(message.text.toLowerCase()), attachment);
                            redis.del(`last_${message.user}`);
                        }).catch((error) => {
                            console.log(error);
                            message.send('Извините &#128530; , но у меня охрип голос. Попросите меня поздней &#128521; \n Помощь - /help', {forward_messages: message.id});
                            redis.del(`last_${message.user}`);
                            fs.unlinkSync(__dirname + '/audio/' + sha1(message.text.toLowerCase()) + '.mp3');
                        });
                    }
                );
            }, 3500);
        } else {
            message.send({
                attachment: value
            });
            redis.del(sha1(message.text.toLowerCase()) + message.user);
        }
    });
};