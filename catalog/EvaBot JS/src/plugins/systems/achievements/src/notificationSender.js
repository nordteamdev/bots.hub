import { createCanvas, loadImage, registerFont } from 'canvas'

registerFont('res/font/cleanwork.ttf', { family: 'Cleanwork' })
registerFont('res/font/bork-display.otf', { family: 'Bork Display' })

export default async function sendNotification (user, achievement) {
  const imageCachePlugin = this.henta.getPlugin('common/imageCache')
  const image = await imageCachePlugin.get(
    `achievement:${achievement.slug}`,
    () => generateImage(achievement)
  )

  user.sendBuilder()
    .text(`🎇 Вы открыли новое достижение «${achievement.title}»!`)
    .attach(image)
    .send()
}

async function generateImage (achievement) {
  const backgroundImage = await loadImage(`./res/img/achievement.png`)
  const emojiImage = await loadImage(`./res/img/achievement/${achievement.slug}.png`)
  const canvas = createCanvas(1590, 900)
  const context = canvas.getContext('2d')

  context.drawImage(backgroundImage, 0, 0)
  context.drawImage(emojiImage, 645, 160, 300, 300) // 300

  context.textAlign = 'center'
  context.fillStyle = 'black'

  context.font = `120px bold Cleanwork`
  context.fillText(achievement.title, 795, 660)

  context.font = `50px Bork Display`
  context.fillText(achievement.description, 795, 760)

  return canvas.toBuffer()
}
