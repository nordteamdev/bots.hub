import { Keyboard } from 'vk-io'
import { Op } from 'sequelize'

class TopSubcommand {
  name = 'топ'

  async handler (ctx) {
    const { SeedsStat, getStat } = ctx.getPlugin('bot/gameSeeds');

    const myStat = await getStat(ctx.user.vkId)
    const myPos = myStat && await SeedsStat.count({ where: { count: { [Op.gte]: myStat } } })

    const stats = await SeedsStat.findAll({ order: [['count', 'DESC']], limit: 5 })

    ctx.builder()
      .text('📊 Топ семкощелкателей:')
      .lines([
        ...stats.map(
          (v, i) => `${i + 1}⃣ [id${v.vkId}|${v.count.toLocaleString('ru')} сем.]`
        ),
        myStat && `\n🔼 Вы №${myPos} в топе!`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: `Семечки`, payload: { command: 'семечки' } })
        .inline(ctx.clientInfo.inline_keyboard === true)
        .oneTime()
      )
      .answer()
  }
}

class PeckSubcommand {
  name = 'щелкать'

  async handler (ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');
    const { SeedsStat, peck } = ctx.getPlugin('bot/gameSeeds');
    const stat = await peck(ctx.user.vkId);

    redisPlugin.set('seeds-trash', (parseInt(await redisPlugin.get('seeds-trash')) || 0) + 1)

    ctx.user.lvl.addScore(1)
    ctx.user.achievements.unlockIf('seeds', stat === 1000);
    
    ctx.builder()
      .lines([
        `➕ Вы щелкнули семечку.`,
        `🌻 Всего: ${stat.toLocaleString('ru')} сем.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Щёлк!', color: 'positive', payload: { command: 'семечки щелкать' } })
        .oneTime()
      )
      .answer();
  }
}

class ClearSubcommand {
  name = 'убираться'

  async handler (ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');
    let trash = parseInt(await redisPlugin.get('seeds-trash')) || 0;

    const cleared = Math.min(Math.floor(Math.random() * 20), trash);

    trash -= cleared;
    ctx.user.money += cleared;

    redisPlugin.set('seeds-trash', trash)

    ctx.builder()
      .lines([
        `✨ Вы убрали ${cleared} ед. мусора`,
        `🌻 Осталось: ${trash.toLocaleString('ru')} ед.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Убираться', color: 'primary', payload: { command: 'семечки убираться' } })
        .oneTime()
      )
      .answer();
  }
}

export default class SeedsCommand {
  name = 'семечки'
  description = 'щелкать семки'
  emoji = '🌻';
  subcommands = [
    new PeckSubcommand(),
    new TopSubcommand(),
    new ClearSubcommand()
  ]

  async welcome (ctx) {
    const { getTotal } = ctx.getPlugin('bot/gameSeeds');
    const total = await getTotal();

    ctx.builder()
      .lines([
        `Вы можете щелкать семечки и получать одну единицу опыта за каждую семечку. Также здесь присутствует топ по самым активным семкощелкателям.`,
        `\n👥 Всего: ${total.toLocaleString('ru')} сем.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Щёлк!', color: 'positive', payload: { command: 'семечки щелкать' } })
        .textButton({ label: 'Топ', payload: { command: 'семечки топ' } })
        .row()
        .textButton({ label: 'Убираться', payload: { command: 'семечки убираться' } })
        .inline(ctx.clientInfo.inline_keyboard === true)
        .oneTime()
      )
      .answer();
  }

  async handler (ctx) {
    const { getStat, getTotal } = ctx.getPlugin('bot/gameSeeds');
    const stat = await getStat(ctx.user.vkId);
    if (!stat) {
      return this.welcome(ctx);
    }

    const total = await getTotal();
    const percent = Math.floor(stat / total * 100);

    ctx.builder()
      .lines([
        `🌻 Вы: ${stat.toLocaleString('ru')} сем. (${percent}%)`,
        `👥 Всего: ${total.toLocaleString('ru')} сем.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Щёлк!', color: 'positive', payload: { command: 'семечки щелкать' } })
        .textButton({ label: 'Топ', payload: { command: 'семечки топ' } })
        .row()
        .textButton({ label: 'Убираться', payload: { command: 'семечки убираться' } })
        .inline(ctx.clientInfo.inline_keyboard === true)
        .oneTime()
      )
      .answer();
  }
}
