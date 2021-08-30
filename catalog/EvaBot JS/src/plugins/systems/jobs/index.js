const Sequelize = require('sequelize')
const CronJob = require('cron').CronJob

class JobsPlugin {
  constructor (henta) {
      this.henta = henta
    this.list = require(`${henta.botdir}/jobs.json`)
    this.taggedList = {}
    this.list.forEach(v => { this.taggedList[v.tag] = v })
  }

  init (henta) {
    const usersPlugin = henta.getPlugin('common/users')
    const botcmdPlugin = henta.getPlugin('common/botcmd')

    usersPlugin.addModelField('job', Sequelize.STRING)
    usersPlugin.addMethod('getJob', self => self.job && this.getJob(self.job))

    usersPlugin.addMethod('assertJob', (self, ctx, type, err) => {
      switch (type) {
        case 'has':
          return ctx.assert(self.getJob(), err || `⛔ Вы должны иметь работу.`)
        case 'free':
          return ctx.assert(!self.job, err || `⛔ Вы не должны иметь работу.`)
      }
    })

    botcmdPlugin.addArgumentType('job', async data => {
      return data.ctx.assert(
        this.list.find(v => v.name.toLowerCase() === data.arg.toLowerCase()),
        '⛔ Работа не найдена.'
      )
    })
  }

  start(henta) {
      new CronJob('0 14 15 * * *', this.paySalary.bind(this)).start();
  }

  getJob(name) {
      return this.taggedList[name]
  }

  async paySalary() {
    const usersPlugin = this.henta.getPlugin('common/users')
    const multiSendPlugin = this.henta.getPlugin('common/multiSend')
    const { briefNumber } = this.henta.getPlugin('mybot/moneys')

    this.list.forEach(async job => {
      const isAward = Math.random() > 0.75
      const salary = job.payDay + (isAward ? Math.floor(job.payDay * 0.25) : 0)

      await usersPlugin.User.increment(
        { money: salary },
        { where: { job: job.tag } }
      )

      usersPlugin.cache = new Map()

      const userIds = await usersPlugin.User.findAll({ where: { job: job.tag } }).map(v => v.vkId)
      multiSendPlugin.send(userIds, [
        `💳 Вы получили зарплату!`,
        `➕ ${briefNumber(salary)} бит` + (isAward ? ` (Премия +25%).` : ``)
      ])
    })
  }
}

module.exports = JobsPlugin
