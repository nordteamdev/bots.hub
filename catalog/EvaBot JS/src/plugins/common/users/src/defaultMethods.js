import createMessageBuilder from './../../bot/src/messageBuilder/creator'

export default function initUserMethods (plugin) {
  plugin.method('getFullName', (self) => `${self.firstName} ${self.lastName}`)
  plugin.method('getUrl', (self) => `vk.com/id${self.vkId}`)
  plugin.method('toString', (self) => `[id${self.vkId}|${self.nickName}]`)
  plugin.method('send', (self, data) => self.sendBuilder(data).send())

  plugin.method('sendBuilder', (self, data) => {
    const messageBuilder = createMessageBuilder(data)
    messageBuilder.setContext({
      peerId: self.vkId,
      vk: plugin.henta.vk,
      henta: plugin.henta
    })

    messageBuilder.answer = () => {
      this.answer(messageBuilder)
    }

    return messageBuilder
  })
}
