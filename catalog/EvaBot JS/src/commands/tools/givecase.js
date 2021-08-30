export default class GivecaseCommand {
  name = 'гивкейс'
  description = 'выдать кейс'
  emoji = '📦'
  right = 'give-case'
  arguments = {
    target: { name: 'пользователь', type: 'user' },
    slug: { name: 'кейс-slug', type: 'string' }
  }

  async handler (ctx) {
    const casesPlugin = ctx.getPlugin('bot/cases');
    const currentCaseType = casesPlugin.fromSlug[ctx.params.slug];
    if (!currentCaseType) {
      return ctx.answer('⛔ Такой кейс не существует');
    }

    casesPlugin.Case.create({
      vkId: ctx.params.target.vkId,
      slug: ctx.params.slug
    });

    ctx.params.target.send(`📦 ${ctx.user} выдал вам ${currentCaseType.title}.`);
    ctx.answer([
      `📦 Выдан кейс для ${ctx.params.target}:`,
      `⬛ ${currentCaseType.title}.`
    ])
  }
}
