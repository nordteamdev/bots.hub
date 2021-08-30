const { createCanvas, loadImage } = require('canvas');

export default class SharGame {
  init() {
    const colors = [
      'blue', 'red',
      'orange', 'green',
      'yellow'
    ];

    this.elements = [];
    for (let i = 0; i < 60; i++) {
      this.elements.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    const colorFreq = {};
    this.elements.forEach(v => {
      if (!colorFreq[v]) {
        colorFreq[v] = 0;
      }

      colorFreq[v]++;
    });

    const topColor = Object.entries(colorFreq).sort((a, b) => b[1] - a[1])[0][0];
    this.elements.push(topColor);

    const colorNames = {
      blue: 'синий',
      red: 'красный',
      orange: 'оранжевый',
      green: 'зеленый',
      yellow: 'желтый'
    };

    this.rightAnswer = colorNames[topColor];
  }

  async generateImage() {
    const backgroundImage = await loadImage('./res/img/postgames/shar.png');

    const canvas = createCanvas(1590, 900);
    const context = canvas.getContext('2d');

    context.drawImage(backgroundImage, 0, 0);

    this.elements.forEach(v => {
      context.fillStyle = v;
      context.beginPath();
      context.arc(
        380 + Math.random() * 830,
        330 + Math.random() * 440,
        10 + Math.random() * 20,
        0,
        2 * Math.PI
      );
      context.fill();
    });

    return canvas.toBuffer();
  }
}
