import { createCanvas, loadImage } from 'canvas'

export default class ProstranstvoGame {
  constructor () {
    const colors = [
      'blue', 'red',
      'orange', 'green',
      'yellow'
    ]

    const figures = [
      [[15, 0], [15, 15], [0, 15], [6, 0]],
      [[15, 5], [3, 7], [14, 15], [6, 4]],
      [[2, 1], [2, 6], [0, 4], [6, 4]],
      [[3, 10], [0, 6], [3, 4], [6, 4]],
      [[7, 13], [6, 6], [0, 4], [6, 4]],
      [[1, 7], [0, 6], [0, 4], [6, 4]],
      [[4, 0], [0, 4], [6, 4]],
      [[1, 2], [3, 6], [0, 13]],
      [[8, 7], [0, 1], [0, 4], [6, 4]],
      [[12, 2], [0, 4], [6, 4]],
      [[6, 4], [4, 6], [0, 4], [6, 4]],
      [[2, 0], [0, 6], [0, 4]],
      [[0, 6], [8, 4], [6, 4]],
      [[9, 2], [0, 6], [0, 4], [10, 3], [6, 4]],
      [[1, 4], [2, 3], [0, 4], [6, 4]],
      [[14, 5], [1, 6], [0, 4], [6, 4]],
      [[12, 9], [0, 6], [0, 4], [6, 5]],
      [[4, 12], [3, 2], [0, 4], [6, 4]],
      [[3, 1], [9, 6], [0, 4], [6, 14]]
    ]

    this.elements = []
    figures.forEach(v => {
      this.elements.push({
        figure: v,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    })

    const repeat = this.elements[Math.floor(Math.random() * this.elements.length)]
    this.elements.push(repeat) // Double

    const colorNames = {
      blue: 'синий',
      red: 'красный',
      orange: 'оранжевый',
      green: 'зеленый',
      yellow: 'желтый'
    }

    this.rightAnswer = colorNames[repeat.color]
  }

  async generateImage () {
    const backgroundImage = await loadImage(`./res/img/postgames/prostranstvo.png`)

    const canvas = createCanvas(1590, 900)
    const context = canvas.getContext('2d')

    context.drawImage(backgroundImage, 0, 0)

    this.elements.forEach(v => {
      context.fillStyle = v.color
      const posX = 380 + Math.random() * 830
      const posY = 330 + Math.random() * 440
      const size = 3 + Math.random() * 3
      context.beginPath()
      context.moveTo(posX, posY)

      for (const line of v.figure) {
        context.lineTo(posX + line[0] * size, posY + line[1] * size)
      }

      context.fill()
    })

    return canvas.toBuffer()
  }
}
