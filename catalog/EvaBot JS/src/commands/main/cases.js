import { Keyboard } from 'vk-io';
import moment from 'moment';

function makeButtons (ctx, buttons) {
  const keyboard = Keyboard.builder();
  buttons.forEach(v => keyboard.textButton({
    label: v[0],
    payload: { command: v[1] },
    color: v[2] && 'primary'
  }));

  keyboard.inline(ctx.clientInfo.inline_keyboard === true);
  keyboard.oneTime();

  return keyboard;
}

function getItemText (henta, item) {
  const casesPlugin = henta.getPlugin('bot/cases');

  const texts = {
    bits: (data) => `${data.count.toLocaleString('ru')} бит`,
    score: (data) => `${data.count.toLocaleString('ru')} ед. опыта`,
    'case': (data) => casesPlugin.fromSlug[data.caseSlug].title
  };

  return texts[item.slug](item);
}

class OpenSubcommand {
  name = 'открыть';
  arguments = {
    index: { name: 'индекс', type: 'integer' }
  }

  noCaseAnswer (ctx) {
    ctx.builder()
      .line('📦 Этот кейс не найден.')
      .keyboard(makeButtons(ctx, [
        ['К кейсам', 'кейс', true]
      ]))
      .answer();
  }

  async giveItem (ctx, user, item) {
    const casesPlugin = ctx.getPlugin('bot/cases');

    const funcs = {
      bits: () => {
        user.money += item.count;
        user.save();
      },
      score: () => {
        user.lvl.addScore(item.count);
        user.save();
      },
      'case': () => {
        casesPlugin.Case.create({
          vkId: user.vkId,
          slug: item.caseSlug
        });
      }
    };

    funcs[item.slug]();
  }

  async openCase (ctx, currentCase) {
    const redisPlugin = ctx.getPlugin('common/redis');
    const casesPlugin = ctx.getPlugin('bot/cases');

    redisPlugin.del(`case-open:${ctx.user.vkId}`);

    const item = currentCase.type.items[
      Math.floor(Math.random() * currentCase.type.items.length)
    ];

    const text = getItemText(ctx.henta, item);

    await ctx.builder()
      .text(`✨ Вам выпало: ${text}.`)
      .attach(casesPlugin.imager.getWin(item.slug, text))
      .keyboard(makeButtons(ctx, [
        ['К кейсам', 'кейс', true]
      ]))
      .answer();

    this.giveItem(ctx, ctx.user, item);
    currentCase.destroy();
  }

  async handler (ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');
    const casesPlugin = ctx.getPlugin('bot/cases');

    const cases = await casesPlugin.getCases(ctx.user.vkId);
    const currentCase = cases[ctx.params.index - 1];

    if (!currentCase) {
      return this.noCaseAnswer(ctx);
    }

    const step = +(await redisPlugin.get(`case-open:${ctx.user.vkId}`) || 0) + 1;

    if (step >= 10) {
      return this.openCase(ctx, currentCase);
    }

    redisPlugin.set(`case-open:${ctx.user.vkId}`, step);

    ctx.builder()
      .text(`🔑 До открытия кейса осталось ${10 - step} нажатий!`)
      .attach(casesPlugin.imager.getCrack(currentCase.slug, step))
      .keyboard(makeButtons(ctx, [
        ['Открывать', `кейс открыть ${ctx.params.index}`, true]
      ]))
      .answer()
  }
}

class InfoSubcommand {
  name = 'инфо';
  arguments = {
    index: { name: 'индекс', type: 'integer' }
  }

  noCaseAnswer (ctx) {
    ctx.builder()
        .line('📦 Этот кейс не найден.')
        .keyboard(makeButtons(ctx, [
          ['К кейсам', 'кейс', true]
        ]))
        .answer()
  }

  async handler (ctx) {
    const casesPlugin = ctx.getPlugin('bot/cases');
    const cases = await casesPlugin.getCases(ctx.user.vkId);
    const currentCase = cases[ctx.params.index - 1];

    if (!currentCase) {
      return this.noCaseAnswer(ctx);
    }

    ctx.builder()
      .attach(casesPlugin.imager.get(currentCase.slug))
      .keyboard(makeButtons(ctx, [
        ['Открыть', `кейс открыть ${ctx.params.index}`, true]
      ]))
      .answer()
  }
}

