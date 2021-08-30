import vm from 'vm';
import fs from 'fs';
import util from 'util';
import clearModule from 'clear-module';

export default class DebugPostGame {
  name = 'dpg';
  description = 'дебаг postgame';
  right = 'debug-postgame';
  arguments = {
    name: { name: 'имя', type: 'string' }
  };

  async handler(ctx) {
    const readFile = util.promisify(fs.readFile);

    try {
      clearModule(`${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`);
      const { default: GameClass } = await import(`${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`);
      /* vm.runInThisContext(
        await readFile(`${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`),
        {
          filename: `${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`,
          type: 'module'
        }
      ); */
      const game = new GameClass();
      await game.init();

      ctx.builder()
        .text(`Ответ: ${game.rightAnswer}`)
        .photo(game.generateImage && await game.generateImage())
        .answer();
    } catch (err) {
      ctx.answer(`Ошибка: ${err.stack}`);
    }
    /* try {
       await new Promise((resolve) +.)
      const script  = new vm.Script(await fs.readFile, { filename: 'myfile.vm' });

      for (let i = 0; i < 1000; ++i) {
        script.runInThisContext();
      const { default: GameClass } = await import(`${ctx.henta.botdir}/src/postgames/${ctx.params.name}.js`);
      const game = new GameClass();

      ctx.builder()
        .text(`Ответ: ${game.rightAnswer}`)
        .photo(await game.generateImage())
        .answer();
    } catch (err) {
      ctx.answer(`Ошибка: ${  err}`);
    } */
  }
}
