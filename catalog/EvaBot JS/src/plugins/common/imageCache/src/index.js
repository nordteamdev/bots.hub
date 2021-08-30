export default class ImageCachePlugin {
  constructor (henta) {
    this.henta = henta
  }

  async get (code, generator) {
    const redisPlugin = this.henta.getPlugin('common/redis')
    const cached = await redisPlugin.get(`imageCache:${code}`)
    if (cached) {
      return cached
    }

    this.henta.log(`Генерация ${code}...`)

    const source = generator ? await generator() : code
    const uploaded = await this.henta.vk.upload.messagePhoto({ source })
    const uploadedStr = uploaded.toString()

    await redisPlugin.set(`imageCache:${code}`, uploadedStr)
    this.henta.log(`${code} → ${uploadedStr}`)

    return uploadedStr
  }
}
