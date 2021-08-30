module.exports = {
  tag: ["топ"],
  button: ["top_players"],
  func: async(context, { _user, db, util }) => {
    let winUsers = await db.get().collection('users').find().sort({ win: -1 }).limit(10).toArray();
    let topText = `${_user.name}, Топ игроков: <br><br>`;
    winUsers.forEach((res, i) => {
      topText += `[ ${Number(i) + 1} ] [id${res.uid}|${res.name}] - выиграл ${util.number_format(res.win)}<br>`;
    }); await context.send(topText);
  }
};
