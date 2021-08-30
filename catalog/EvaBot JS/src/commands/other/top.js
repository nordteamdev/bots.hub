import { Op } from 'sequelize';

export default class TopCommand {
  name = 'топ';
  description = 'лучшие игроки';
  emoji = '⭐';
  cache = {
    type: 'user',
    ttl: 10 * 60 * 1000
  };

  async handler(ctx) {
    const { User } = ctx.getPlugin('common/users');
    const [users, myPos] = await Promise.all([
      User.findAll({
        where: { rating: { [Op.not]: null } },
        order: [['rating', 'DESC']],
        limit: 5
      }),
      User.count({
        where: { rating: { [Op.gte]: ctx.user.rating } }
      })
    ]);

    ctx.answer([
      '⭐ Топ по рейтингу:',
      ...users.map(
        (v, i) => `${i + 1}⃣ ${v}\n— ${v.rating} ед.`
      ),
      myPos ? `\n🔼 Вы №${myPos} в топе!` : '\nВведите `профиль топ`, чтобы пересчитать рейтинг.'
    ]);
  }
}
