export default async function botHandler (ctx, next) {
  ctx.user = await this.get(ctx.senderId)
  if (!ctx.user) {
    ctx.user = await this.create(ctx.senderId)
    ctx.isFirst = true
  }

  await next()

  if (ctx.answered && !ctx.notSaveUser) {
    ctx.user.save()
  }
}
