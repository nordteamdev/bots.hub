import { Keyboard } from 'vk-io';
import moment from 'moment';

function makeButtons(ctx, buttons) {
  const keyboard = Keyboard.builder();
  buttons.forEach(v => keyboard.textButton({
    label: v[0],
    payload: { command: v[1] },
    color: v[2] && 'primary'
  }));

  keyboard.inline(ctx.clientInfo.inline_keyboard === true);
  keyboard.oneTime();

  return keyboard;
}

export default class BonusCommand {
  name = 'бонус';
  description = 'биты каждый день';
  emoji = '🎁';

  constructor() {
    moment.locale('ru');
  }

  timeOutAnswer(ctx, lastAttempt) {
    ctx.builder()
      .text(`⌛ Бонус будет доступен ${moment.unix(lastAttempt / 1000 + 86400).fromNow()}.`)
      .keyboard(makeButtons(ctx, [
        ['Меню', 'меню', true]
      ]))
      .answer();
  }

  async handler(ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');

    const lastAttempt = await redisPlugin.get(`bonus:${ctx.user.vkId}`) || 0;

    if (Date.now() - lastAttempt < 86400 * 1000) {
      return this.timeOutAnswer(ctx, lastAttempt);
    }

    redisPlugin.set(`bonus:${ctx.user.vkId}`, Date.now());

    const count = Math.floor(Math.random() * 100000);
    ctx.user.money += count;

    ctx.builder()
      .text('🎁 Вы получили бонус!')
      .keyboard(makeButtons(ctx, [
        ['Меню', 'меню', true]
      ]))
      .answer();
  }
}
