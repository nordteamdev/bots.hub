import { Op } from 'sequelize';
// eslint-disable-next-line import/extensions
import createMessageBuilder from '../../plugins/common/bot/src/messageBuilder/creator.js';

function chunk(arr, chunkSize) {
  const R = [];
  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    R.push(arr.slice(i, i + chunkSize));
  }

  return R;
}

function getRandomId() {
  return `${Math.floor(Math.random() * 1e4)}${Date.now()}`;
}

export default class DoAllMail {
  name = 'разослать';
  right = 'doAllMail';
  arguments = {
    slug: { name: 'тип', type: 'word' }
  }

  async handler(ctx) {
    const msg = ctx.getPayloadValue('allmailMsg') || ctx.replyMessage;
    if (!msg) {
      return ctx.answer('Вы не прикрепили сообщение для рассылки.');
    }

    const allmailPlugin = ctx.getPlugin('common/allmail');
    const category = allmailPlugin.categories.find(v => v.slug === ctx.params.slug);
    if (!category) {
      return ctx.answer('📛 Такая подписка не существует.');
    }

    const { AllmailSubscriber } = ctx.getPlugin('common/allmail');

    const messageBuilder = createMessageBuilder();
    messageBuilder.setContext({ vk: ctx.vk });
    messageBuilder.attach(msg.attachments.join(','));
    messageBuilder.lines([
      msg.text,
      '\n💡 Вы можете управлять своими рассылками командой `рассылка`.'
    ]);

    const data = await AllmailSubscriber.findAll({ where: { slug: ctx.params.slug } });

    const ids = data.map(v => v.vkId);
    const userIds = ids.filter(v => v < 2e9);
    const chatIds = ids.filter(v => v > 2e9);

    const userIdsChunks = chunk(userIds, 100);

    const userMessages = userIdsChunks.map(v => ({
      user_ids: v,
      random_id: getRandomId(),
      ...messageBuilder.msg
    }));

    const chatMessages = chatIds.map(v => ({
      chat_id: v - 2e9,
      random_id: getRandomId(),
      ...messageBuilder.msg
    }));

    ctx.send('Начинаю рассылку...');
    const result = await ctx.vk.collect.executes('messages.send', [
      ...userMessages,
      ...chatMessages
    ]);

    const bankPlugin = ctx.getPlugin('bot/bank');
    bankPlugin.BankAccount.increment({ count: category.bonus }, {
      where: {
        vkId: {
          [Op.in]: userIds
        }
      }
    });

    bankPlugin.cache = new Map();

    ctx.answer([
      '✔️ Рассылка завершена.',
      `👥 Пользователей: ${userIds.length} шт.`,
      `💬 Чатов: ${chatIds.length} шт.`,
      `⭕ Ошибок: ${result.errors.length}`
    ]);
  }
}
