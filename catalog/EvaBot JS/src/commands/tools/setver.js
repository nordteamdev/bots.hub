import fs from 'fs';
import { Keyboard } from 'vk-io';

export default class SetverCommand {
  name = 'сетвер';
  description = 'обновить бота';
  emoji = '🆙';
  right = 'setver';
  arguments = {
    ver: { name: 'версия', type: 'string' }
  };

  async handler(ctx) {
    const wall = ctx.getAttachments('wall')[0];
    if (!wall) {
      return ctx.answer('Вы не прикрепили запись к сообщению.');
    }

    if (!wall.text.includes('#обновление@bot_eva')) {
      return ctx.answer('В записи нет хештега.');
    }

    const wallStr = `wall${wall.ownerId}_${wall.id}`;

    const versions = await ctx.henta.util.loadSettings('updates.json');
    versions[ctx.params.ver] = wallStr;

    const data = await ctx.henta.util.loadSettings('../package.json');
    const oldVersion = data.version;
    data.version = ctx.params.ver;

    fs.writeFileSync(`${ctx.henta.botdir}/package.json`, JSON.stringify(data, null, '\t'));
    fs.writeFileSync(`${ctx.henta.botdir}/settings/updates.json`, JSON.stringify(versions, null, '\t'));

    ctx.api.board.createComment({
      access_token: ctx.henta.config.private.pageToken,
      group_id: 134466548,
      topic_id: 40537283,
      message: `📑 Версия: ${data.version}\nhttps://vk.com/${wallStr}`,
      from_group: 1
    });

    ctx.builder()
      .lines([
        '🆙 Новая версия:',
        `⬛ ${oldVersion} » ${data.version}.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({
          label: 'Разослать',
          color: 'primary',
          payload: {
            command: 'разослать updates',
            allmailMsg: {
              text: `🆙 Вышла новая версия: ${data.version}`,
              attachments: [wallStr]
            }
          }
        })
        .oneTime())
      .answer();
  }
}
