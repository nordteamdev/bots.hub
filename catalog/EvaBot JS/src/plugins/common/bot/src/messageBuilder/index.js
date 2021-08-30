import { Keyboard } from 'vk-io';
import makeMsg from './dataToMsg';

export default class MessageBuilder {
  constructor(data, defaultValues) {
    this.msg = defaultValues || {};
    if (data) {
      Object.assign(this.msg, makeMsg(data));
    }

    this.msg.disable_mentions = this.msg.disable_mentions || 1;
  }

  setContext(context) {
    this.context = context;
  }

  async send() {
    this.msg.peer_id = this.context.peerId;
    await this.run();
    return this.context.vk.api.messages.send(this.msg);
  }

  async uploadAttachments() {
    if (!this.msg.attachment) {
      return;
    }

    if (typeof this.msg.attachment !== 'object' || !Array.isArray(this.msg.attachment)) {
      this.msg.attachment = [this.msg.attachment];
    }

    this.msg.attachment = await Promise.all(this.msg.attachment);
  }

  async run() {
    await Promise.all([this.uploadAttachments()]);
  }

  line(text) {
    if (!text) {
      return;
    }

    return this.manageText(str => (str ? `${str}\n${text}` : text));
  }

  lines(lines) {
    lines.forEach(item => this.line(item));
    return this;
  }

  text(text) {
    return this.manageText(str => (str ? `${str}${text}` : text));
  }

  manageText(func) {
    this.msg.message = func(this.msg.message);
    return this;
  }

  keyboard(keyboard) {
    this.msg.keyboard = keyboard;
    return this;
  }

  makeButtons(ctx, buttons) {
    const keyboard = Keyboard.builder();
    buttons.forEach(v => keyboard.textButton({
      label: v[0],
      payload: { command: v[1] },
      color: v[2] && 'primary'
    }));

    keyboard.inline(ctx.clientInfo.inline_keyboard === true);
    keyboard.oneTime();

    return this.keyboard(keyboard);
  }

  buttons(ctx, buttons, chunk = 3) {
    const keyboard = Keyboard.builder();
    buttons.forEach((v, i) => {
      keyboard.textButton(v);
      if ((i + 1) % chunk === 0) {
        keyboard.row();
      }
    });

    keyboard.inline(ctx.clientInfo.inline_keyboard === true);
    keyboard.oneTime();

    return this.keyboard(keyboard);
  }

  attach(attachment) {
    if (!this.msg.attachment) {
      this.msg.attachment = [];
    }

    if (typeof this.msg.attachment !== 'object') {
      this.msg.attachment = [this.msg.attachment];
    }

    this.msg.attachment.push(attachment);
    return this;
  }

  audioMessage(source) {
    return this.attach(
      this.context.vk.upload.audioMessage({
        ['peer_id']: this.context.peerId,
        source
      })
    );
  }

  photo(source) {
    if (!source) {
      return this;
    }

    return this.attach(
      this.context.vk.upload.messagePhoto({
        ['peer_id']: this.context.peerId,
        source
      })
    );
  }

  cachedPhoto(slug, generator) {
    if (!slug) {
      return this;
    }

    const imageCachePlugin = this.context.henta.getPlugin('common/imageCache');
    return this.attach(imageCachePlugin.get(slug, generator));
  }

  getKeyboard() {
    return this.msg.keyboard;
  }
}
