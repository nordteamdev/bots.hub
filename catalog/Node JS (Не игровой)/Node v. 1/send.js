const api = require('vk-easy');

const { TOKEN } = require('./config');

const keyboard = JSON.stringify({
  one_time: false,
  buttons: [
    [
      {
        action: {
          type: 'text',
          payload: '{"button": "1"}',
          label: 'Отключиться'
        },
        color: 'default'
      }
    ]
  ]
});

module.exports = (userId, text) =>
  api('messages.send', {
    user_id: userId,
    message: text,
    access_token: TOKEN,
    keyboard
  });
