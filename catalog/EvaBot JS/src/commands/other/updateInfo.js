export default class UpdateInfoCommand {
  name = 'обновление';
  aliases = ['обнова', 'обновления'];
  description = 'лог изменений';
  emoji = '📑';
  arguments = {
    version: { name: 'версия', type: 'string', optional: true }
  }

  async handler(ctx) {
    const versions = await ctx.henta.util.loadSettings('updates.json');
    const version = ctx.params.version || (await ctx.henta.util.loadSettings('../package.json')).version;
    const updatePost = versions[version];
    if (!updatePost) {
      return ctx.answer('Данная версия не найдена.');
    }

    ctx.builder()
      .text(`📑 Версия: ${version}`)
      .attach(updatePost)
      .answer();
  }
}
