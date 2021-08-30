import MessageBuilder from './index'

export default function createMessageBuilder (data) {
  if (data instanceof MessageBuilder) {
    return data
  }

  return new MessageBuilder(data)
}
