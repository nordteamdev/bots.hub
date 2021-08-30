import { Keyboard } from 'vk-io';

class StSubcommand {
  name = 'статья'

  handler(ctx) {
    ctx.builder()
      .text('⬜ Приятного прочтения.\nvk.com/@bot_eva-who')
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Назад', payload: { command: 'меню' } })
        .oneTime())
      .answer();
  }
}

class SupportSubcommand {
  name = 'поддержка'

  handler(ctx) {
    ctx.builder()
      .text('⬜ Тех. поддержка: vk.me/evabottp')
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Назад', payload: { command: 'меню' } })
        .oneTime())
      .answer();
  }
}

class OtherSubcommand {
  name = 'прочее'

  handler(ctx) {
    ctx.builder()
      .text('Прочее:')
      .keyboard(Keyboard.builder()
        .textButton({ label: '💬 Чат', payload: { command: 'беседа' } })
        .textButton({ label: '📋 О боте', payload: { command: 'меню статья' } })
        .row()
        .textButton({ label: 'Поддержка', payload: { command: 'меню поддержка' } })
        .textButton({ label: 'Донат', color: 'primary', payload: { command: 'донат' } })
        .inline(ctx.clientInfo.inline_keyboard === true)
        .oneTime())
      .answer({ mainMenu: false });
  }
}

export default class MenuCommand {
  name = 'меню'
  description = 'навигация по боту'
  emoji = '🗺'
  subcommands = [
    new StSubcommand(),
    new SupportSubcommand(),
    new OtherSubcommand()
  ]

  async handler(ctx) {
    ctx.builder()
      .lines([
        `Баланс: ${ctx.user.money.toLocaleString('ru')} бит.`
      ])
      .keyboard(Keyboard.builder()
        .textButton({ label: 'Профиль', payload: { command: 'профиль' } })
        .textButton({ label: 'Ачивки', payload: { command: 'ачивки' } })
        .textButton({ label: 'Реферал', payload: { command: 'реф' } })
        .row()
        .textButton({ label: 'Работа', payload: { command: 'работа' } })
        .textButton({ label: 'Банк', payload: { command: 'банк' } })
        .textButton({ label: 'Клан', payload: { command: 'клан' } })
        .row()
        .textButton({ label: 'Питомец', payload: { command: 'пит' } })
        .textButton({ label: 'Команды', payload: { command: 'помощь' } })
        .row()
        // .textButton({ label: '🆕', color: 'primary', payload: { command: 'реф' } })
        .textButton({ label: 'Ⓜ️', payload: { command: 'меню прочее' } })
        .textButton({ label: '💵', payload: { command: 'донат' } })
        .inline(ctx.clientInfo.inline_keyboard === true)
        .oneTime())
      .answer({ mainMenu: false });
  }
}
