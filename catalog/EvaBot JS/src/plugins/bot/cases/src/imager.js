import { createCanvas, loadImage, registerFont } from 'canvas';

export default class CasesImager {
  constructor (plugin) {
    this.plugin = plugin;
    registerFont('res/font/cleanwork.ttf', { family: 'Cleanwork' });
  }

  async get (slug) {
    const imageCachePlugin = this.plugin.henta.getPlugin('common/imageCache');
    return imageCachePlugin.get(
      `cases:image:${slug}`,
      () => this.generate(slug)
    );
  }

  async getCrack (slug, step) {
    const imageCachePlugin = this.plugin.henta.getPlugin('common/imageCache');
    return imageCachePlugin.get(
      `cases:${slug}-${step}`,
      () => this.generateCrack(slug, step)
    );
  }

  async getWin (imgSlug, text) {
    const imageCachePlugin = this.plugin.henta.getPlugin('common/imageCache');
    return imageCachePlugin.get(
      `cases:win:${imgSlug}-${text}`,
      () => this.generateWin(imgSlug, text)
    );
  }

  async generate (slug) {
    const canvas = createCanvas(1050, 700);
    const context = canvas.getContext('2d');

    const [backgroundImage, caseImage] = await Promise.all([
      loadImage('res/img/back.png'),
      loadImage(`res/img/cases/${slug}.png`)
    ]);

    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(caseImage, 269, 93);

    context.textAlign = 'center';
    context.fillStyle = 'rgb(250, 250, 250)';

    let size = 100;
    context.font = `${size}px Cleanwork`;

    while (context.measureText(this.plugin.fromSlug[slug].title).width > 620) {
      size--;
      context.font = `${size}px Cleanwork`;
    }

    context.fillText(this.plugin.fromSlug[slug].title, 525, 610);

    return canvas.toBuffer();
  }

  async generateCrack (slug, step) {
    const canvas = createCanvas(1050, 700);
    const context = canvas.getContext('2d');

    const [backgroundImage, caseImage, crackImage] = await Promise.all([
      loadImage('res/img/back.png'),
      loadImage(`res/img/cases/${slug}.png`),
      loadImage(`res/img/cases/crack/${step}.png`)
    ]);

    context.drawImage(backgroundImage, 0, 0);

    const randomX = Math.floor(Math.random() * 100 - 50);
    const randomY = Math.floor(Math.random() * 100 - 50);

    context.drawImage(caseImage, 269 + randomX, 93 + randomY);
    context.drawImage(crackImage, 270 + randomX, 120 + randomY);

    return canvas.toBuffer();
  }

  async generateWin (itemSlug, text) {
    const canvas = createCanvas(1050, 700);
    const context = canvas.getContext('2d');

    const [backgroundImage, lightImage, itemImage] = await Promise.all([
      loadImage('res/img/back.png'),
      loadImage('res/img/light.png'),
      loadImage(`res/img/caseWins/${itemSlug}.png`)
    ]);

    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(lightImage, 0, 0);
    context.drawImage(itemImage, 365, 420 - itemImage.height);

    context.textAlign = 'center';
    context.fillStyle = 'rgb(0, 50, 0)';
    context.font = `100px Cleanwork`;

    context.fillText(text, 525, 610);

    return canvas.toBuffer();
  }
}