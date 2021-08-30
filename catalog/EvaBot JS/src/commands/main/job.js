import { Keyboard } from 'vk-io';
import moment from 'moment';

class FindSubcommand {
  name = 'искать'

  handler(ctx) {
    if (ctx.user.job) {
      return ctx.oops('У вас уже есть работа.', 'Назад', 'работа');
    }

    const jobsPlugin = ctx.getPlugin('systems/jobs');
    const redisPlugin = ctx.getPlugin('common/redis');
    const job = ctx.henta.util.pickRandom(jobsPlugin);

    redisPlugin.set(`jobs:select:${ctx.user.vkId}`, job.slug);

    ctx.builder()
      .lines([
        `💼 Работа: ${job.name}`,
        `💲 Зарплата: ${job.salary.toLocaleString()} бит.`,
        `💵 Цена: ${job.price.toLocaleString()} бит.`
      ])
      .buttons(ctx, [
        { label: 'Устроиться', color: 'primary', payload: { command: 'работа устроиться' } },
        { label: 'Следующая', payload: { command: 'работа искать' } },
        { label: 'Назад', payload: { command: 'работа' } }
      ])
      .answer();
  }
}

class GetJobSubcommand {
  name = 'устроиться'

  async handler(ctx) {
    if (ctx.user.job) {
      return ctx.builder()
        .line('🧧 У вас уже есть работа.')
        .keyboard(Keyboard.builder()
          .textButton({ label: 'Назад', color: 'primary', payload: { command: 'работа' } })
          .textButton({ label: 'Уволиться', color: 'negative', payload: { command: 'работа уволиться' } }))
        .answer();
    }

    const jobsPlugin = ctx.getPlugin('systems/jobs');
    const redisPlugin = ctx.getPlugin('common/redis');
    const job = jobsPlugin.fromSlug[await redisPlugin.get(`jobs:select:${ctx.user.vkId}`)];
    if (!job) {
      return ctx.builder()
        .text('🔎 Давайте для начала найдём работу.')
        .keyboard(Keyboard.builder()
          .textButton({ label: 'Искать', color: 'primary', payload: { command: 'работа искать' } })
          .textButton({ label: 'Назад', payload: { command: 'работа' } })
          .oneTime())
        .answer();
    }

    ctx.user.job = job.slug;

    ctx.builder()
      .lines([
        '✔ Вы устроились на работу!'// ,
        // `💲 Зарплату можно будет получить через час, написав мне любое сообщение.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Назад', payload: { command: 'работа' } })
        .oneTime())
      .answer();
  }
}

class ResignSubcommand {
  name = 'уволиться'

  async handler(ctx) {
    if (!ctx.user.job) {
      return ctx.builder()
        .line('🧧 У вас нет работы.')
        .keyboard(Keyboard.builder()
          .textButton({ label: 'Искать', color: 'primary', payload: { command: 'работа искать' } })
          .textButton({ label: 'Назад', payload: { command: 'работа' } }))
        .answer();
    }

    ctx.user.job = null;

    ctx.builder()
      .text('✔ Вы уволились с работы!')
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Искать', color: 'primary', payload: { command: 'работа искать' } })
        .textButton({ label: 'Меню', payload: { command: 'меню' } })
        .oneTime())
      .answer();
  }
}

class SalarySubcommand {
  name = 'зп';

  constructor() {
    moment.locale('ru');
  }

  timeOutAnswer(ctx, lastAttempt) {
    ctx.builder()
      .text(`⌛ Зарплата будет доступна ${moment.unix(lastAttempt / 1000 + 86400).fromNow()}.`)
      .keyboard(makeButtons(ctx, [
        ['Работа', 'работа', true]
      ]))
      .answer();
  }

  async handler(ctx) {
    const job = ctx.user.jobs.get();
    if (!job) {
      return ctx.builder()
        .line('💼 У вас нет работы..')
        .keyboard(makeButtons(ctx, [
          ['Меню', 'меню', true]
        ]))
        .answer();
    }

    const redisPlugin = ctx.getPlugin('common/redis');

    const lastAttempt = await redisPlugin.get(`salary:${ctx.user.vkId}`) || 0;

    if (Date.now() - lastAttempt < 86400 * 1000) {
      return this.timeOutAnswer(ctx, lastAttempt);
    }

    redisPlugin.set(`salary:${ctx.user.vkId}`, Date.now());

    ctx.user.money += job.salary;

    ctx.builder()
      .text('💲 Вы получили зарплату!')
      .keyboard(makeButtons(ctx, [
        ['Работа', 'работа', true]
      ]))
      .answer();
  }
}

export default class JobCommand {
  name = 'работа'
  description = 'стабильный доход'
  emoji = '💼'
  subcommands = [
    new FindSubcommand(this),
    new GetJobSubcommand(this),
    new ResignSubcommand(this),
    new SalarySubcommand(this)
  ]

  async handler(ctx) {
    const job = ctx.user.jobs.get();
    if (!job) {
      return ctx.builder()
        .line('💼 У вас пока нет работы..')
        .keyboard(Keyboard.builder()
          .textButton({ label: 'Найти работу', color: 'primary', payload: { command: 'работа искать' } }))
        .answer();
    }

    ctx.builder()
      .line(`💼 Работа: ${job.name}`)
      .line(`💲 Зарплата: ${job.salary.toLocaleString()} бит.`)
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Зарплата', color: 'positive', payload: { command: 'работа зп' } })
        .row()
        .textButton({ label: 'Уволиться', color: 'negative', payload: { command: 'работа уволиться' } })
        .textButton({ label: 'Меню', payload: { command: 'меню' } })
        .oneTime())
      .answer();
  }
}
