import createMessageBuilder from './messageBuilder/creator';

async function answer(response) {
  if (this.answered) {
    throw Error('На это сообщение бот уже вернул ответ.');
  }

  this.answered = true;
  const messageBuilder = createMessageBuilder(response);
  messageBuilder.setContext({
    peerId: this.peerId,
    vk: this.henta.vk,
    henta: this.henta
  });

  await this.bot.messageProcessor.emit('answer', this, messageBuilder);

  return messageBuilder.send();
}

function send(response) {
  const messageBuilder = createMessageBuilder(response);
  messageBuilder.setContext({
    peerId: this.peerId,
    vk: this.henta.vk,
    henta: this.henta
  });

  return messageBuilder.send();
}

function builder(response) {
  const messageBuilder = createMessageBuilder(response);
  messageBuilder.setContext({
    peerId: this.peerId,
    vk: this.henta.vk,
    henta: this.henta
  });

  messageBuilder.answer = () => {
    this.answer(messageBuilder);
  };

  return messageBuilder;
}

function oops(text, buttonLabel, buttonCommand) {
  return this.builder()
    .text(`😳 ${text}`)
    .buttons(this, [{
      label: buttonLabel,
      payload: {
        command: buttonCommand
      }
    }])
    .answer();
}

function getPayloadValue(field) {
  return this.messagePayload && this.messagePayload[field];
}

export default function applyContextMethods(ctx, bot) {
  ctx.bot = bot;
  ctx.oops = oops;
  ctx.answer = answer;
  ctx.send = send;
  ctx.builder = builder;
  ctx.henta = bot.henta;
  ctx.getPlugin = bot.henta.getPlugin;
  ctx.getPayloadValue = getPayloadValue;
  ctx.vk = bot.henta.vk;
  ctx.api = bot.henta.vk.api;
}
