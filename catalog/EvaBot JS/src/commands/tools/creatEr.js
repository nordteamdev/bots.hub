import { Keyboard } from 'vk-io';

export default class CreatErCommand {
  name = 'creater';
  right = 'creater';

  async handler(ctx) {
    const repostBonusPlugin = ctx.getPlugin('bot/repostBonus');
    const postId = await repostBonusPlugin.createPost();

    ctx.builder()
      .lines([
        'Готово'
      ])
      .keyboard(Keyboard.builder()
        .textButton({
          label: 'Разослать',
          color: 'primary',
          payload: {
            command: 'разослать payouts',
            allmailMsg: {
              text: '💰 Вышла новая раздача! Скорей успей!',
              attachments: [`wall-134466548_${postId}`]
            }
          }
        })
        .oneTime())
      .answer();
  }
}
