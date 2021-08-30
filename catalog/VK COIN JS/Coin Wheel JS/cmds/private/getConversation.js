module.exports = {
  tag: ["поиск беседы"],
  button: ["getConversation"],
  func: async(context, { vk, _user, game }) => {
    let _conv = [`https://vk.me/join/AJQ1dzrOZxYHqMrKOm5dhuno`];
    await context.send(`${_user.name}, ссылка на беседу - ${_conv[Math.floor(Math.random() * _conv.length)]}`);
  }
};
