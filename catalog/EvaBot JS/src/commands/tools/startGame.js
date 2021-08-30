export default class StartPostGame {
  name = 'spg';
  description = 'start postgame';
  right = 'start-postgame';
  arguments = {
    name: { name: 'имя', type: 'word' },
    type: { name: 'тип', type: 'word' },
    custom: { name: 'дополнительно', type: 'word' }
  };

  async handler(ctx) {
    const postGamePlugin = ctx.getPlugin('bot/postGame');
    const { default: GameClass } = await import(`${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`);
    const game = await postGamePlugin.createGame(GameClass, ctx.params.type, ctx.params.custom);

    ctx.builder()
      .text(`Ответ: ${game.rightAnswer}`)
      .answer();
  }
}
