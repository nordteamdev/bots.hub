import util from 'util';

export default class DoCommand {
  name = '$'
  description = 'выполнить код'
  emoji = '💻'
  right = 'do'
  arguments = {
    code: { name: 'код', type: 'string' }
  }

  async handler (ctx) {
    const attachment = (str) => { ctx.send({ attachment: str }) }
    const getPlugin = (str) => ctx.getPlugin(str)

    try {
      const startTime = Date.now()
      const result = await eval(ctx.params.code)
      const diffTime = Date.now() - startTime
      ctx.answer([
        `⏱ Код выполнен за ${diffTime} мс.`,
        `${util.inspect(result)}`
      ])
    } catch (e) {
      if (!e.stack) throw e
      ctx.answer(e.stack)
    }
  }
}