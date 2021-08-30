import MessageProcessor from './messageProcessor';
import createMessageBuilder from './messageBuilder/creator';

export default class BotPlugin {
  constructor(henta) {
    this.henta = henta;
    this.messageProcessor = new MessageProcessor(this);
  }

  async init(henta) {
    this.settings = await henta.util.loadSettings('bot/main.json');
  }

  async start() {
    await this.messageProcessor.start(this);
  }

  createBuilder(data) {
    return createMessageBuilder(data);
  }
}
