import vkQr from '@vkontakte/vk-qr';
import svg2img from 'svg2img';

class ListCommand {
  name = 'список';

  async handler(ctx) {
    const usersPlugin = ctx.getPlugin('common/users');
    const refList = await usersPlugin.User.findAll({
      where: {
        referralValue: 'user',
        referralSource: ctx.user.vkId.toString()
      }
    });

    ctx.builder()
      .lines([
        '🥰 Ваши рефералы:',
        ...refList.map((v, i) => `${i + 1}) ${v}`),
        refList.length === 0 && '😐 У вас пока нет рефералов.'
      ])
      .buttons(ctx, [
        { label: 'Назад', payload: { command: 'реф' } }
      ])
      .answer();
  }
}

export default class ReferalCommand {
  name = 'реф';
  description = 'рефералка';
  emoji = '🥰';
  cache = {
    type: 'user',
    ttl: 5 * 60 * 1000
  };

  subcommands = [
    new ListCommand()
  ];

  generatePhoto(shortUrl) {
    const svgString = vkQr.createQR(shortUrl, {
      qrSize: 512,
      ecc: 0
    });

    return new Promise((resolve, reject) => {
      svg2img(svgString, (error, buffer) => {
        if (error) {
          return reject(error);
        }

        resolve(buffer);
      });
    });
  }

  async handler(ctx) {
    const usersPlugin = ctx.getPlugin('common/users');

    const { short_url: shortUrl } = await ctx.api.utils.getShortLink({
      url: `vk.me/bot_eva?ref=user&ref_source=${ctx.user.vkId}`
    });

    const refCount = await usersPlugin.User.count({
      where: {
        referralValue: 'user',
        referralSource: ctx.user.vkId.toString()
      }
    });

    ctx.builder()
      .lines([
        `🔗 Ссылка: ${shortUrl}`,
        refCount === 0
          ? '💡 Рефералы, это которые пришли в Еву по вашей ссылке или отсканировав QR-код на картинке. За каждого реферала мы даём 100к бит.'
          : `🥰 Рефералов: ${refCount} шт.`
      ])
      .buttons(ctx, [
        { label: 'Список', payload: { command: 'реф список' } }
      ])
      .cachedPhoto(`ref:${ctx.user.vkId}`, () => this.generatePhoto(shortUrl))
      // .photo(await this.generatePhoto(shortUrl))
      .answer();
  }
}
