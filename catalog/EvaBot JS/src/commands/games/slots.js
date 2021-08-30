import { createCanvas, loadImage, registerFont } from 'canvas';

registerFont('res/font/bork-display.otf', { family: 'Bork Display' });

export default class SlotsCommand {
  name = 'слот'
  description = 'игровой автомат'
  emoji = '🎰'
  arguments = {
    rate: { name: 'ставка', type: 'moneys', min: 100 }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handler(ctx) {
    const variants = [
      'banana', 'pepper', 'cat',
      'chiken', 'apple', 'monkey',
      'melon', 'dollar', 'seven'
    ];

    ctx.answer('🎰 Крутим барабаны!');
    await this.sleep(1000);

    const result = [
      variants[Math.floor(Math.random() * variants.length)],
      variants[Math.floor(Math.random() * variants.length)],
      variants[Math.floor(Math.random() * variants.length)]
    ];

    const coff = this.getCoff(result);

    ctx.user.money -= ctx.params.rate;
    ctx.user.money += Math.floor(ctx.params.rate * coff);
    ctx.user.lvl.addScore(Math.floor(Math.random() * 5 * coff));

    // Achievements
    ctx.user.achievements.unlockIf(
      'portvein',
      result[0] === result[1] && result[1] === result[2] && result[0] === 'seven'
    );

    ctx.user.achievements.unlockIf(
      'pochti-portvein',
      result[0] === result[1] && result[1] !== result[2] && result[0] === 'seven'
    );

    ctx.builder()
      .attach(this.getImage(ctx, result, coff))
      .send();
  }

  getCoff(result) {
    let coff = 0;
    // XXX
    if (result[0] === result[1] && result[1] === result[2]) {
      coff += 3;

      // 777
      if (result[0] === 'seven') {
        coff += 5;
      }

      // dollar
      if (result[0] === 'dollar') {
        coff += 3;
      }

      // hot
      if (result[0] === 'pepper') {
        coff += 3;
      }

      // love
      if (result[0] === 'heart') {
        coff += 3;
      }
    }

    // XX0
    if (result[0] === result[1]) {
      coff += 1.6;
    }

    // X0X
    if (result[0] === result[2]) {
      coff += 1.6;
    }

    // 0XX
    if (result[1] === result[2]) {
      coff += 1.9;
    }

    return coff;
  }

  getImage(ctx, images, coff) {
    const imageCachePlugin = ctx.getPlugin('common/imageCache');
    return imageCachePlugin.get(
      `slots:${images}`,
      () => this.generateImage(images, coff)
    );
  }

  async generateImage(images, coff) {
    const backgroundImage = await loadImage('./res/img/slots.png');

    const resultImages = await Promise.all(
      images.map(v => loadImage(`./res/img/slots/${v}.png`))
    );

    const canvas = createCanvas(1590, 900);
    const context = canvas.getContext('2d');

    context.drawImage(backgroundImage, 0, 0);

    context.drawImage(resultImages[0], 670 - 270, 325, 250, 250);
    context.drawImage(resultImages[1], 670, 325, 250, 250);
    context.drawImage(resultImages[2], 670 + 270, 325, 250, 250);

    context.textAlign = 'center';
    context.fillStyle = coff ? 'green' : 'red';

    context.font = '120px bold Cleanwork';
    context.fillText(coff ? `Победа X${coff}` : 'Поражение', 795, 820);

    return canvas.toBuffer();
  }
}
