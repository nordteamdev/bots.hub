import moment from 'moment';

function getTotal(day) {
  return day.reduce((acc, v) => acc + v);
}

// eslint-disable-next-line no-unused-vars
function getRecord(stats) {
  return Object.values(stats).reduce((acc, v) => (getTotal(v) > getTotal(acc) ? v : acc), [0]);
}

export default class AStatsCommand {
  name = 'астат';
  right = 'astats';

  constructor() {
    moment.locale('ru');
  }

  handler(ctx) {
    const activeStatsPlugin = ctx.getPlugin('common/activeStats');
    const recordDay = getRecord(activeStatsPlugin.stats);

    const jsonData = {
      type: 'line',
      data: {
        labels: new Array(24).fill(0).map((_, i) => i),
        datasets: [
          {
            fill: true,
            label: 'Сегодня',
            data: activeStatsPlugin.getThisDayStats().filter((v, i) => i <= new Date().getHours())
          },
          {
            fill: false,
            label: 'Вчера',
            data: activeStatsPlugin.stats[activeStatsPlugin.getDateStr(-1)]
          },
          {
            fill: false,
            label: 'Рекорд',
            data: recordDay
          }
        ]
      }
    };

    ctx.builder()
      .photo(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(jsonData))}`)
      .answer();
  }
}
