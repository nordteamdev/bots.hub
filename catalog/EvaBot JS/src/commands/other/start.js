import { Keyboard } from 'vk-io'

export default class StartCommand {
  name = 'start'
  aliases = ['начать']
  private = true;
  cache = {
    type: 'all',
    ttl: 86400 * 1000
  };

  handler (ctx) {
    ctx.builder()
      .lines([
        `🌹 Добро пожаловать!`,
        `✨ Рекомендуем прочесть статью для полного понимания происходящего.`,
        'vk.com/@bot_eva-who'
      ])
      .answer()

    ctx.builder()
      .text('💬 Так же будем рады видеть тебя в нашем чате!')
      .keyboard(Keyboard.builder()
        .textButton({ label: `💬 В чат!`, color: 'primary', payload: { command: 'беседа' } })
        .textButton({ label: `🗺 Меню бота`, payload: { command: 'меню' } })
      )
      .send()
  }
}
