async function acceptJoin (ctx, { source }) {
  const clan = await ctx.user.assertClan(ctx, 'owner')
  ctx.assert(
    !await source.hasClan(),
    [
      `⛔ Пользователь уже состоит в клане.`,
      '\nСкорее всего он вступил в него после отправки заявки.'
    ]
  )

  ctx.assert(
    await clan.getMembersCount() < clan.slots,
    [
      `⛔ В клане нет мест.`,
      '\nКупите новые слоты в управлении кланом.'
    ]
  )

  await clan.addMember(source.vkId)

  source.send(`✅ ${ctx.user.r()} принял вас в клан <<${clan.name}>> №${clan.id}.`)
  ctx.answer([
    `✅ Вы приняли ${source.r()} в клан.`,
    `👥 Участников: ${await clan.getMembersCount()}/${clan.slots} чел.`
  ])
}

async function denyJoin (ctx, { source }) {
  const clan = await ctx.user.assertClan(ctx, 'owner')
  source.send(`❌ ${ctx.user.r()} отклонил вашу заявку в клан <<${clan.name}>> №${clan.id}.`)
  ctx.answer(`⭕ Заявка на вступление ${source.r()} в клан отклонена.`)
}

module.exports = function ({ getPlugin }) {
  const requestsPlugin = getPlugin('common/requests')
  requestsPlugin.addTag('join_a_clan', acceptJoin, denyJoin)
}
