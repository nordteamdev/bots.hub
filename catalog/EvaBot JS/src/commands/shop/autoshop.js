export default class {
  private = true;
  
  constructor () {
    Object.assign(this, {
      name: 'автосалон',
      description: 'купить транспортное средство'
    })
  }

  async handler (ctx) {
    ctx.answer('Вы заглянули в автосалон, но строители выгнали вас. Это место пустое.')
  }
}
