module.exports = {
  tag: ["пополнить"],
  button: ["replenish"],
  func: async(context, { _user, vkcoin }) => {
    const link = vkcoin.api.getLink(1 * 1000, false);
  	await context.send(`[ ✔ ] ${_user.name}, ссылка создана успешно! <br>[ ⚠ ] Пополнить баланс вы можете по этой ссылке: ${link}`);
  }
};
