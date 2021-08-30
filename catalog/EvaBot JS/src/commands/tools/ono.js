/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
const { loadImage, createCanvas } = require('canvas');

export default class OnoCommand {
  name = 'оно';
  private = true;
  arguments = {
    lc: { name: 'lc', type: 'integer', optional: true },
    gc: { name: 'gc', type: 'integer', optional: true },
    url: { name: 'url', type: 'word', optional: true }
  }

  async handler(ctx) {
    const lineCount = ctx.params.lc || 12;
    const gorCount = ctx.params.gc || 6;

    const image = await loadImage(ctx.params.url || 'https://sun9-40.userapi.com/c857320/v857320857/3a2c4/m_QT1sHnOpg.jpg');
    const canvas = createCanvas(image.width + (image.width / lineCount), image.height);
    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0);

    // eslint-disable-next-line no-plusplus
    for (let i = lineCount; i >= 0; i--) {
      if (i === 0) {
        for (let j = 0; j < gorCount; j++) {
          context.fillStyle = 'white';
          context.fillRect(
            image.width / lineCount * i + (image.width / lineCount * 0.05),
            image.height / gorCount * j + image.height / gorCount * 0.05,
            image.width / lineCount * 0.9,
            image.height / gorCount * 0.9
          );
        }

        break;
      }

      for (let j = 0; j < gorCount; j++) {
        const imageData = context.getImageData(
          image.width / lineCount * (i - 1) + (image.width / lineCount * 0.05),
          image.height / gorCount * j + image.height / gorCount * 0.05,
          image.width / lineCount * 0.9,
          image.height / gorCount * 0.9
        );

        context.putImageData(
          imageData,
          image.width / lineCount * i + (image.width / lineCount * 0.05),
          image.height / gorCount * j + image.height / gorCount * 0.05,
        );
      }
    }

    ctx.builder()
      .photo(canvas.toBuffer())
      .answer();
  }
}
