import { Op } from 'sequelize';

export default class LiveWidgetPlugin {
  init(henta) {
    setInterval(() => this.updateWidget(henta), 60000);
  }

  async updateWidget(henta) {
    const jsonData = {
      title: 'Лучшие игроки',
      title_url: 'https://vk.me/bot_eva',
      more: 'Что такое рейтинг?',
      more_url: 'https://vk.com/bot_eva?w=wall-134466548_6263',
      head: [
        {
          text: 'Никнейм'
        },
        {
          text: 'Рейтинг',
          align: 'center'
        },
        {
          text: 'Баланс',
          align: 'center'
        },
        {
          text: 'Уровень',
          align: 'center'
        }
      ]
    };

    const { User } = henta.getPlugin('common/users');
    const lvlPlugin = henta.getPlugin('systems/lvl');
    // eslint-disable-next-line no-mixed-operators
    const getProgress = user => Math.floor(user.score / lvlPlugin.getMaxScore(user.level) * 100);

    const users = await User.findAll({
      where: {
        rating: { [Op.not]: null }
      },
      order: [['rating', 'DESC']],
      limit: 10
    });

    jsonData.body = users.map(v => ([
      {
        text: v.nickName,
        icon_id: `id${v.vkId}`,
        url: `https://vk.com/id${v.vkId}`
      },
      {
        text: v.rating.toLocaleString('ru')
      },
      {
        text: v.money.toLocaleString('ru')
      },
      {
        text: `${v.level} (${getProgress(v)}%)`
      }
    ]));

    henta.vk.api.appWidgets.update({
      code: `return ${JSON.stringify(jsonData)};`,
      type: 'table',
      access_token: '_'
    });
  }
}
