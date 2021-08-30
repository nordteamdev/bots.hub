import { Keyboard } from 'vk-io'

export default function initUsersMethods (plugin) {
  const usersPlugin = plugin.henta.getPlugin('common/users')

  usersPlugin.group('req')
    .method('new', (self, data, source) => {
      const code = plugin.getFreeCode()
      const createdTime = Math.floor(Date.now() / 1000)
      if (source) {
        data.sourceId = source.vkId
      }

      data.peers = [data.peer || source.vkid]
      plugin.requests.add({ vkId: self.vkId, code, createdTime, ...data })

      self.sendBuilder()
        .lines([
        `📬 ${data.text} (${code})`
        // `\n⬜ Вы можете ответить на это сообщение символом +/- чтобы принять или отклонить эту заявку. (${code})`
        ])
        .keyboard(Keyboard.builder()
          .textButton({
            label: 'Принять',
            color: 'positive',
            payload: { req: { action: 'accept', code } }
          })
          .textButton({
            label: 'Отклонить',
            color: 'negative',
            payload: { req: { action: 'deny', code } }
          })
          .inline()
        )
        .send()

      const tip = [
        `\n⬜ Вы можете отменить эту заявку, переслав это сообщение с текстом "отмена". (${code})`
      ].join(' ')

      return { code, tip }
    })
    .end()
}