const fs = require('fs');
const sha1 = require('sha1');
const request = require('request');
const redis = require('redis').createClient();
const VK = require('vk-io');
const async = require('async');
const messages = require('./messages');
const Promise = require('bluebird');
const config = require('./config');
const Voice = require('./voice');
const Gif = require('./gif');
const Translate = require('./translate');

const group = new VK({token: config.group_token});

const user = new VK({
    token: config.user_token
});


group.longpoll().then(() => {
    console.log('Longpoll запущен!');
}).catch((error) => {
    console.error(`Longpoll, ошибка - ${error}`);
});


group.on('message', (message) => {
    if (message.hasFlag('answered')) return;
    user.api.groups.isMember({group_id: config.group_id, user_id: message.user}).then((status) => {

        if (status === 0) {
            message.send('Чтобы мною пользоваться, нужно на меня подписаться vk.com/public142336553 &#128527;!', {forward_messages: message.id});
            return;
        }
        redis.set(`last_${message.user}`, message.text);
        redis.expire(`last_${message.user}`, 10);
        console.log('Новое сообщение:', message.text);


        redis.get(`last_${message.user}`, (err, value) => {
            if (sha1(value) === sha1(message.text)) return;
        });


        if (messages[message.text.toLowerCase()] !== undefined) {
            console.log(messages[message.text.toLowerCase()]);
            return message.send(messages[message.text.toLowerCase()]);
        } else {
            switch (message.text.toLowerCase()) {
                case '/voice':
                case 'voice':
                case '/мщшсу':
                case '!voice':
                    redis.set(`type_${message.user}`, 'voice');
                    return message.send('Режим синтезатора речи включён.');
                case '/gif':
                case '!gif':
                case 'gif':
                case '/пша':
                    redis.set(`type_${message.user}`, 'gif');
                    return message.send('Режим поиска гифок включён.');
                case '/translate':
                case '!translate':
                case 'translate':
                case '/екфтыдфеу':
                    redis.set(`type_${message.user}`, 'translate');
                    return message.send('Режим переводчика включён.');
            }


            group.setCaptchaHandler((src, again, sid) => {
                redis.set(`captcha_last_${message.user}`, 'sid');
                console.log('Капча');
                group.upload.message({
                    file: `${src}.jpeg`
                }).then((info) => {
                    const attachment = group.getAttachment('photo', info);
                    message.send({
                        attachment: attachment
                    });
                }).catch((error) => {
                    console.log(error);
                });
                new Promise((resolve, reject) => {
                    var check = setInterval(() => {
                        redis.get(`last_${message.user}`, (err, value) => {
                            if (!err && value != null) {
                                clearInterval(check);
                                console.log(value);
                                resolve(value);
                            }
                        });
                    }, 500);
                }).then((code) => {
                    console.log(code);
                    again(code)
                        .then(() => {
                            redis.del(`captcha_last_${message.user}`);
                            redis.del(`last_${message.user}`);
                            console.log('Капча введена верно!');
                        })
                        .catch(() => {
                            redis.del(`last_${message.user}`);
                            console.error('Капча введена не верно!');
                        });
                });
            });

            user.setCaptchaHandler((src, again, sid) => {
                redis.set(`captcha_last_${message.user}`, 'sid');
                console.log('Капча');
                group.upload.message({
                    file: `${src}.jpeg`
                }).then((info) => {
                    const attachment = group.getAttachment('photo', info);
                    message.send({
                        attachment: attachment
                    });
                }).catch((error) => {
                    console.log(error);
                });
                new Promise((resolve, reject) => {
                    var check = setInterval(() => {
                        redis.get(`last_${message.user}`, (err, value) => {
                            if (!err && value != null) {
                                clearInterval(check);
                                console.log(value);
                                resolve(value);
                            }
                        });
                    }, 500);
                }).then((code) => {
                    console.log(code);
                    again(code)
                        .then(() => {
                            redis.del(`captcha_last_${message.user}`);
                            redis.del(`last_${message.user}`);
                            console.log('Капча введена верно!');
                        })
                        .catch(() => {
                            redis.del(`last_${message.user}`);
                            console.error('Капча введена не верно!');
                        });
                });
            });

            async.series([(next) => {
                    redis.get(`captcha_last_${message.user}`, (err, value) => {
                        if (err || value == null) {
                            next();
                        }
                    });
                }, (next) => {
                    redis.get(`type_${message.user}`, (err, value) => {
                        if (err || value == null) {
                            return Voice(message, group, config, user);
                        } else {
                            switch (value) {
                                case 'voice':
                                    return Voice(message, group, config, user);
                                case 'gif':
                                    return Gif(message, group, config, user);
                                case 'translate':
                                    return Translate(message);
                                default:
                                    return Voice(message, group, config, user);
                            }
                        }
                    });
                }],
                (error) => {

                }
            );

        }
    });


});


process.on("uncaughtException", (err) => {
    console.log(err);
});