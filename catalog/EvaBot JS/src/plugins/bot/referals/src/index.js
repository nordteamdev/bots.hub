import Sequelize from 'sequelize';

export default class ReferalsPlugin {
  init(henta) {
    const usersPlugin = henta.getPlugin('common/users');
    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('referals', this.handler.bind(this));

    usersPlugin.field('referralValue', Sequelize.STRING(16));
    usersPlugin.field('referralSource', Sequelize.STRING(16));
  }

  async handler(ctx, next) {
    await next();
    if (!ctx.answered) {
      return;
    }

    if (!ctx.isFirst) {
      return;
    }

    ctx.user.referralValue = ctx.referralValue;
    ctx.user.referralSource = ctx.referralSource;

    if (ctx.referralValue === 'user') {
      const usersPlugin = ctx.getPlugin('common/users');
      const { diffLine } = ctx.getPlugin('systems/moneys');

      const referer = await usersPlugin.get(+ctx.referralSource);
      referer.money += 100000;
      referer.save();
      referer.sendBuilder()
        .cachedPhoto(`res/img/cursedCats/${Math.floor(Math.random() * 8)}.bmp`)
        .line(`🥰 ${ctx.user} теперь ваш реферал!`)
        .line(diffLine(referer, 100000))
        .send();
    }
  }
}
