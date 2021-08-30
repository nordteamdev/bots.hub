import { Op } from 'sequelize';

export default class LevelTopCommand {
  name = 'левелтоп';
  description = 'топ по уровню';
  emoji = '⚡';
  cache = {
    type: 'user',
    ttl: 10 * 60 * 1000
  };

  async handler(ctx) {
    const { User } = ctx.getPlugin('common/users');
    const [users, myPos] = await Promise.all([
      User.findAll({ order: [['level', 'DESC'], ['score', 'DESC']], limit: 5 }),
      User.count({
        where: {
          [Op.or]: [
            { level: { [Op.gt]: ctx.user.level } },
            { level: ctx.user.level, score: { [Op.gt]: ctx.user.score } }
          ]
        }
      })
    ]);

    const lvlPlugin = ctx.getPlugin('systems/lvl');
    // eslint-disable-next-line no-mixed-operators
    const getProgress = user => Math.floor(user.score / lvlPlugin.getMaxScore(user.level) * 100);

    ctx.builder()
      .text('⚡ Топ по уровню:')
      .lines([
        ...users.map(
          (v, i) => `${i + 1}⃣ ${v}\n— ${v.level} (${getProgress(v)}%).`
        ),
        myPos && `\n🔼 Вы №${myPos + 1} в топе!`
      ])
      .answer();
  }
}
