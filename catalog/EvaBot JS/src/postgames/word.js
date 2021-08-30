// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';

const { createCanvas, loadImage, registerFont } = require('canvas');

const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

function shiftAlphabet(alp, shift) {
  if (shift < 0) {
    return shiftAlphabet(alp.reverse(), -shift).reverse();
  }

  let shiftedAlphabet = ''; // новый алфавит
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < alp.length; i++) {
    const currentLetter = (alp[i + shift] === undefined)
      ? (alp[i + shift - alp.length])
      : (alp[i + shift]);

    shiftedAlphabet += currentLetter;
  }
  return shiftedAlphabet;
}

function encrypt(str, count) {
  const shiftedAlphabet = shiftAlphabet(alphabet, count);
  console.log(shiftedAlphabet)
  return Array.from(str).reduce((acc, v) => (
    acc + shiftedAlphabet[alphabet.indexOf(v)]
  ), '');
}

export default class WordGame {
  async init() {
    registerFont('res/font/bork-display.otf', { family: 'Bork Display' });

    const data = await fetch('http://free-generator.ru/generator.php?action=word&type=1');
    const jsonData = await data.json();
    const { word } = jsonData.word;

    this.rightAnswer = word;
    this.encrypted = encrypt(word.toUpperCase(), Math.floor(Math.random() * 10) + 1);

    this.tip = '💡 Слово зашифровано с помощью кода Цезаря.';
  }

  async generateImage() {
    const backgroundImage = await loadImage('./res/img/postgames/word.png');

    const canvas = createCanvas(1590, 900);
    const context = canvas.getContext('2d');

    context.drawImage(backgroundImage, 0, 0);

    context.textAlign = 'center';
    context.fillStyle = 'rgb(0, 200, 0)';
    context.shadowOffsetX = 10;
    context.shadowOffsetY = 10;
    context.shadowColor = 'rgba(0,0,0,0.5)';
    context.shadowBlur = 10;

    let size = 120;
    context.font = `${size}px Bork Display`;

    while (context.measureText(this.encrypted).width > 1200) {
      size -= 1;
      context.font = `${size}px Bork Display`;
    }

    context.fillText(this.encrypted, 1590 / 2, 590);

    return canvas.toBuffer();
  }
}
