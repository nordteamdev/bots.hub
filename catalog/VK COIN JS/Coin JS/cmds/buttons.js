module.exports = {
  tag: ["сделать ставку"],
  button: ["create_stavka"],
  func: async(context, { _user, db, vk }) => {
    var Keyboard = vk.get().Keyboard;
    await context.send({
  		message: `Сделайте ставку`,
  		keyboard: Keyboard.keyboard([
        [
          Keyboard.textButton({ label: '🦅Орел', payload: { command: 'game_1' }, color: Keyboard.PRIMARY_COLOR }),
          Keyboard.textButton({ label: '🎰Ребро', payload: { command: 'game_3' }, color: Keyboard.PRIMARY_COLOR }),
          Keyboard.textButton({ label: '🌕Решка', payload: { command: 'game_2' }, color: Keyboard.PRIMARY_COLOR })
        ],
        Keyboard.textButton({ label: 'Назад', payload: { command: 'help' }, color: Keyboard.SECONDARY_COLOR })
  		])
  	});
  }
};
