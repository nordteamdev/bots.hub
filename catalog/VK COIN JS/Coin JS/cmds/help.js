module.exports = {
  tag: ["помощь", "начать", "меню"],
  button: ["help", "start"],
  func: async(context, { vk }) => {
    var Keyboard = vk.get().Keyboard;
    await context.send({
  		message: `Меню`,
  		keyboard: Keyboard.keyboard([
        Keyboard.textButton({ label: 'Сделать ставку', payload: { command: 'create_stavka' }, color: Keyboard.PRIMARY_COLOR }),
        [
          Keyboard.textButton({ label: 'Пополнить', payload: { command: 'replenish' }, color: Keyboard.POSITIVE_COLOR }),
          Keyboard.textButton({ label: 'Статус игры', payload: { command: 'game_info' }, color: Keyboard.NEGATIVE_COLOR }),
          Keyboard.textButton({ label: 'Вывод', payload: { command: 'conclusion' }, color: Keyboard.POSITIVE_COLOR }),
        ],
        [
          Keyboard.textButton({ label: 'Покупка коинов', payload: { command: 'price' }, color: Keyboard.SECONDARY_COLOR }),
          Keyboard.textButton({ label: 'Информация', payload: { command: 'info' }, color: Keyboard.SECONDARY_COLOR })
        ]
  		])
  	});
  }
};
