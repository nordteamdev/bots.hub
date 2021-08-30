export default class NewPostToChatPlugin {
  init (henta) {
    this.henta = henta
    henta.vk.updates.on('wall_post', this.processPost.bind(this))
  }

  processPost (ctx, next) {
    if (ctx.wall.postType !== 'post') {
      return next()
    }

    this.henta.vk.api.messages.send({
      message: '📢 Новая запись в группе!',
      peer_id: 2000000002,
      attachment: ctx.wall.toString()
    })

    return next()
  }
}
