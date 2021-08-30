import moment from 'moment';
import { Op } from 'sequelize';

class ForTimeSubcommand {
  name = 'время';
  right = 'dstats';
  arguments = {
    date: { name: 'период', type: 'word' },
    flags: { name: 'флаги', type: 'word', optional: true }
  }

  async handler(ctx) {
    const flags = ctx.params.flags || '';
    const periods = {
      ['год']: [86400 * 356, 86400 * 30],
      ['месяц']: [86400 * 30, 86400],
      ['неделя']: [86400 * 7, 86400]
    };

    const period = periods[ctx.params.date];
    if (!period) {
      return ctx.answer('Этот период не существует.');
    }

    const date = moment(Date.now() - period[0] * 1000);

    const periodSectors = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < period[0] / period[1]; i++) {
      periodSectors.push([]);
    }

    const { Donat } = ctx.getPlugin('bot/autodonat');
    const donats = await Donat.findAll({
      where: {
        createdAt: {
          [Op.gte]: date.toDate()
        }
      }
    });

    donats.forEach(v => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < periodSectors.length; i++) {
        const sectorLimit = Date.now() - period[1] * (i + 1) * 1000;
        if (+v.createdAt >= sectorLimit) {
          periodSectors[i].push(v);
          return;
        }
      }
    });

    const jsonData = {
      type: 'line',
      data: {
        labels: periodSectors
          .map((_, i) => moment(Date.now() - period[1] * (i + 1) * 1000).format('l'))
          .reverse(),
        datasets: [
          {
            borderColor: 'green',
            fill: false,
            label: flags.includes('c') ? 'Кол-во' : 'Сумма',
            data: periodSectors.map(v => (
              flags.includes('c') ? v.length : v.reduce((acc, item) => acc + item.price, 0)
            )).reverse()
          }
        ]
      }
    };

    ctx.builder()
      .lines([
        `💵 Всего: ${donats.reduce((acc, item) => acc + item.price, 0).toLocaleString('ru')}₽`
      ])
      .photo(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(jsonData))}`)
      .answer();
  }
}

export default class DonatStatsCommand {
  name = 'дстат';
  right = 'dstats';
  subcommands = [
    new ForTimeSubcommand()
  ];

  constructor() {
    moment.locale('ru');
  }

  handler(ctx) {
    const jsonData = {
      type: 'line',
      label: 'Вы',
      data: {
        labels: ['Баланс', 'Питомец', 'Семечки', 'Уровень'],
        datasets: [
          {
            data: [50, 60, 70, 180],
            backgroundColor: 'green'
          }
        ]
      }
    };

    ctx.builder()
      .text('abc')
      .photo(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(jsonData))}`)
      .answer();
  }
}