class ItemsSubcommand {
  name = 'вещи';
  arguments = {
    slug: { name: 'кейс-slug', type: 'word' }
  }

  noCaseAnswer (ctx) {
    ctx.builder()
        .line('📦 Этот кейс не найден.')
        .keyboard(makeButtons(ctx, [
          ['К кейсам', 'кейс', true]
        ]))
        .answer()
  }

  async handler (ctx) {
    const casesPlugin = ctx.getPlugin('bot/cases');
    const currentCaseType = casesPlugin.fromSlug[ctx.params.slug];

    console.log(ctx.params.slug)

    if (!currentCaseType) {
      return this.noCaseAnswer(ctx);
    }

    ctx.builder()
      .lines([
        `📦 Предметы:`,
        ...currentCaseType.items.map(v => `🔹 ${getItemText(ctx.henta, v)}`)
      ])
      .attach(casesPlugin.imager.get(ctx.params.slug))
      .answer()
  }
}

class BonusSubcommand {
  name = 'бонус';

  constructor () {
    moment.locale('ru');
  }

  timeOutAnswer (ctx, lastAttempt) {
    ctx.builder()
      .text(`⌛ Бонус будет доступен ${moment.unix(lastAttempt / 1000 + 86400).fromNow()}.`)
      .keyboard(makeButtons(ctx, [
        ['К кейсам', 'кейс', true]
      ]))
      .answer()
  }

  async handler (ctx) {
    const redisPlugin = ctx.getPlugin('common/redis');
    const casesPlugin = ctx.getPlugin('bot/cases');

    const lastAttempt = await redisPlugin.get(`cases:${ctx.user.vkId}`) || 0;

    if (Date.now() - lastAttempt < 86400 * 1000) {
      return this.timeOutAnswer(ctx, lastAttempt);
    }

    redisPlugin.set(`cases:${ctx.user.vkId}`, Date.now());

    const isWin = Math.random() > 0.5;
    if (isWin) {
      casesPlugin.Case.create({
        vkId: ctx.user.vkId,
        slug: 'hube'
      });
    }

    ctx.builder()
      .text(isWin ? '🎉 Вам повезло! Бомж кейс ваш!' : '🤷‍ Увы, сегодня вы без кейса. Может повезёт в другой раз.')
      .keyboard(makeButtons(ctx, [
        ['К кейсам', 'кейс', true]
      ]))
      .answer()
  }
}

export default class CasesCommand {
  name = 'кейс';
  description = 'открытие призов';
  emoji = '📦';
  subcommands = [
    new BonusSubcommand(),
    new InfoSubcommand(),
    new OpenSubcommand(),
    new ItemsSubcommand()
  ];

  async handler (ctx) {
    const casesPlugin = ctx.getPlugin('bot/cases');
    const cases = await casesPlugin.getCases(ctx.user.vkId);

    if (!cases) {
      return this.noCasesAnswer(ctx);
    }

    const keyboard = Keyboard.builder()
      .inline(ctx.clientInfo.inline_keyboard === true)
      .oneTime();

    cases.forEach((v, i) => {
      if (i >= 9) {
        return;
      }

      keyboard.textButton({
        label: i + 1,
        payload: {
          command: `кейс инфо ${i + 1}`
        }
      });

      if ((i+1)%3 === 0) {
        keyboard.row();
      }
    });

    if (cases.length <= 3) {
      keyboard.textButton({
        label: 'Бесплатный кейс',
        color: 'primary',
        payload: {
          command: 'кейс бонус'
        }
      });
    }
    
    ctx.builder()
      .lines([
        '📦 Ваши кейсы:',
        ...cases.map((v, i) => `${i+1} >> ${v.type.title}.`),
        cases.length === 0 && '>> У вас нет кейсов.',
        '\n💡 Введите `кейс инфо <индекс>`, чтобы просмотреть кейс'
      ])
      .keyboard(keyboard)
      .answer();    
  }
}