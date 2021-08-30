export default class DoDonatLine {
  name = 'ddl'
  description = 'выполнить донат'
  right = 'do-donat-line'
  arguments = {
    line: { name: 'line', type: 'word' },
    count: { name: 'count', type: 'integer' },
    source: { name: 'source', type: 'word' }
  }
  
  async handler (ctx) {
    const autodonatPlugin = ctx.getPlugin('bot/autodonat')
    
    await autodonatPlugin.processLine(
      ctx.params.line,
      ctx.params.count,
      Date.now().toString(),
      ctx.params.source
    )
    
    ctx.answer('ok')
  }
}