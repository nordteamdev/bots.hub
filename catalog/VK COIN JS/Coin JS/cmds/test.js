module.exports = {
  tag: ["test"],
  button: ["test"],
  func: async(context, { _user, game }) => {
    game.timer = setTimeout(game.winGame, 30000);
  	await context.send(`[ ✔ ] ${_user.name}, good`);
  }
};
