import schedule from 'node-schedule';

export default class ActiveStatsPlugin {
  constructor(henta) {
    this.henta = henta;
  }

  init(henta) {
    const usersPlugin = henta.getPlugin('common/users');
    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.on('answer', this.onAnswerMessage.bind(this));
    usersPlugin.on('create', this.onNewUser.bind(this));

    schedule.scheduleJob('59 23 * * *', this.echoDayStats.bind(this));
  }

  async start(henta) {
    const redisPlugin = henta.getPlugin('common/redis');
    this.stats = await redisPlugin.serializer.run({
      slug: 'active-stats',
      defaultValue: {}
    });

    this.userStats = await redisPlugin.serializer.run({
      slug: 'active-stats-users',
      defaultValue: {}
    });
  }

  getTotal(day) {
    return day.reduce((acc, v) => acc + v);
  }

  getChangeStr(today, yesterday = 0) {
    const percent = 100 - Math.floor(
      // eslint-disable-next-line no-mixed-operators
      Math.min(yesterday, today) / Math.max(yesterday, today) * 100
    );

    const change = yesterday !== today && ` (${today >= yesterday ? '➕' : '➖'}${percent}%)`;
    return `${today.toLocaleString('ru')}${change || ''}`;
  }

  getPercent(today, yesterday = 0.1) {
    const percent = 100 - Math.floor(
      // eslint-disable-next-line no-mixed-operators
      Math.min(yesterday, today) / Math.max(yesterday, today) * 100
    );

    return today >= yesterday ? percent : -percent;
  }

  async echoDayStats() {
    const bankPlugin = this.henta.getPlugin('bot/bank');
    const botPlugin = this.henta.getPlugin('common/bot');

    const dateStr = this.getDateStr();
    const yesterdayStr = this.getDateStr(-1);

    const messagesChanges = this.getChangeStr(
      this.getTotal(this.stats[dateStr]),
      this.getTotal(this.stats[yesterdayStr])
    );

    const usersChanges = this.getChangeStr(
      this.userStats[dateStr],
      this.userStats[yesterdayStr] || 0
    );

    const total = (
      this.getPercent(
        this.userStats[dateStr],
        this.userStats[yesterdayStr]
      )
      + this.getPercent(
        this.getTotal(this.stats[dateStr]),
        this.getTotal(this.stats[yesterdayStr])
      )
    ) / 2;

    bankPlugin.changeRate(total + 100 / 200);

    const quality = {
      type: 'radialGauge',
      data: {
        datasets: [
          { data: [total], backgroundColor: total > 0 ? 'green' : 'red' }
        ]
      }
    };

    const messageBuilder = botPlugin.createBuilder();
    messageBuilder.setContext({
      peerId: 2000002042,
      vk: this.henta.vk,
      henta: this.henta
    });

    messageBuilder
      .lines([
        '📊 Результаты этого дня:',
        `💌 Сообщения: ${messagesChanges}`,
        `👥 Новых игроков: ${usersChanges}`
      ])
      .photo(`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(quality))}`)
      .send();
  }

  getDateStr(shift = 0) {
    const date = new Date();
    date.setDate(date.getDate() + shift);
    return `${date.getUTCFullYear()}:${date.getUTCMonth() + 1}:${date.getUTCDate()}`;
  }

  getThisDayStats() {
    const dateStr = this.getDateStr();
    this.stats[dateStr] = this.stats[dateStr] || new Array(24).fill(0);

    return this.stats[dateStr];
  }

  getThisStats() {
    const dayStats = this.getThisDayStats();
    const thisHour = new Date().getHours();

    dayStats[thisHour] = dayStats[thisHour] || 0;
    return dayStats[thisHour];
  }

  onAnswerMessage() {
    const dayStats = this.getThisDayStats();
    const thisHour = new Date().getHours();

    dayStats[thisHour] = (dayStats[thisHour] || 0) + 1;
  }

  onNewUser() {
    const dateStr = this.getDateStr();
    this.userStats[dateStr] = (this.userStats[dateStr] || 0) + 1;
  }
}
