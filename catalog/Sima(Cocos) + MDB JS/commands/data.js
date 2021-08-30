const { Command, Utils } = require('cocoscore');
const request = require('request')

module.exports = new Command({
    trigger: /^Дата?$/i,
    type: "razvl",
    name: 'Дата',
    description: 'дата регистрации ВКонтакте.',
    emoji: '⌚',
    handler(ctx) {
            request("https://apidog.ru/api/v2/apidog.getUserDateRegistration?userDomain=" + encodeURIComponent(ctx.senderId), function(error, response, body) {
        let data = JSON.parse(body);
        ctx.send(`Ваша Дата регистрации: ${data.response.date} в ${data.response.time}`);
    });
    }
});